export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  benefits?: string[];
  recommendedFor?: string;
  category: 'facials' | 'body' | 'makeup' | 'consultation';
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId?: string;
  serviceName?: string;
  date: string;
  time: string;
  notes?: string;
  skinConcerns: string[];
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}
