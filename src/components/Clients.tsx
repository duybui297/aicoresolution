import { Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { notableClients } from '../data/clientsData';

export default function Clients() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 mb-4 shadow-sm">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700">{t('clients.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('clients.title')}
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('clients.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notableClients.map((client) => (
            <div
              key={client.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {t(client.name)}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(client.industry)}
                </p>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
