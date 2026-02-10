import { CaseStudy } from '../types';
import anabasRestaurantImg from '../assets/casestudies/Banner_Anabas_Restaurant.png';
import chauKitchenImg from '../assets/casestudies/chau kitchen & bar.jpg';
import tanNhatSuongImg from '../assets/casestudies/tan nhat suong.jpg';
import veThamQuanSapaImg from '../assets/casestudies/vethamquansapa.webp';
import massageBongLaiCacImg from '../assets/casestudies/massagebonglaicac.png';
import superfitImg from '../assets/casestudies/Superfit.jpg';
import duHocIccImg from '../assets/casestudies/Du hoc ICC.png';
import duHocHangKangImg from '../assets/casestudies/Du học Hangkang.jpg';
import tamLyGiaoDucHanhPhucImg from '../assets/casestudies/tamlygiaoduchanhphuc.png';
import thuaPhatLaiTrongTinImg from '../assets/casestudies/thuaphatlaitrongtin.jpg';
import luxHoldingsImg from '../assets/casestudies/lux.jpg';
import royalEyelashImg from '../assets/casestudies/royal-eyelash.png';
import thaoMocCongHeImg from '../assets/casestudies/thaomocconghe.png';
import stellaNailsImg from '../assets/casestudies/stellanail.png';
import daiThanhPharmaImg from '../assets/casestudies/daithanhparma.png';
import tiemHoa1989Img from '../assets/casestudies/1989.png';
import mhSportImg from '../assets/casestudies/Minhhong-sport.png';
import rosePolewearImg from '../assets/casestudies/rosepolewear.jpeg';
import shomeLuxuryImg from '../assets/casestudies/1.4-SLIDE-1.webp';
import decalXeIuImg from '../assets/casestudies/decalxeiu.png';
import kotiChargeImg from '../assets/casestudies/koticharge.png';
import mewsicPetShopImg from '../assets/casestudies/mewsic.png';
import petNatureImg from '../assets/casestudies/winvn.jpg';
import tWolfImg from '../assets/casestudies/twolf.jpg';
import pcMasterImg from '../assets/casestudies/aiwolf.jpg';
import thienAnProImg from '../assets/casestudies/thienanpro.png';
import deviaSteelImg from '../assets/casestudies/deviasteel.png';
import jicoWoodImg from '../assets/casestudies/jico.jpg';
import vaceraImg from '../assets/casestudies/vacera.jpg';
import sonX900TitanImg from '../assets/casestudies/sonx900titan.png';
import xeNangSImg from '../assets/casestudies/xenang.jpg';

