'use client';

import { useLang } from './LanguageContext';
import { translations } from '../../data/translations';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-black text-white py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">{translations.about.title[lang]}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {translations.about.body[lang]}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <span>{translations.about.builtBy[lang]}</span>
          <a
            href="mailto:alexfriedlander01@gmail.com"
            className="text-[#276EF1] hover:underline"
          >
            alexfriedlander01@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
