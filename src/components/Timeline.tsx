import { Users, Award, TrendingUp, Rocket } from 'lucide-react';
import { companyTimeline } from '../data/timelineData';

export default function Timeline() {
  const getIcon = (year: number) => {
    if (year === 2020) return Rocket;
    if (year === 2021) return Users;
    if (year === 2022) return TrendingUp;
    return Award;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Hành Trình Phát Triển
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Từ một startup với 2 người đến đội ngũ 20+ chuyên gia,
            chúng tôi không ngừng lớn mạnh và đổi mới
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative py-8">
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
                  <div className="mt-20 transition-all duration-300 ease-out relative z-10">
                    {/* Compact Card (Default State) - Expands horizontally on hover */}
                    <div className="bg-white rounded-xl shadow-md p-4 text-center transition-all duration-500 group-hover:shadow-2xl group-hover:w-[320px] group-hover:p-5 group-hover:border-2 group-hover:border-blue-500">
                      {/* Year - Always visible */}
                      <span className="text-2xl font-bold text-blue-600 block mb-2 transition-all duration-300 group-hover:text-3xl">
                        {event.year}
                      </span>

                      {/* Title - Always visible */}
                      <h3 className="text-sm font-bold text-slate-900 mb-2 transition-all duration-300 group-hover:text-lg group-hover:mb-3">
                        {event.title}
                      </h3>

                      {/* Team Size - Always visible */}
                      <div className="flex justify-center mb-0 group-hover:mb-4">
                        <div className="inline-flex items-center gap-1 bg-slate-100 rounded-full px-3 py-1 transition-all duration-300 group-hover:gap-2 group-hover:px-4 group-hover:py-2">
                          <Users className="w-3 h-3 text-slate-600 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
                          <span className="text-xs font-semibold text-slate-700 transition-all duration-300 group-hover:text-sm">
                            <span className="hidden group-hover:inline">Team: </span>{event.teamSize}<span className="hidden group-hover:inline"> người</span>
                          </span>
                        </div>
                      </div>

                      {/* Description - Hidden by default, shows on hover */}
                      <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 group-hover:mb-4">
                        <p className="text-slate-600 leading-relaxed text-sm text-left">
                          {event.description}
                        </p>
                      </div>

                      {/* Milestone - Hidden by default, shows on hover */}
                      <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded text-left">
                          <p className="text-xs font-medium text-blue-900">
                            {event.milestone}
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
