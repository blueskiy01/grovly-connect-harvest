export interface Listing {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string | null;
  quantity: number | null;
  availability_date: string | null;
  description: string | null;
  unit: string | null;
  user_id: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}