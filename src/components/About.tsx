import { Palette, Network, Code, Bug, Brain, Shield, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const roles = [
    {
      icon: Briefcase,
      title: t('about.roles.businessConsultant.title'),
      count: 2,
      description: t('about.roles.businessConsultant.description'),
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Palette,
      title: t('about.roles.productDesign.title'),
      count: 3,
      description: t('about.roles.productDesign.description'),
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Network,
      title: t('about.roles.solutionArchitect.title'),
      count: 2,
      description: t('about.roles.solutionArchitect.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: t('about.roles.developer.title'),
      count: 10,
      description: t('about.roles.developer.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Bug,
      title: t('about.roles.qa.title'),
      count: 3,
      description: t('about.roles.qa.description'),
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Brain,
      title: t('about.roles.aiEngineer.title'),
      count: 2,
      description: t('about.roles.aiEngineer.description'),
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-5 py-2 mb-4">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">{t('about.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('about.title')}
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="flex items-start mb-4">
                  <div className={`p-3 bg-gradient-to-br ${role.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {role.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
              <div className="text-blue-200">{t('about.achievements.experience')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-200">{t('about.achievements.satisfaction')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">{t('about.achievements.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
