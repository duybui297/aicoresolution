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
  tags: string[];
}

export interface TimelineEvent {
  year: number;
  teamSize: number;
  title: string;
  description: string;
  milestone: string;
}
