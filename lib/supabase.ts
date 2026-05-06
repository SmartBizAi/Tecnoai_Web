import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Profile = {
    id: string;
    full_name: string;
    company_name: string | null;
    email: string;
    role: 'client' | 'admin';
    created_at: string;
};

export type Service = {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
};

export type ClientService = {
    id: string;
    client_id: string;
    service_id: string;
    status: 'active' | 'paused' | 'cancelled';
    start_date: string;
    notes: string | null;
    created_at: string;
    services?: Service;
};

export type Document = {
    id: string;
    client_id: string;
    service_id: string | null;
    name: string;
    url: string;
    file_type: string | null;
    created_at: string;
};
