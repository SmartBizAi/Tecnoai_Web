'use client';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle, Database, Map, Settings, Package, TrendingUp, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion, useReducedMotion } from 'framer-motion';
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

const ease = [0.25, 0, 0, 1] as const;

export default function HomePage() {
    const { t } = useLanguage();
    const reduceMotion = useReducedMotion();

    const fadeUp = reduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: '-50px' },
              transition: { duration: 0.45, ease },
          };

    const staggerCard = (i: number) =>
        reduceMotion
            ? {}
            : {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-40px' },
                  transition: { duration: 0.4, delay: i * 0.07, ease },
              };

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f4ff] via-[#e8f0fe] to-white py-28 px-6 min-h-[560px] flex items-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(15,34,80,0.07),rgba(255,255,255,0))]" />
                <HeroBgCarousel />
                <motion.div
                    className="relative w-full max-w-3xl mx-auto text-center"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease }}
                >
                    <div className="inline-flex items-center gap-2 bg-white text-brand-900 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-brand-200 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-brand-900 inline-block" />
                        <span>Smarter ops for small business</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-brand-950 tracking-tight leading-[1.08] mb-6">
                        {t('home.hero.headline').split('chaos').map((part, i) => (
                            i === 0
                                ? <span key={i}>{part}<span className="text-[#2563eb]">chaos</span></span>
                                : <span key={i}>{part}</span>
                        ))}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                        {t('home.hero.sub')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <Link
                            href="/apps"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-900 text-white font-semibold rounded-xl hover:bg-brand-800 transition-all text-base shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                        >
                            {t('home.hero.cta1')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/chaos-challenge"
                            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-brand-900 text-brand-900 font-semibold rounded-xl hover:bg-brand-900/5 transition-all text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                        >
                            {t('home.hero.cta2')}
                        </Link>
                    </div>
                    <Link
                        href="/custom"
                        className="inline-flex items-center justify-center gap-1 text-brand-900 font-semibold text-sm hover:text-brand-700 transition-colors mt-5 focus-visible:outline-none focus-visible:underline"
                    >
                        {t('home.hero.cta3')}
                    </Link>
                </motion.div>
            </section>

            {/* Metrics strip */}
            <section className="bg-white border-y border-gray-100 py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {metrics.map(({ icon: Icon, key }, i) => (
                            <motion.div key={key} className="flex items-center gap-3" {...staggerCard(i)}>
                                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{t(key)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">{t('home.metrics.disclaimer')}</p>
                </div>
            </section>

            {/* Choose your path */}
            <section className="section-pad bg-white">
                <div className="container-narrow">
                    <motion.h2 className="text-3xl font-bold text-center text-gray-900 mb-3" {...fadeUp}>
                        {t('home.paths.title')}
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        <motion.div className="bg-gradient-to-b from-brand-50 to-white border border-brand-100 rounded-2xl p-7 card-hover flex flex-col" {...staggerCard(0)}>
                            <div className="text-3xl mb-4">📱</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.paths.a.title')}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed flex-1">{t('home.paths.a.desc')}</p>
                            <Link href="/apps" className="btn-primary mt-6 justify-center text-sm">
                                {t('home.paths.a.cta')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                        <motion.div className="bg-gradient-to-b from-brand-600 to-brand-700 rounded-2xl p-7 card-hover flex flex-col text-white shadow-lg" {...staggerCard(1)}>
                            <div className="text-3xl mb-4">⚡</div>
                            <h3 className="text-lg font-bold mb-2">{t('home.paths.b.title')}</h3>
                            <p className="text-sm opacity-80 leading-relaxed flex-1">{t('home.paths.b.desc')}</p>
                            <Link href="/chaos-challenge" className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700">
                                {t('home.paths.b.cta')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                        <motion.div className="bg-gradient-to-b from-violet-50 to-white border border-violet-100 rounded-2xl p-7 card-hover flex flex-col" {...staggerCard(2)}>
                            <div className="text-3xl mb-4">🛠️</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.paths.c.title')}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed flex-1">{t('home.paths.c.desc')}</p>
                            <Link href="/custom" className="btn-secondary mt-6 justify-center text-sm">
                                {t('home.paths.c.cta')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What TecnoAI builds */}
            <section className="section-pad bg-gray-50">
                <div className="container-narrow">
                    <motion.div className="text-center mb-10" {...fadeUp}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('home.builds.title')}</h2>
                        <p className="text-gray-500">{t('home.builds.desc')}</p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {builds.map(({ icon: Icon, key }, i) => (
                            <motion.div key={key} className="bg-white border border-gray-100 rounded-2xl p-6 text-center card-hover shadow-card" {...staggerCard(i)}>
                                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-brand-600" />
                                </div>
                                <p className="font-semibold text-sm text-gray-800">{t(key)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured products */}
            <section className="section-pad bg-white">
                <div className="container-narrow">
                    <motion.div className="flex items-center justify-between mb-10" {...fadeUp}>
                        <h2 className="text-3xl font-bold text-gray-900">{t('home.featured.title')}</h2>
                        <Link href="/apps" className="btn-ghost">
                            {t('home.featured.cta')} <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product, i) => (
                            <motion.div key={product.href} {...staggerCard(i)}>
                                <Link
                                    href={product.href}
                                    className={`bg-gradient-to-br ${product.color} border ${product.border} rounded-2xl p-7 card-hover block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2`}
                                >
                                    <div className="text-3xl mb-4">{product.icon}</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">{product.name}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{t(product.tagKey)}</p>
                                    <div className="flex items-center gap-1 text-brand-600 text-sm font-medium mt-5">
                                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="section-pad bg-gray-50">
                <div className="container-narrow">
                    <motion.h2 className="text-3xl font-bold text-center text-gray-900 mb-12" {...fadeUp}>
                        {t('home.howitworks.title')}
                    </motion.h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-200 to-brand-300" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: '01', title: t('home.howitworks.s1.title'), desc: t('home.howitworks.s1.desc') },
                                { step: '02', title: t('home.howitworks.s2.title'), desc: t('home.howitworks.s2.desc') },
                                { step: '03', title: t('home.howitworks.s3.title'), desc: t('home.howitworks.s3.desc') },
                            ].map((item, i) => (
                                <motion.div key={item.step} className="text-center relative" {...staggerCard(i)}>
                                    <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-md">
                                        <span className="text-white font-bold text-lg">{item.step}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div className="mt-12 text-center bg-brand-50 border border-brand-100 rounded-2xl p-6" {...fadeUp}>
                        <p className="text-gray-700 font-medium italic">"{t('home.howitworks.note')}"</p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 text-white text-center bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
                <motion.div className="max-w-2xl mx-auto" {...fadeUp}>
                    <h2 className="text-4xl font-extrabold mb-4">Ready to end the chaos?</h2>
                    <p className="text-brand-200 text-lg mb-8">Start in 5 minutes — no login required on this site.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/apps"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-900 font-semibold rounded-xl hover:bg-brand-50 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                        >
                            {t('home.hero.cta1')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/chaos-challenge"
                            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-medium rounded-xl hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                        >
                            {t('home.hero.cta2')}
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
