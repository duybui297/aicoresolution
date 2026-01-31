import { Palette, Network, Code, Bug, Brain, Shield, Briefcase } from 'lucide-react';

export default function About() {
  const roles = [
    {
      icon: Briefcase,
      title: 'Business Consultant',
      count: 2,
      description: 'Tư vấn chiến lược và giải pháp kinh doanh tối ưu',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Palette,
      title: 'Product Design',
      count: 3,
      description: 'UI/UX designers tạo trải nghiệm người dùng tối ưu',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Network,
      title: 'Solution Architect',
      count: 2,
      description: 'Thiết kế kiến trúc hệ thống scalable và bảo mật',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Developer',
      count: 10,
      description: 'Full-stack developers xây dựng sản phẩm chất lượng cao',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Bug,
      title: 'Quality Assurance',
      count: 3,
      description: 'Testers đảm bảo chất lượng và hiệu năng',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Brain,
      title: 'AI/ML Engineer',
      count: 2,
      description: 'Chuyên gia AI tích hợp machine learning vào sản phẩm',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-5 py-2 mb-4">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Về Chúng Tôi</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Đội Ngũ Chuyên Nghiệp
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            20+ chuyên gia với đam mê công nghệ và AI, sẵn sàng biến ý tưởng của bạn thành hiện thực.
            Chúng tôi kết hợp chuyên môn sâu với quy trình Agile và AI-assisted development
            để mang lại giải pháp tối ưu nhất.
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
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${role.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">{role.count}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Members</div>
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
              <div className="text-blue-200">Năm kinh nghiệm</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
