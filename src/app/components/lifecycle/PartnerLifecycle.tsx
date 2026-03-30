'use client';

import { useState } from 'react';
import { useLang } from '../LanguageContext';
import { translations } from '../../../data/translations';
import { lifecycleStages, LifecycleStage, LifecycleStep } from '../../../data/lifecycle';

export default function PartnerLifecycle() {
  const { lang } = useLang();
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStage = (id: string) => {
    if (expandedStage === id) {
      setExpandedStage(null);
      setExpandedStep(null);
    } else {
      setExpandedStage(id);
      setExpandedStep(null);
    }
  };

  const toggleStep = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        {translations.lifecycle.title[lang]}
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        {translations.lifecycle.clickToExpand[lang]}
      </p>

      <div className="relative">
        {lifecycleStages.map((stage, stageIdx) => {
          const isStageOpen = expandedStage === stage.id;
          const isLast = stageIdx === lifecycleStages.length - 1;

          return (
            <div key={stage.id} className="relative">
              {/* Vertical connector line */}
              {!isLast && (
                <div
                  className="absolute left-5 top-full w-0.5 h-6 z-0"
                  style={{ backgroundColor: '#D1D5DB' }}
                />
              )}

              {/* Stage header */}
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full flex items-center gap-3 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow px-4 py-3 text-left group"
              >
                {/* Colored left accent */}
                <div
                  className="w-2.5 h-10 rounded-sm shrink-0"
                  style={{ backgroundColor: stage.color }}
                />

                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-900">
                    {stage.title[lang]}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {stage.steps.length} {lang === 'en' ? 'steps' : 'pasos'}
                  </span>
                </div>

                {/* Expand/collapse arrow */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isStageOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded stage content */}
              {isStageOpen && (
                <div className="ml-9 mt-2 mb-2 space-y-2">
                  {stage.steps.map((step, stepIdx) => {
                    const isStepOpen = expandedStep === step.id;

                    return (
                      <div key={step.id} className="relative">
                        {/* Step connector dot */}
                        <div
                          className="absolute -left-5 top-4 w-2 h-2 rounded-full border-2"
                          style={{
                            borderColor: stage.color,
                            backgroundColor: isStepOpen ? stage.color : 'white',
                          }}
                        />

                        {/* Horizontal connector line */}
                        <div
                          className="absolute -left-3 top-[18px] w-3 h-0.5"
                          style={{ backgroundColor: '#D1D5DB' }}
                        />

                        {/* Vertical line between steps */}
                        {stepIdx < stage.steps.length - 1 && (
                          <div
                            className="absolute -left-4 top-6 w-0.5 h-full"
                            style={{ backgroundColor: '#E5E7EB' }}
                          />
                        )}

                        {/* Step card */}
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`w-full text-left rounded-md border px-4 py-3 transition-all ${
                            isStepOpen
                              ? 'border-blue-200 bg-blue-50/50 shadow-sm'
                              : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg" role="img">
                              {step.icon}
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {step.title[lang]}
                            </span>
                            <svg
                              className={`w-4 h-4 text-gray-400 ml-auto transition-transform duration-200 ${
                                isStepOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>

                        {/* Step details */}
                        {isStepOpen && (
                          <div className="mt-2 ml-2 rounded-md border border-gray-100 bg-white p-4 space-y-4 text-sm">
                            {/* Action */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-1">
                                {translations.lifecycle.action[lang]}
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                {step.action[lang]}
                              </p>
                            </div>

                            {/* Teams */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-1.5">
                                {translations.lifecycle.teams[lang]}
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {step.teams.map((team) => (
                                  <span
                                    key={team}
                                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                                    style={{
                                      backgroundColor: `${stage.color}14`,
                                      color: stage.color,
                                      border: `1px solid ${stage.color}30`,
                                    }}
                                  >
                                    {team}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Friction points */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-1.5">
                                {translations.lifecycle.friction[lang]}
                              </h4>
                              <ul className="space-y-1">
                                {step.friction[lang].map((point, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-gray-600"
                                  >
                                    <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                    <span className="leading-relaxed">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                              <h4 className="font-semibold text-gray-700">
                                {translations.lifecycle.time[lang]}:
                              </h4>
                              <span className="text-gray-600">{step.time[lang]}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Arrow connector between stages */}
              {!isLast && (
                <div className="flex justify-center py-1">
                  <svg
                    className="w-4 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 16 24"
                  >
                    <path d="M8 0v18M3 14l5 6 5-6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
