import { Sparkles, Zap, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTk2RjMiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-5 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium text-blue-100">AI-Powered Development & Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            AI Core Solution
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Đối tác công nghệ đáng tin cậy, chuyên phát triển giải pháp phần mềm
            với sức mạnh của <span className="text-blue-300 font-semibold">Trí tuệ Nhân tạo</span>
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-blue-200 text-sm">Dự án hoàn thành</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold">40%</div>
                <div className="text-blue-200 text-sm">Tăng năng suất với AI</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-200 text-sm">Ngành nghề đa dạng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
