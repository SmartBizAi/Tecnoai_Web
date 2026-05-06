const SUPABASE_URL = 'https://intpugdrshnnntddgadm.supabase.co';
const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHB1Z2Ryc2hubm50ZGRnYWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjg0MjksImV4cCI6MjA5MzY0NDQyOX0.TqXEpNVlGEJ3ePBraUyBLV-eGPQAuV2rkY98xDvWu3Q';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image_url: string | null;
    tags: string[];
    source_account: string | null;
    source_topic: string | null;
    status: 'draft' | 'published' | 'rejected' | 'regenerating';
    created_at: string;
    published_at: string | null;
}

async function supabaseFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...options,
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
    return res.json();
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
    return supabaseFetch<BlogPost[]>(
        'blog_posts?status=eq.published&order=published_at.desc&select=id,title,slug,excerpt,image_url,tags,source_topic,published_at'
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const rows = await supabaseFetch<BlogPost[]>(
        `blog_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*`
    );
    return rows[0] ?? null;
}
