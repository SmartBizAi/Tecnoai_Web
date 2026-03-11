'use client';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle, Database, Map, Settings, Package, TrendingUp, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import HeroBgCarousel from '@/components/HeroBgCarousel';

const metrics = [
    { icon: Clock, key: 'home.metrics.m1' as const },
    { icon: CheckCircle, key: 'home.metrics.m2' as const },
    { icon: Database, key: 'home.metrics.m3' as const },
];

const builds = [
    { icon: TrendingUp, key: 'home.builds.t1' as const },
    { icon: Settings, key: 'home.builds.t2' as const },
    { icon: Map, key: 'home.builds.t3' as const },
    { icon: Package, key: 'home.builds.t4' as const },
];

const products = [
    {
        name: 'RxRoutes',
        href: '/apps/rxroutes',
        icon: '🚚',
        tagKey: 'apps.rxroutes.oneliner' as const,
        color: 'from-brand-50 to-brand-100/50',
        border: 'border-brand-100',
    },
    {
        name: 'BookingPro',
        href: '/apps/bookingpro',
        icon: '📅',
        tagKey: 'apps.bookingpro.oneliner' as const,
        color: 'from-violet-50 to-violet-100/50',
        border: 'border-violet-100',
    },
    {
        name: 'InventaryEasy',
        href: '/apps/inventaryeasy',
        icon: '📦',
        tagKey: 'apps.inventaryeasy.oneliner' as const,
        color: 'from-emerald-50 to-emerald-100/50',
        border: 'border-emerald-100',
    },
];

export default function HomePage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f4ff] via-[#e8f0fe] to-white py-28 px-6 min-h-[560px] flex items-center">
                {/* Background navy glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(15,34,80,0.07),rgba(255,255,255,0))]" />
                {/* Rotating dashboard windows */}
                <HeroBgCarousel />
                <div className="relative w-full max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white text-[#0f2250] px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-[#c7d4f0] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#0f2250] inline-block" />
                        <span>Smarter ops for small business</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-[#0a0f1e] tracking-tight leading-[1.08] mb-6">
                        {t('home.hero.headline').split('chaos').map((part, i) => (
                            i === 0
                                ? <span key={i}>{part}<span style={{ background: 'linear-gradient(135deg,#0f2250 0%,#2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>chaos</span></span>
                                : <span key={i}>{part}</span>
                        ))}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                        {t('home.hero.sub')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <Link href="/apps" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0f2250] text-white font-semibold rounded-xl hover:bg-[#243456] transition-all text-base shadow-md">
                            {t('home.hero.cta1')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/chaos-challenge" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#0f2250] text-[#0f2250] font-semibold rounded-xl hover:bg-[#0f2250]/5 transition-all text-base">
                            {t('home.hero.cta2')}
                        </Link>
                    </div>
                    <Link href="/custom" className="inline-flex items-center justify-center gap-1 text-[#0f2250] font-semibold text-sm hover:text-brand-700 transition-colors mt-5">
                        {t('home.hero.cta3')}
                    </Link>
                </div>
            </section>

            {/* Metrics strip */}
            <section className="bg-white border-y border-gray-100 py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {metrics.map(({ icon: Icon, key }) => (
                            <div key={key} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{t(key)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">{t('home.metrics.disclaimer')}</p>
                </div>
            </section>

            {/* Choose your path */}
            <section className="section-pad bg-white">
                <div className="container-narrow">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">{t('home.paths.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        {/* Card A */}
                        <div className="bg-gradient-to-b from-brand-50 to-white border border-brand-100 rounded-2xl p-7 card-hover flex flex-col">
                            <div className="text-3xl mb-4">📱</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.paths.a.title')}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed flex-1">{t('home.paths.a.desc')}</p>
                            <Link href="/apps" className="btn-primary mt-6 justify-center text-sm">
                                {t('home.paths.a.cta')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        {/* Card B — highlighted */}
                        <div className="bg-gradient-to-b from-brand-600 to-brand-700 rounded-2xl p-7 card-hover flex flex-col text-white shadow-lg">
                            <div className="text-3xl mb-4">⚡</div>
                            <h3 className="text-lg font-bold mb-2">{t('home.paths.b.title')}</h3>
                            <p className="text-sm opacity-80 leading-relaxed flex-1">{t('home.paths.b.desc')}</p>
                            <Link href="/chaos-challenge" className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all text-sm">
                                {t('home.paths.b.cta')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        {/* Card C */}
                        <div className="bg-gradient-to-b from-violet-50 to-white border border-violet-100 rounded-2xl p-7 card-hover flex flex-col">
                            <div className="text-3xl mb-4">🛠️</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.paths.c.title')}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed flex-1">{t('home.paths.c.desc')}</p>
                            <Link href="/custom" className="btn-secondary mt-6 justify-center text-sm">
                                {t('home.paths.c.cta')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* What TecnoAI builds */}
            <section className="section-pad bg-gray-50">
                <div className="container-narrow">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">{t('home.builds.title')}</h2>
                    <p className="text-center text-gray-500 mb-10">{t('home.builds.desc')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {builds.map(({ icon: Icon, key }) => (
                            <div key={key} className="bg-white border border-gray-100 rounded-2xl p-6 text-center card-hover shadow-card">
                                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-brand-600" />
                                </div>
                                <p className="font-semibold text-sm text-gray-800">{t(key)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured products */}
            <section className="section-pad bg-white">
                <div className="container-narrow">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">{t('home.featured.title')}</h2>
                        <Link href="/apps" className="btn-ghost">
                            {t('home.featured.cta')} <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.href}
                                href={product.href}
                                className={`bg-gradient-to-br ${product.color} border ${product.border} rounded-2xl p-7 card-hover block group`}
                            >
                                <div className="text-3xl mb-4">{product.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">{product.name}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{t(product.tagKey)}</p>
                                <div className="flex items-center gap-1 text-brand-600 text-sm font-medium mt-5">
                                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="section-pad bg-gray-50">
                <div className="container-narrow">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('home.howitworks.title')}</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-200 to-brand-300" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: '01', title: t('home.howitworks.s1.title'), desc: t('home.howitworks.s1.desc') },
                                { step: '02', title: t('home.howitworks.s2.title'), desc: t('home.howitworks.s2.desc') },
                                { step: '03', title: t('home.howitworks.s3.title'), desc: t('home.howitworks.s3.desc') },
                            ].map((item) => (
                                <div key={item.step} className="text-center relative">
                                    <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-md">
                                        <span className="text-white font-bold text-lg">{item.step}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 text-center bg-brand-50 border border-brand-100 rounded-2xl p-6">
                        <p className="text-gray-700 font-medium italic">"{t('home.howitworks.note')}"</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 text-white text-center" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#0f2250 60%,#243456 100%)' }}>
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold mb-4">Ready to end the chaos?</h2>
                    <p className="text-brand-200 text-lg mb-8">Start in 5 minutes — no login required on this site.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/apps" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0f2250] font-semibold rounded-xl hover:bg-brand-50 transition-all shadow-md">
                            {t('home.hero.cta1')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/chaos-challenge" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-medium rounded-xl hover:bg-white/10 transition-all">
                            {t('home.hero.cta2')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
