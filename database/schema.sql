-- 1. organizations
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT UNIQUE,
    subscription_status TEXT NOT NULL DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 2. profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 3. products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 4. materials
CREATE TABLE IF NOT EXISTS materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name TEXT NOT NULL,
    price_modifier_per_unit NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 5. finishings
CREATE TABLE IF NOT EXISTS finishings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name TEXT NOT NULL,
    price_modifier_per_unit NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 6. orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    customer_name TEXT NOT NULL,
    customer_whatsapp TEXT NOT NULL,
    product_id UUID NOT NULL REFERENCES products(id),
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    material_id UUID NOT NULL REFERENCES materials(id),
    finishing_id UUID REFERENCES finishings(id),
    design_url TEXT,
    deadline TIMESTAMP WITH TIME ZONE,
    shipping_address TEXT NOT NULL,
    total_price NUMERIC NOT NULL DEFAULT 0,
    production_estimate_hours INTEGER,
    order_status TEXT NOT NULL DEFAULT 'pending',
    production_status TEXT NOT NULL DEFAULT 'awaiting_design',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 7. affiliates
CREATE TABLE IF NOT EXISTS affiliates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    commission_rate NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 8. commissions
CREATE TABLE IF NOT EXISTS commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    affiliate_id UUID NOT NULL REFERENCES affiliates(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    payout_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 9. api_keys
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name TEXT NOT NULL,
    key_hash TEXT UNIQUE NOT NULL,
    rate_limit_per_minute INTEGER NOT NULL DEFAULT 60,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 10. payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL, -- 'transfer', 'cash', etc.
    note TEXT,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ENABLE RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE finishings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- General Policy: Users can only see data for their organization
-- We use a helper function to get the current user's organization_id

CREATE OR REPLACE FUNCTION get_my_org_id()
RETURNS UUID AS $$
    SELECT organization_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

-- Organizations: Users can view their own organization
CREATE POLICY "Users can view own organization" ON organizations
    FOR SELECT USING (id = get_my_org_id());

-- Products
CREATE POLICY "Users can view org products" ON products
    FOR SELECT USING (organization_id = get_my_org_id());

CREATE POLICY "Admins can manage org products" ON products
    FOR ALL USING (organization_id = get_my_org_id() AND EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    ));

-- Materials
CREATE POLICY "Users can view org materials" ON materials
    FOR SELECT USING (organization_id = get_my_org_id());

-- Finishings
CREATE POLICY "Users can view org finishings" ON finishings
    FOR SELECT USING (organization_id = get_my_org_id());

-- Orders
CREATE POLICY "Users can view org orders" ON orders
    FOR SELECT USING (organization_id = get_my_org_id());

CREATE POLICY "Users can create org orders" ON orders
    FOR INSERT WITH CHECK (organization_id = get_my_org_id());

-- Affiliates
CREATE POLICY "Users can view org affiliates" ON affiliates
    FOR SELECT USING (organization_id = get_my_org_id());

-- Commissions
CREATE POLICY "Users can view org commissions" ON commissions
    FOR SELECT USING (organization_id = get_my_org_id());

-- API Keys
CREATE POLICY "Owners can manage api keys" ON api_keys
    FOR ALL USING (organization_id = get_my_org_id() AND EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner'
    ));

-- Payments
CREATE POLICY "Users can view org payments" ON payments
    FOR SELECT USING (organization_id = get_my_org_id());

CREATE POLICY "Admins can manage org payments" ON payments
    FOR ALL USING (organization_id = get_my_org_id() AND EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'admin')
    ));
