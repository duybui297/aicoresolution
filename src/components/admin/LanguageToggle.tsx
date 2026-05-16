import { useTranslation } from 'react-i18next';

export type ArticleLanguage = 'vi' | 'en';

interface LanguageToggleProps {
  value: ArticleLanguage;
  onChange: (lang: ArticleLanguage) => void;
  className?: string;
}

export function LanguageToggle({ value, onChange, className = '' }: LanguageToggleProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-admin-netral-30 overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange('vi')}
        className={`px-4 py-1.5 text-admin-xs font-admin-semibold transition-colors rounded-full ${
          value === 'vi'
            ? 'bg-admin-primary-100 text-admin-netral-10'
            : 'bg-admin-netral-10 text-admin-netral-60 hover:bg-admin-netral-20'
        }`}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`px-4 py-1.5 text-admin-xs font-admin-semibold transition-colors rounded-full ${
          value === 'en'
            ? 'bg-admin-primary-100 text-admin-netral-10'
            : 'bg-admin-netral-10 text-admin-netral-60 hover:bg-admin-netral-20'
        }`}
      >
        EN
      </button>
    </div>
  );
}
