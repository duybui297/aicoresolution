import { useTranslation } from 'react-i18next';
import { Construction } from 'lucide-react';

interface UnderConstructionProps {
  title?: string;
  description?: string;
  /** Override icon — defaults to Construction */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Reusable "under construction" placeholder for admin pages that are
 * not yet implemented. Keeps the sidebar layout so navigation remains intact.
 */
export function UnderConstruction({
  title,
  description,
  icon,
  className = '',
}: UnderConstructionProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col items-center justify-center h-full min-h-[60vh] px-6 text-center ${className}`}
    >
      {/* Icon container */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-admin-primary-10 border border-admin-primary-30 flex items-center justify-center">
          {icon ?? (
            <Construction className="w-10 h-10 text-admin-primary-60" />
          )}
        </div>
        {/* Decorative pulse ring */}
        <span className="absolute inset-0 rounded-3xl bg-admin-primary-10 animate-ping opacity-40" />
      </div>

      {/* Heading */}
      <h2 className="text-admin-xl font-admin-semibold text-admin-netral-100 mb-3">
        {title ?? t('admin.underConstruction.title')}
      </h2>

      {/* Description */}
      <p className="text-admin-sm text-admin-netral-60 max-w-sm leading-relaxed">
        {description ?? t('admin.underConstruction.description')}
      </p>

      {/* Optional action hint */}
      <div className="mt-8 px-5 py-3 rounded-xl bg-admin-primary-10 border border-admin-primary-30">
        <span className="text-admin-xs font-admin-medium text-admin-primary-70">
          {t('admin.underConstruction.hint')}
        </span>
      </div>
    </div>
  );
}
