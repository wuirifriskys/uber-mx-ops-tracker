'use client';

import { useState } from 'react';
import { useLang } from '../LanguageContext';
import { translations } from '../../../data/translations';
import {
  complianceEvents,
  categoryColors,
  categoryLabels,
  ComplianceEvent,
} from '../../../data/calendar';

const TODAY = new Date().toISOString().slice(0, 10);

function formatDate(dateStr: string, lang: 'en' | 'es'): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (lang === 'es') {
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ComplianceCalendar() {
  const { lang } = useLang();
  const t = translations.calendar;

  const allCategories = Object.keys(categoryLabels);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(allCategories)
  );
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size === 1) return next;
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const filteredEvents = complianceEvents
    .filter((e) => activeCategories.has(e.category))
    .sort((a, b) => a.date.localeCompare(b.date));

  const isPast = (date: string) => date < TODAY;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t.title[lang]}
      </h2>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map((cat) => {
          const active = activeCategories.has(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2"
              style={{
                borderColor: categoryColors[cat],
                backgroundColor: active ? categoryColors[cat] : 'transparent',
                color: active ? '#fff' : categoryColors[cat],
                opacity: active ? 1 : 0.5,
              }}
            >
              {categoryLabels[cat][lang]}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const past = isPast(event.date);
            const expanded = expandedEvent === event.id;
            const color = categoryColors[event.category];

            return (
              <div
                key={event.id}
                className={`relative pl-12 transition-opacity ${
                  past ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-4 w-3 h-3 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                />

                {/* Card */}
                <div
                  className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  style={{ borderLeftWidth: '4px', borderLeftColor: color }}
                  onClick={() =>
                    setExpandedEvent(expanded ? null : event.id)
                  }
                >
                  <div className="p-4">
                    {/* Header row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 font-mono">
                        {formatDate(event.date, lang)}
                      </span>

                      <span
                        className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {categoryLabels[event.category][lang]}
                      </span>

                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {event.agency}
                      </span>

                      {!past && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          {lang === 'en' ? 'Upcoming' : 'Pr\u00f3ximo'}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-gray-900">
                      {event.title[lang]}
                    </h3>

                    {/* Expand indicator */}
                    <div className="mt-1 text-xs text-gray-400">
                      {expanded ? '\u25B2' : '\u25BC'}{' '}
                      {lang === 'en'
                        ? expanded
                          ? 'Click to collapse'
                          : 'Click to expand'
                        : expanded
                          ? 'Clic para cerrar'
                          : 'Clic para expandir'}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">
                          {t.what[lang]}:
                        </span>{' '}
                        <span className="text-gray-600">
                          {event.description[lang]}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          {t.operationalAction[lang]}:
                        </span>{' '}
                        <span className="text-gray-600">
                          {event.action[lang]}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-red-700">
                          {t.riskIfMissed[lang]}:
                        </span>{' '}
                        <span className="text-red-600">
                          {event.risk[lang]}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          {t.agency[lang]}:
                        </span>{' '}
                        <span className="text-gray-600">{event.agency}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          {lang === 'en'
            ? 'No events match the selected filters.'
            : 'No hay eventos que coincidan con los filtros seleccionados.'}
        </p>
      )}
    </section>
  );
}
