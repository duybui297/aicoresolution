import { Users, Award, TrendingUp, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { companyTimeline } from '../data/timelineData';

export default function Timeline() {
  const { t } = useTranslation();

  const getIcon = (year: string) => {
    if (year.includes('2020')) return Rocket;
    if (year.includes('2022')) return Users;
    if (year.includes('2023')) return TrendingUp;
    return Award;
  };

  return (
    <section className="timeline-section py-20 px-4 bg-gradient-to-b from-white to-slate-50 relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('timeline.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t('timeline.description')}
          </p>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden relative pl-8 space-y-8">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-200"></div>

          {companyTimeline.map((event) => {
            const Icon = getIcon(event.year);
            return (
              <div key={event.year} className="relative">
                {/* Timeline Dot */}
                <div className="absolute top-0 left-[-27px] w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Mobile Card - Always Expanded */}
                <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-3">
                    {event.year}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t(event.title)}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {t(event.description)}
                  </p>

                  <div className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50 rounded">
                    <p className="text-xs font-medium text-blue-900">
                      {t(event.milestone)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:block relative py-8">
          {/* Timeline Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"></div>

          {/* Timeline Items - Fit all in viewport */}
          <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-6 px-4">
            {companyTimeline.map((event) => {
              const Icon = getIcon(event.year);

              return (
                <div
                  key={event.year}
                  className="flex-1 min-w-0 max-w-[180px] group cursor-pointer relative z-10 hover:z-50"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:shadow-xl">
                    <Icon className="w-4 h-4 text-white transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                  </div>

                  {/* Card - Small by default, expands on hover */}
                  <div className="mt-20 relative z-10 flex justify-center">
                    {/* Compact Card (Default State) - Expands horizontally on hover */}
                    <div className="bg-white rounded-xl shadow-md p-4 text-center transition-all duration-500 group-hover:shadow-2xl absolute left-1/2 -translate-x-1/2 w-full group-hover:w-[400px] group-hover:p-6 group-hover:border-2 group-hover:border-blue-500 top-0">
                      {/* Year - Always visible */}
                      <span className="text-xl font-bold text-blue-600 block mb-2 transition-all duration-300 group-hover:text-2xl whitespace-nowrap">
                        {event.year}
                      </span>

                      {/* Title - Always visible */}
                      <h3 className="text-sm font-bold text-slate-900 mb-2 transition-all duration-300 group-hover:text-lg group-hover:mb-3">
                        {t(event.title)}
                      </h3>

                      {/* Description - Hidden by default, shows on hover */}
                      <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-60 group-hover:opacity-100 group-hover:mb-4">
                        <p className="text-slate-600 leading-relaxed text-sm text-left">
                          {t(event.description)}
                        </p>
                      </div>

                      {/* Milestone - Hidden by default, shows on hover */}
                      <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded text-left">
                          <p className="text-xs font-medium text-blue-900">
                            {t(event.milestone)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        .timeline-section {
          transition: padding-bottom 0.5s ease;
        }
        @media (min-width: 768px) {
           .timeline-section:has(.group:hover) {
            padding-bottom: 24rem;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
