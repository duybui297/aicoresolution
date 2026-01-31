import { Building2 } from 'lucide-react';
import { notableClients } from '../data/clientsData';

export default function Clients() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 mb-4 shadow-sm">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700">Đối Tác Của Chúng Tôi</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Khách Hàng Tiêu Biểu
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Được tin tưởng bởi các doanh nghiệp hàng đầu trong nhiều lĩnh vực khác nhau
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
                  {client.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {client.industry}
                </p>
              </div>

              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                  <span>Xem case study</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
