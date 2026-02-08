import { CaseStudy } from '../types';
import polewearImage from '../assets/polewear.jpg';

export const caseStudies: CaseStudy[] = [
  // 1. Du lịch & Dịch vụ Giải trí
  {
    id: 1,
    url: 'https://anabasrestaurant.vn/',
    name: 'Anabas Restaurant',
    industry: 'Nhà hàng đặc sản',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Hệ thống đặt bàn và quản lý nhà hàng với AI chatbot hỗ trợ khách hàng 24/7',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Website', 'AI Chatbot', 'Booking System']
  },
  {
    id: 12,
    url: 'https://chaukitchenandbar.vn/',
    name: 'Chau Kitchen & Bar',
    industry: 'Nhà hàng fusion',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Restaurant & bar với AI menu optimization và event management',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Website', 'AI Menu', 'Reservation']
  },
  {
    id: 8,
    url: 'https://tannhatsuonghotel.com/',
    name: 'Tân Nhật Sương Hotel',
    industry: 'Khách sạn nghỉ dưỡng',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Hotel management với AI dynamic pricing và guest experience optimization',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Booking', 'AI Pricing', 'CRM']
  },
  {
    id: 23,
    url: 'https://vethamquansapa.vn/',
    name: 'Vé Tham Quan Sapa',
    industry: 'Vé tham quan du lịch',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Travel booking platform với AI itinerary planner và price prediction',
    image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Booking', 'AI Planning', 'Travel']
  },
  {
    id: 10,
    url: 'https://massagebonglaicacdn.com.vn/',
    name: 'Massage Bồng Lai Cà Đăng',
    industry: 'Dịch vụ massage',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Spa booking platform với AI therapist matching và customer preferences',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Booking', 'AI Matching', 'CRM']
  },
  {
    id: 6,
    url: 'https://superfithoian.com/',
    name: 'Superfit Hoi An',
    industry: 'Phòng gym du lịch',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Gym management system với AI workout planner và member tracking',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Management', 'AI Trainer', 'Mobile App']
  },

  // 2. Giáo dục & Tư vấn Chuyên môn
  {
    id: 25,
    url: 'https://duhocicc.com/',
    name: 'Du Học ICC',
    industry: 'Tư vấn du học Nhật',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Study abroad consulting với AI university matching và application support',
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Portal', 'AI Matching', 'Education']
  },
  {
    id: 26,
    url: 'https://duhochankang.com/',
    name: 'Du Học Hàn Kang',
    industry: 'Tư vấn du học Hàn',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Korea study consulting với AI language assessment và visa guidance',
    image: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Portal', 'AI Assessment', 'Education']
  },
  {
    id: 16,
    url: 'https://tamlygiaoduchanhphuc.com/',
    name: 'Tâm Lý Giáo Dục Hạnh Phúc',
    industry: 'Giáo dục tâm lý',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Mental health platform với AI counseling support và mood tracking',
    image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Portal', 'AI Counseling', 'Healthcare']
  },
  {
    id: 29,
    url: 'https://thuaphatlaitrongtindanang.vn/',
    name: 'Thừa Phát Lại Trọng Tín',
    industry: 'Dịch vụ pháp lý tư vấn',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Legal service platform với AI document processing và case management',
    image: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Portal', 'AI Document', 'Legal Tech']
  },
  {
    id: 4,
    url: 'https://luxholdings.vn/',
    name: 'Lux Holdings',
    industry: 'Tư vấn bất động sản',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Real estate platform với AI property valuation và market analysis',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Portal', 'AI Analytics', 'CRM']
  },

  // 3. Làm đẹp & Chăm sóc Cá nhân
  {
    id: 13,
    url: 'https://royaleyelashvn.com/',
    name: 'Royal Eyelash',
    industry: 'Eyelash & phụ kiện',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Beauty service booking với AI style recommendation và before/after visualization',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Booking', 'AI Beauty', 'Mobile App']
  },
  {
    id: 11,
    url: 'https://thaomocconghe.vn/',
    name: 'Thảo Mộc Công Hẻ',
    industry: 'Sản phẩm thảo mộc chăm sóc',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Health supplement store với AI health advisor và personalized recommendations',
    image: 'https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Advisor', 'Healthcare']
  },
  {
    id: 30,
    url: 'https://stellanails.ca/',
    name: 'Stella Nails',
    industry: 'Nail & spa',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Nail salon booking với AI design preview và customer loyalty program',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Booking', 'AI Design', 'Beauty']
  },
  {
    id: 31,
    url: 'https://daithanhpharma.com.vn/',
    name: 'Đại Thành Pharma',
    industry: 'Dược phẩm & thực phẩm chức năng',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Pharmaceutical e-commerce với AI prescription checking và drug interaction alert',
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Healthcare', 'B2B/B2C']
  },
  {
    id: 3,
    url: 'https://tiemhoa1989dn.com/',
    name: 'Tiệm Hoa 1989',
    industry: 'Hoa tươi & quà tặng cá nhân',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Online flower shop với AI image search và delivery optimization',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Search', 'Logistics']
  },

  // 4. Thể thao, Thời trang & Phong cách Sống
  {
    id: 5,
    url: 'https://mhsport.vn/',
    name: 'MH Sport',
    industry: 'Cửa hàng thể thao',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'Sports retail platform với AI size recommendation và inventory management',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Sizing', 'Inventory']
  },
  {
    id: 18,
    url: 'https://rosepolewear.com/',
    name: 'Rose Polewear',
    industry: 'Thời trang pole dance',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'Fashion e-commerce với AI style advisor và virtual try-on',
    image: polewearImage,
    tags: ['E-commerce', 'AI Fashion', 'AR Try-on']
  },
  {
    id: 2,
    url: 'https://shomeluxury.com/',
    name: 'Shome Luxury',
    industry: 'Thiết kế nội thất luxury',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'E-commerce platform với AI recommendation và AR visualization',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Recommendation', 'AR']
  },
  {
    id: 20,
    url: 'https://decalxeiu.com/',
    name: 'Decal Xe Iu',
    industry: 'Decal xe cá nhân hóa',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'Auto decal service với AI design tool và visualization on car',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Service', 'AI Design', 'Visualization']
  },
  {
    id: 21,
    url: 'https://koticharge.com/',
    name: 'Koti Charge',
    industry: 'Trạm sạc xe điện lifestyle',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'EV charging platform với AI station finder và usage optimization',
    image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Platform', 'AI Optimization', 'IoT']
  },

  // 5. Thú cưng & Sản phẩm Tiêu dùng
  {
    id: 7,
    url: 'https://mewsicpetshop.com/',
    name: 'Mewsic Pet Shop',
    industry: 'Cửa hàng thú cưng',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Pet care platform với AI health monitoring và grooming booking',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Healthcare', 'Booking']
  },
  {
    id: 32,
    url: 'https://petnature.vn/',
    name: 'Pet Nature',
    industry: 'Sản phẩm thú cưng tự nhiên',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Natural pet food store với AI nutritional planner',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Nutrition', 'Organic']
  },
  {
    id: 9,
    url: 'https://t-wolf.vn/',
    name: 'T-Wolf',
    industry: 'Phụ kiện máy tính tiêu dùng',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Gaming gear store với AI PC builder và compatibility checker',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Assistant', 'Configuration']
  },
  {
    id: 33,
    url: 'https://pcmaster.vn/',
    name: 'PC Master',
    industry: 'Linh kiện máy tính',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Computer components store với AI build optimizer',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Hardware', 'Tech']
  },
  {
    id: 17,
    url: 'https://thienanpro.com/',
    name: 'Thiên An Pro',
    industry: 'Vật tư tiêu dùng công nghiệp',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Electrical equipment store với AI product matching và installation guide',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Assistant', 'B2B']
  },

  // 6. Xây dựng, Vật liệu & Thiết bị Công nghiệp
  {
    id: 15,
    url: 'https://deviasteel.com/',
    name: 'Devia Steel',
    industry: 'Cửa thép công nghiệp',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Manufacturing management với AI production optimization và quality control',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['ERP', 'AI Optimization', 'IoT']
  },
  {
    id: 19,
    url: 'https://jicowood.com/',
    name: 'Jico Wood',
    industry: 'Cửa gỗ composite',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Wooden furniture store với AI design customization và price estimation',
    image: 'https://images.pexels.com/photos/1350587/pexels-photo-1350587.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Customization', '3D']
  },
  {
    id: 24,
    url: 'https://vacera.vn/',
    name: 'Vacera',
    industry: 'Gạch & vật liệu trang trí',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Ceramic & sanitary ware với AI bathroom designer và product recommendation',
    image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Design', 'B2B/B2C']
  },
  {
    id: 27,
    url: 'https://sonx900titan.com/',
    name: 'Sơn X900 Titan',
    industry: 'Sơn & vật liệu chống thấm',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Construction material store với AI color matching và quantity calculator',
    image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['E-commerce', 'AI Calculator', 'B2B']
  },
  {
    id: 28,
    url: 'https://xenangs.com/',
    name: 'Xe Nâng S',
    industry: 'Xe nâng & thiết bị công nghiệp',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Forklift service platform với AI maintenance prediction và fleet management',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['B2B', 'AI Maintenance', 'IoT']
  }
];
