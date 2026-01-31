import { useState } from 'react';
import { ExternalLink, Tag, Search } from 'lucide-react';
import { caseStudies } from '../data/caseStudiesData';

export default function CaseStudies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry))];

  const filteredCases = caseStudies.filter(cs => {
    const matchesSearch = cs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cs.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || cs.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <section className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Khám phá các dự án thành công mà chúng tôi đã triển khai cho khách hàng
            trong nhiều lĩnh vực khác nhau
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc ngành nghề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-900 bg-white shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedIndustry === industry
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {industry === 'all' ? 'Tất cả' : industry}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 text-center text-slate-600">
          Hiển thị <span className="font-bold text-slate-900">{filteredCases.length}</span> dự án
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((study) => (
            <div
              key={study.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={study.image}
                  alt={study.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex-1">
                    {study.name}
                  </h3>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {study.industry}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-lg"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6">
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 group-hover:shadow-lg"
                >
                  <span>Xem website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-slate-600">
              Thử tìm kiếm với từ khóa khác hoặc chọn ngành nghề khác
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
