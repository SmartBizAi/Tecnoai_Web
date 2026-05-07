const SUPABASE_URL = 'https://intpugdrshnnntddgadm.supabase.co';
const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHB1Z2Ryc2hubm50ZGRnYWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjg0MjksImV4cCI6MjA5MzY0NDQyOX0.TqXEpNVlGEJ3ePBraUyBLV-eGPQAuV2rkY98xDvWu3Q';

export interface PortalSession {
    access_token: string;
    refresh_token: string;
    user: { id: string; email: string };
}

export interface Profile {
    id: string;
    full_name: string;
    company_name: string | null;
    email: string;
    role: 'client' | 'admin';
    created_at: string;
}

export interface Service {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
}

export interface ClientService {
    id: string;
    client_id: string;
    service_id: string;
    status: 'active' | 'paused' | 'cancelled';
    start_date: string;
    notes: string | null;
    created_at: string;
    services: Service;
}

export interface Document {
    id: string;
    client_id: string;
    service_id: string | null;
    name: string;
    url: string;
    file_type: string | null;
    created_at: string;
}

const SESSION_KEY = 'portal_session';

export function getSession(): PortalSession | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}

function saveSession(session: PortalSession): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
}

export async function signIn(email: string, password: string): Promise<PortalSession> {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error_description || err.message || 'Login failed');
    }
    const data = await res.json();
    const session: PortalSession = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: { id: data.user.id, email: data.user.email },
    };
    saveSession(session);
    return session;
}

export async function signUp(
    email: string,
    password: string,
    fullName: string,
    companyName?: string
): Promise<PortalSession | null> {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({
            email,
            password,
            data: { full_name: fullName, company_name: companyName ?? '' },
        }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error_description || err.message || 'Registration failed');
    }
    const data = await res.json();
    if (!data.access_token) return null; // email confirmation required
    const session: PortalSession = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: { id: data.user.id, email: data.user.email },
    };
    saveSession(session);
    return session;
}

export async function signOut(accessToken: string): Promise<void> {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
    });
    clearSession();
}

function authHeaders(token: string) {
    return {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}

async function portalFetch<T>(path: string, token: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...options,
        headers: { ...authHeaders(token), ...options?.headers },
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const text = await res.text();
    return text ? JSON.parse(text) : (null as unknown as T);
}

export async function getProfile(userId: string, token: string): Promise<Profile | null> {
    const rows = await portalFetch<Profile[]>(`profiles?id=eq.${userId}&select=*`, token);
    return rows[0] ?? null;
}

export async function getAllProfiles(token: string): Promise<Profile[]> {
    return portalFetch<Profile[]>('profiles?select=*&order=created_at.desc', token);
}

export async function getMyServices(clientId: string, token: string): Promise<ClientService[]> {
    return portalFetch<ClientService[]>(
        `client_services?client_id=eq.${clientId}&select=*,services(*)&order=created_at.desc`,
        token
    );
}

export async function getAllClientServices(token: string): Promise<ClientService[]> {
    return portalFetch<ClientService[]>(
        'client_services?select=*,services(*)&order=created_at.desc',
        token
    );
}

export async function getAllServices(token: string): Promise<Service[]> {
    return portalFetch<Service[]>('services?select=*&order=name.asc', token);
}

export async function createService(token: string, name: string, description?: string): Promise<void> {
    await portalFetch<unknown>('services', token, {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ name, description: description ?? null }),
    });
}

export async function assignService(
    token: string,
    clientId: string,
    serviceId: string,
    notes?: string
): Promise<void> {
    await portalFetch<unknown>('client_services', token, {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ client_id: clientId, service_id: serviceId, notes: notes ?? null }),
    });
}

export async function getMyDocuments(clientId: string, token: string): Promise<Document[]> {
    return portalFetch<Document[]>(
        `documents?client_id=eq.${clientId}&select=*&order=created_at.desc`,
        token
    );
}

export async function getAllDocuments(token: string): Promise<Document[]> {
    return portalFetch<Document[]>('documents?select=*&order=created_at.desc', token);
}
