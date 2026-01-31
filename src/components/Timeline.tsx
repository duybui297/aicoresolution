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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
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

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 hidden md:block"></div>

          {companyTimeline.map((event, index) => {
            const Icon = getIcon(event.year);
            const isEven = index % 2 === 0;

            return (
              <div key={event.year} className="relative mb-16 md:mb-24">
                <div className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-blue-600">{event.year}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {event.title}
                      </h3>

                      <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-4">
                        <Users className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          Team: {event.teamSize} người
                        </span>
                      </div>

                      <p className="text-slate-600 leading-relaxed mb-4">
                        {event.description}
                      </p>

                      <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-900">
                          {event.milestone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex w-2/12 justify-center items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <span className="text-white font-bold text-lg">{event.teamSize}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-5/12"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
