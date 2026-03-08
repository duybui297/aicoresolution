import { Event } from './types';
import communityImg1 from './assets/commonity-1.png';
import communityImg2 from './assets/communit-on-going-2.png';
import communityImg3 from './assets/community-daqua-content1.png';
import communityImg4 from './assets/community-daqua-content2.png';

export const EVENTS: Event[] = [
    {
        id: 'evt-002',
        title: {
            vi: 'Từ AI cơ bản đến AI Agent tự hành: Lịch sử, tác động & điều gì chờ đợi chúng ta?',
            en: "From Basic AI to Autonomous AI Agents: History, Impact & What's Coming Next?",
        },
        description: {
            vi: 'Từ AI cơ bản qua Gen AI như ChatGPT, nay AI Agent tự hành bùng nổ với OpenClaw (viral open-source 2026, chạy local trên WhatsApp/Telegram, tự dọn inbox, gửi email, quản lý lịch...) cùng Auto-GPT & Copilot, tăng năng suất khổng lồ nhưng kèm rủi ro mất việc/bảo mật – tương lai 2026-2030 đa mô hình gần AGI, bạn sẵn sàng đồng hành chưa? 🚀🤖',
            en: 'From basic AI through Gen AI like ChatGPT, autonomous agents explode in 2026 with OpenClaw (viral open-source, local-run on WhatsApp/Telegram, auto-clears inbox, emails, calendars...) plus Auto-GPT & Copilot, boosting massive productivity but with job/security risks – by 2026-2030 multi-modal near-AGI, ready to team up? 🚀🤖',
        },
        date: new Date('2026-03-20T18:00:00+07:00').toISOString(),
        location: 'POWER COFFEE - 3rd floor',
        image: communityImg1,
        price: 0,
        maxSeats: 200,
        registeredCount: 45,
        status: 'open',
        isOnline: false,
        isFeatured: true,
        agenda: {
            vi: [],
            en: [],
        },
    },
    {
        id: 'evt-003',
        title: {
            vi: 'Token Trong AI: Hiểu Về "Tiền Tệ" Của Trí Tuệ Nhân Tạo',
            en: 'Tokens in AI: Understanding the "Currency" of Artificial Intelligence',
        },
        description: {
            vi: 'Nếu token đang dần trở thành đơn vị đo lường năng suất, chi phí và giá trị mà AI tạo ra, liệu chúng ta có đang bước vào một “Token Economy” thực sự — nơi quyền lực kinh tế thuộc về những ai tối ưu được giá trị trên mỗi token?',
            en: 'If tokens are becoming the fundamental unit of AI-driven productivity—measuring cost, intelligence, and value creation—are we witnessing the birth of a true Token Economy where economic power shifts to those who can generate the most value per token?',
        },
        date: new Date('2026-04-03T18:00:00+07:00').toISOString(),
        location: 'POWER COFFEE - 3rd floor',
        image: communityImg2,
        price: 0,
        maxSeats: 200,
        registeredCount: 78,
        status: 'open',
        isOnline: false,
        isFeatured: false,
        agenda: {
            vi: [],
            en: [],
        },
    },
    {
        id: 'evt-004',
        title: {
            vi: 'Tương lai của AI Agent: Hướng tới Trí tuệ nhân tạo tổng quát (AGI) và tác động toàn cầu',
            en: 'The Future of AI Agents: Toward AGI and Global Impact',
        },
        description: {
            vi: 'Dự đoán xu hướng, chẳng hạn như các AI Agent siêu thông minh, và ảnh hưởng đến việc làm, kinh tế, v.v.',
            en: 'Trend predictions, such as superintelligent agents, and effects on jobs, economy, etc.',
        },
        date: new Date('2025-12-20T18:00:00+07:00').toISOString(),
        location: 'POWER COFFEE - 3rd floor',
        image: communityImg3,
        price: 0,
        maxSeats: 200,
        registeredCount: 200,
        status: 'full',
        isOnline: false,
        isFeatured: false,
        agenda: {
            vi: [],
            en: [],
        },
    },
    {
        id: 'evt-005',
        title: {
            vi: 'AI Agent đang thay đổi nghệ thuật, công việc và cuộc sống như thế nào',
            en: 'How Creative Agents Are Changing Art, Work, and Relationships',
        },
        description: {
            vi: 'Thảo luận về tầm nhìn dài hạn, chia sẻ câu chuyện cá nhân, cùng nhau nói về “đồng nghiệp AI”.',
            en: 'Discussing long-term visions, sharing personal stories, brainstorming about “AI colleagues".',
        },
        date: new Date('2025-12-28T18:00:00+07:00').toISOString(),
        location: 'POWER COFFEE - 3rd floor',
        image: communityImg4,
        price: 0,
        maxSeats: 200,
        registeredCount: 153,
        status: 'full',
        isOnline: false,
        isFeatured: false,
        agenda: {
            vi: [],
            en: [],
        },
    },
];