export const caseStudies: CaseStudy[] = [
  // 1. Du lịch & Dịch vụ Giải trí
  {
    id: 1,
    url: 'https://anabasrestaurant.vn/',
    name: 'Anabas Restaurant',
    industry: 'Nhà hàng đặc sản',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Famous specialty restaurant in Hoi An Ancient Town serving cao lau, mi quang, fresh grilled seafood in cozy friendly atmosphere.',
    image: anabasRestaurantImg,
    tags: ['Website', 'AI Chatbot', 'Booking System']
  },
  {
    id: 12,
    url: 'https://chaukitchenandbar.vn/',
    name: 'Chau Kitchen & Bar',
    industry: 'Nhà hàng fusion',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Châu Kitchen & Bar Hoi An delicious Asian-European fusion dishes charming century-old house serving international guests professionally.',
    image: chauKitchenImg,
    tags: ['Website', 'AI Menu', 'Reservation']
  },
  {
    id: 8,
    url: 'https://tannhatsuonghotel.com/',
    name: 'Tân Nhật Sương Hotel',
    industry: 'Khách sạn nghỉ dưỡng',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Affordable quality Tan Nhat Suong Hotel Binh Dinh comfortable rooms pool gym near attractions free wifi parking relaxed stay.',
    image: tanNhatSuongImg,
    tags: ['Booking', 'AI Pricing', 'CRM']
  },
  {
    id: 23,
    url: 'https://vethamquansapa.vn/',
    name: 'Vé Tham Quan Sapa',
    industry: 'Vé tham quan du lịch',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Official Sapa attraction tickets including Fansipan cable car Cat Cat village best prices fast online booking convenient.',
    image: veThamQuanSapaImg,
    tags: ['Booking', 'AI Planning', 'Travel']
  },
  {
    id: 10,
    url: 'https://massagebonglaicacdn.com.vn/',
    name: 'Massage Bồng Lai Các',
    industry: 'Dịch vụ massage',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: 'Premium 5-star Bồng Lai Các Massage Da Nang luxurious space professional therapists diverse relaxing packages attractive options.',
    image: massageBongLaiCacImg,
    tags: ['Booking', 'AI Matching', 'CRM']
  },
  {
    id: 6,
    url: 'https://superfithoian.com/',
    name: 'Superfit Hoi An',
    industry: 'Phòng gym du lịch',
    category: 'Du lịch & Dịch vụ Giải trí',
    description: "Hoi An's top modern gym with state-of-the-art equipment airy space ideal for tourists locals bilingual service great amenities.",
    image: superfitImg,
    tags: ['Management', 'AI Trainer', 'Mobile App']
  },

  // 2. Giáo dục & Tư vấn Chuyên môn
  {
    id: 25,
    url: 'https://duhocicc.com/',
    name: 'Du Học ICC',
    industry: 'Tư vấn du học Nhật',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'ICC Study Abroad reliable Japan consulting high visa success scholarships full support for Vietnamese students.',
    image: duHocIccImg,
    tags: ['Portal', 'AI Matching', 'Education']
  },
  {
    id: 26,
    url: 'https://duhochankang.com/',
    name: 'Du Học Hàn Kang',
    industry: 'Tư vấn du học Hàn',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Hankang Study Abroad leads Korea consulting Da Nang top scholarships high visa intensive Korean training.',
    image: duHocHangKangImg,
    tags: ['Portal', 'AI Assessment', 'Education']
  },
  {
    id: 16,
    url: 'https://tamlygiaoduchanhphuc.com/',
    name: 'Tâm Lý Giáo Dục Hạnh Phúc',
    industry: 'Giáo dục tâm lý',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Happiness Special Education Center supports autistic children developmental disorders through in-depth psychological intervention programs effectively.',
    image: tamLyGiaoDucHanhPhucImg,
    tags: ['Portal', 'AI Counseling', 'Healthcare']
  },
  {
    id: 29,
    url: 'https://thuaphatlaitrongtindanang.vn/',
    name: 'Thừa Phát Lại Trọng Tín',
    industry: 'Dịch vụ pháp lý tư vấn',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Legal service platform with AI document processing and case management',
    image: thuaPhatLaiTrongTinImg,
    tags: ['Portal', 'AI Document', 'Legal Tech']
  },
  {
    id: 4,
    url: 'https://luxholdings.vn/',
    name: 'Lux Holdings',
    industry: 'Tư vấn bất động sản',
    category: 'Giáo dục & Tư vấn Chuyên môn',
    description: 'Top high-end real estate distributor exclusive agent for Vinhomes Masterise Sun Group featuring major nationwide premium projects reliably.',
    image: luxHoldingsImg,
    tags: ['Portal', 'AI Analytics', 'CRM']
  },

  // 3. Làm đẹp & Chăm sóc Cá nhân
  {
    id: 13,
    url: 'https://royaleyelashvn.com/',
    name: 'Royal Eyelash',
    industry: 'Eyelash & phụ kiện',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Royal Eyelash Vietnam specializes in eyelash extensions false lashes premium care products professional safe quality for customers.',
    image: royalEyelashImg,
    tags: ['Booking', 'AI Beauty', 'Mobile App']
  },
  {
    id: 11,
    url: 'https://thaomocconghe.vn/',
    name: 'Thảo Mộc Công Hẻ',
    industry: 'Sản phẩm thảo mộc chăm sóc',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Herbal technology brand offering natural shampoo toothpaste body wash safe gentle daily care for the whole family.',
    image: thaoMocCongHeImg,
    tags: ['E-commerce', 'AI Advisor', 'Healthcare']
  },
  {
    id: 30,
    url: 'https://stellanails.ca/',
    name: 'Stella Nails',
    industry: 'Nail & spa',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Stella Nails & Spa Canada expert nail care creative manicures pedicures stunning unique designs professionally.',
    image: stellaNailsImg,
    tags: ['Booking', 'AI Design', 'Beauty']
  },
  {
    id: 31,
    url: 'https://daithanhpharma.com.vn/',
    name: 'Đại Thành Pharma',
    industry: 'Dược phẩm & thực phẩm chức năng',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Dai Thanh Pharma manufactures trusted pharmaceuticals supplements focused on family daily health wellness.',
    image: daiThanhPharmaImg,
    tags: ['E-commerce', 'AI Healthcare', 'B2B/B2C']
  },
  {
    id: 3,
    url: 'https://tiemhoa1989dn.com/',
    name: 'Tiệm Hoa 1989',
    industry: 'Hoa tươi & quà tặng cá nhân',
    category: 'Làm đẹp & Chăm sóc Cá nhân',
    description: 'Trusted fresh flower shop in Da Nang offering bouquets gift baskets boxes, fast 60-minute delivery with daily imported high-quality flowers.',
    image: tiemHoa1989Img,
    tags: ['E-commerce', 'AI Search', 'Logistics']
  },

  // 4. Thể thao, Thời trang & Phong cách Sống
  {
    id: 5,
    url: 'https://mhsport.vn/',
    name: 'MH Sport',
    industry: 'Cửa hàng thể thao',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'MinhongSport online sports supermarket selling football badminton pickleball shoes apparel accessories top brands great prices custom printing available.',
    image: mhSportImg,
    tags: ['E-commerce', 'AI Sizing', 'Inventory']
  },
  {
    id: 18,
    url: 'https://rosepolewear.com/',
    name: 'Rose Polewear',
    industry: 'Thời trang pole dance',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'Rosepolewear pole dance activewear sexy comfortable modern designs for passionate active women fitness enthusiasts.',
    image: rosePolewearImg,
    tags: ['E-commerce', 'AI Fashion', 'AR Try-on']
  },
  {
    id: 2,
    url: 'https://shomeluxury.com/',
    name: 'Shome Luxury',
    industry: 'Thiết kế nội thất luxury',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'Leading Vietnam luxury interior design and construction brand specializing in villas apartments offices with Scandinavian Indochine elegant unique styles.',
    image: shomeLuxuryImg,
    tags: ['E-commerce', 'AI Recommendation', 'AR']
  },
  {
    id: 20,
    url: 'https://decalxeiu.com/',
    name: 'Decal Xe Iu',
    industry: 'Decal xe cá nhân hóa',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'Decal Xe iu custom motorcycle car stickers personalized high-quality fade-resistant nationwide fast delivery service.',
    image: decalXeIuImg,
    tags: ['Service', 'AI Design', 'Visualization']
  },
  {
    id: 21,
    url: 'https://koticharge.com/',
    name: 'Koti Charge',
    industry: 'Trạm sạc xe điện lifestyle',
    category: 'Thể thao, Thời trang & Phong cách Sống',
    description: 'KotiCharge provides fast convenient electric vehicle charging stations supporting green eco-friendly sustainable mobility future.',
    image: kotiChargeImg,
    tags: ['Platform', 'AI Optimization', 'IoT']
  },

  // 5. Thú cưng & Sản phẩm Tiêu dùng
  {
    id: 7,
    url: 'https://mewsicpetshop.com/',
    name: 'Mewsic Pet Shop',
    industry: 'Cửa hàng thú cưng',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Mewsic Pet Shop provides pet food toys accessories grooming spa boarding services for dogs cats fast convenient delivery.',
    image: mewsicPetShopImg,
    tags: ['E-commerce', 'AI Healthcare', 'Booking']
  },
  {
    id: 32,
    url: 'https://petnature.vn/',
    name: 'WinVN',
    industry: 'Sản phẩm thú cưng tự nhiên',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'WinVN offers natural eco-friendly pet care products food accessories safe gentle for beloved dogs and cats.',
    image: petNatureImg,
    tags: ['E-commerce', 'AI Nutrition', 'Organic']
  },
  {
    id: 9,
    url: 'https://t-wolf.vn/',
    name: 'T-Wolf',
    industry: 'Phụ kiện máy tính tiêu dùng',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'T-WOLF tech store specializes in gaming keyboards mice speakers high-quality KBM combos perfect for passionate gamers enthusiasts.',
    image: tWolfImg,
    tags: ['E-commerce', 'AI Assistant', 'Configuration']
  },
  {
    id: 33,
    url: 'https://pcmaster.vn/',
    name: 'AIWOLF',
    industry: 'Linh kiện máy tính',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'AIWOLF sells high-performance computer components graphics cards motherboards PC building accessories for gamers professionals.',
    image: pcMasterImg,
    tags: ['E-commerce', 'AI Hardware', 'Tech']
  },
  {
    id: 17,
    url: 'https://thienanpro.com/',
    name: 'Thiên An Pro',
    industry: 'Vật tư tiêu dùng công nghiệp',
    category: 'Thú cưng & Sản phẩm Tiêu dùng',
    description: 'Thien An Pro distributes industrial supplies technical equipment comprehensive reliable solutions for manufacturing businesses nationwide.',
    image: thienAnProImg,
    tags: ['E-commerce', 'AI Assistant', 'B2B']
  },

  // 6. Xây dựng, Vật liệu & Thiết bị Công nghiệp
  {
    id: 15,
    url: 'https://deviasteel.com/',
    name: 'Devia Steel',
    industry: 'Cửa thép công nghiệp',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Deviasteel manufactures durable industrial steel doors rolling shutters high-quality building materials for factories large projects reliably.',
    image: deviaSteelImg,
    tags: ['ERP', 'AI Optimization', 'IoT']
  },
  {
    id: 19,
    url: 'https://jicowood.com/',
    name: 'Jico Wood',
    industry: 'Cửa gỗ composite',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Jicowood specializes in premium composite wood doors waterproof soundproof durable beautiful for modern homes buildings.',
    image: jicoWoodImg,
    tags: ['E-commerce', 'AI Customization', '3D']
  },
  {
    id: 24,
    url: 'https://vacera.vn/',
    name: 'Vacera',
    industry: 'Gạch & vật liệu trang trí',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Vacera produces flexible tiles mosaics decorative stones modern interior exterior designs superior quality variety.',
    image: vaceraImg,
    tags: ['E-commerce', 'AI Design', 'B2B/B2C']
  },
  {
    id: 27,
    url: 'https://sonx900titan.com/',
    name: 'Sơn X900 Titan',
    industry: 'Sơn & vật liệu chống thấm',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'X900 Titan premium waterproof wall paint durable color retention excellent protection for long-term construction projects.',
    image: sonX900TitanImg,
    tags: ['E-commerce', 'AI Calculator', 'B2B']
  },
  {
    id: 28,
    url: 'https://xenangs.com/',
    name: 'Xe Nâng S',
    industry: 'Xe nâng & thiết bị công nghiệp',
    category: 'Xây dựng, Vật liệu & Thiết bị Công nghiệp',
    description: 'Leading forklift rental repair sales service reliable industrial lifting equipment solutions across Vietnam.',
    image: xeNangSImg,
    tags: ['B2B', 'AI Maintenance', 'IoT']
  }
];
