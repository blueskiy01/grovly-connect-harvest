export interface LookingForRequest {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  quantity?: number;
  unit?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  status?: 'active' | 'fulfilled' | 'expired';
  created_at?: string;
  updated_at?: string;
  profiles?: {
    display_name: string;
  };
}

export interface LookingForOffer {
  id: string;
  request_id: string;
  user_id: string;
  message: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}