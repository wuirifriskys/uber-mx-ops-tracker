'use client';

import { useLang } from './LanguageContext';
import { translations } from '../../data/translations';

type Tab = 'lifecycle' | 'calendar' | 'dashboard';

export default function TabNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  const { lang } = useLang();

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'lifecycle', label: translations.nav.lifecycle[lang], icon: '🔄' },
    { key: 'calendar', label: translations.nav.calendar[lang], icon: '📅' },
    { key: 'dashboard', label: translations.nav.dashboard[lang], icon: '📊' },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              active === tab.key
                ? 'border-[#276EF1] text-[#276EF1]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
