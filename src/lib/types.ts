export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: string;
  image: string;
  featured?: boolean;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  image: string;
}
