'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight, BookOpen, User } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getPostBySlug, type BlogPost } from '@/lib/supabase';

function formatDate(iso: string, lang: string) {
    return new Date(iso).toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function estimateReadTime(content: string) {
    const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

export default function BlogPostPage() {
    const { t, lang } = useLanguage();
    const params = useParams();
    const slug = params?.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        getPostBySlug(slug)
            .then((p) => {
                if (!p) setNotFound(true);
                else setPost(p);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-700 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
                <BookOpen size={48} className="text-gray-200" />
                <h1 className="text-2xl font-bold text-gray-700">Artículo no encontrado</h1>
                <Link href="/blog" className="btn-primary">
                    {t('blog.back')}
                </Link>
            </div>
        );
    }

    const readTime = estimateReadTime(post.content);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero image */}
            {post.image_url && (
                <div className="w-full h-72 md:h-96 overflow-hidden bg-brand-50 mt-16">
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="container-narrow py-12 px-6">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-800 font-medium mb-8 transition-colors"
                >
                    {t('blog.back')}
                </Link>

                {/* Article header */}
                <header className="mb-10">
                    {/* Tags */}
                    {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium"
                                >
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100">
                        <span className="flex items-center gap-1.5">
                            <User size={14} />
                            {t('blog.by')}
                        </span>
                        {post.published_at && (
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {t('blog.publishedOn')} {formatDate(post.published_at, lang)}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <BookOpen size={14} />
                            {readTime} {t('blog.minRead')}
                        </span>
                    </div>
                </header>

                {/* Content */}
                <article
                    className="prose prose-lg prose-gray max-w-none
                        prose-headings:text-brand-900 prose-headings:font-bold
                        prose-h2:text-2xl prose-h3:text-xl
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-li:text-gray-700
                        prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900
                        mb-16"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA */}
                <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">{t('blog.ctaTitle')}</h2>
                    <p className="text-brand-100 mb-6">{t('blog.ctaDesc')}</p>
                    <Link href="/apps" className="inline-flex items-center gap-2 bg-white text-brand-900 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors">
                        {t('blog.ctaBtn')} <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
