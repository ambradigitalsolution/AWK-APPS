export type Organization = {
  id: string;
  name: string;
  slug: string;
  stripe_customer_id: string | null;
  subscription_status: 'free' | 'basic' | 'pro' | 'canceled';
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  organization_id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  base_price: number;
  created_at: string;
  updated_at: string;
};

export type Material = {
  id: string;
  organization_id: string;
  name: string;
  price_modifier_per_unit: number;
  created_at: string;
};

export type Finishing = {
  id: string;
  organization_id: string;
  name: string;
  price_modifier_per_unit: number;
  created_at: string;
};

export type Order = {
  id: string;
  organization_id: string;
  customer_name: string;
  customer_whatsapp: string;
  product_id: string;
  size: string;
  quantity: number;
  material_id: string;
  finishing_id: string | null;
  design_url: string | null;
  deadline: string | null;
  shipping_address: string;
  total_price: number;
  production_estimate_hours: number | null;
  order_status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  production_status: 'awaiting_design' | 'design_review' | 'printing' | 'finishing' | 'packaging' | 'shipped';
  created_at: string;
  updated_at: string;
};

export type Affiliate = {
  id: string;
  organization_id: string;
  user_id: string | null;
  name: string;
  code: string;
  commission_rate: number;
  created_at: string;
  updated_at: string;
};

export type Commission = {
  id: string;
  organization_id: string;
  affiliate_id: string;
  order_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'canceled';
  payout_date: string | null;
  created_at: string;
};

export type ApiKey = {
  id: string;
  organization_id: string;
  name: string;
  key_hash: string;
  rate_limit_per_minute: number;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
};
