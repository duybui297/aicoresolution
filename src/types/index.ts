export interface Client {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface CaseStudy {
  id: number;
  url: string;
  name: string;
  industry: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

export interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string | { vi: string; en: string };
  description: string | { vi: string; en: string };
  date: string;
  location: string;
  image: string;
  price: number;
  maxSeats: number;
  registeredCount: number;
  status: 'open' | 'full' | 'closed';
  isOnline: boolean;
  isFeatured: boolean;
  speaker?: Speaker;
  agenda: string[] | { vi: string[]; en: string[] };
}

export interface Registration {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  note: string;
  paymentStatus: 'paid' | 'free' | 'pending';
  registeredAt: string;
}

export interface TimelineEvent {
  year: string;
  teamSize: number;
  title: string;
  description: string;
  milestone: string;
}
