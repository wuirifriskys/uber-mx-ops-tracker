'use client';

import { useLang } from './LanguageContext';
import { translations } from '../../data/translations';

export default function Header() {
  const { lang, toggle } = useLang();

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            {translations.header.title[lang]}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {translations.header.subtitle[lang]}
          </p>
        </div>
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-600 rounded-full text-sm hover:bg-gray-800 transition-colors"
        >
          <span className={lang === 'en' ? 'font-bold' : 'text-gray-400'}>EN</span>
          <span className="text-gray-500">|</span>
          <span className={lang === 'es' ? 'font-bold' : 'text-gray-400'}>ES</span>
        </button>
      </div>
    </header>
  );
}
