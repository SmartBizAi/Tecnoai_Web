'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getPublishedPosts, type BlogPost } from '@/lib/supabase';

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

export default function BlogPage() {
    const { t, lang } = useLanguage();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublishedPosts()
            .then(setPosts)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white section-pad pt-32">
                <div className="container-narrow text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                        <BookOpen size={14} />
                        <span>{t('blog.title')}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('blog.title')}</h1>
                    <p className="text-lg text-brand-100 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
                </div>
            </section>

            {/* Posts grid */}
            <section className="section-pad">
                <div className="container-narrow">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                                    <div className="bg-gray-100 h-48" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                                        <div className="h-3 bg-gray-100 rounded w-full" />
                                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg">{t('blog.empty')}</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen size={40} className="text-brand-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-5">
                                        {/* Tags */}
                                        {post.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-1 text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium"
                                                    >
                                                        <Tag size={10} />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                                            {post.title}
                                        </h2>

                                        {post.excerpt && (
                                            <p className="text-sm text-gray-500 line-clamp-3 flex-1 mb-4">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={11} />
                                                {post.published_at ? formatDate(post.published_at, lang) : ''}
                                            </span>
                                            <span className="flex items-center gap-1 text-brand-600 font-medium group-hover:gap-2 transition-all">
                                                {t('blog.readMore')} <ArrowRight size={11} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-50 section-pad">
                <div className="container-narrow text-center">
                    <h2 className="text-2xl font-bold text-brand-900 mb-3">{t('blog.ctaTitle')}</h2>
                    <p className="text-gray-600 mb-6">{t('blog.ctaDesc')}</p>
                    <Link href="/apps" className="btn-primary inline-flex items-center gap-2">
                        {t('blog.ctaBtn')} <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
