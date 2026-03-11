'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="max-w-2xl mx-auto px-6">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {t('about.title.main')}
                    </h1>
                </header>

                <div className="space-y-8 text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                    {/* Manifesto Introduction */}
                    <div className="space-y-4 text-gray-600">
                        <p className="font-bold text-gray-900">{t('about.manifesto.p1')}</p>
                        <p>{t('about.manifesto.p2')}</p>
                        <p>{t('about.manifesto.p3')}</p>
                    </div>

                    <div className="pl-6 border-l-4 border-brand-500 text-gray-400 italic space-y-3 my-8 text-lg md:text-xl font-normal">
                        <p>{t('about.manifesto.q1')}</p>
                        <p>{t('about.manifesto.q2')}</p>
                        <p>{t('about.manifesto.q3')}</p>
                    </div>

                    <div className="space-y-4 text-gray-600">
                        <p>{t('about.manifesto.p4')}</p>
                        <p className="font-bold text-brand-600 text-2xl">{t('about.manifesto.p5')}</p>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* Idea section */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.idea.title')}</h2>
                    <div className="space-y-5 text-gray-600 text-lg md:text-xl font-normal">
                        <p>{t('about.idea.p1')}</p>
                        <p>{t('about.idea.p2')}</p>
                        <p>{t('about.idea.p3')}</p>
                        <p className="font-semibold text-gray-900 text-xl">{t('about.idea.p4')}</p>
                        <p className="font-semibold text-brand-600 text-xl">{t('about.idea.p5')}</p>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* We believe */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.believe.title')}</h2>
                    <ul className="list-disc pl-6 space-y-2 font-bold text-gray-900 pb-4 text-xl">
                        <li>{t('about.believe.l1')}</li>
                        <li>{t('about.believe.l2')}</li>
                        <li>{t('about.believe.l3')}</li>
                    </ul>
                    <div className="space-y-4 text-gray-600 text-lg md:text-xl font-normal">
                        <p>{t('about.believe.p1')}</p>
                        <p className="font-semibold text-gray-900">{t('about.believe.p2')}</p>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* What we do */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.what.title')}</h2>
                    <div className="space-y-4 text-gray-600 text-lg md:text-xl font-normal">
                        <p>{t('about.what.p1')}</p>
                        <ul className="list-disc pl-6 space-y-2 pb-4">
                            <li>{t('about.what.l1')}</li>
                            <li>{t('about.what.l2')}</li>
                            <li>{t('about.what.l3')}</li>
                            <li>{t('about.what.l4')}</li>
                            <li>{t('about.what.l5')}</li>
                        </ul>
                        <p>{t('about.what.p2')}</p>
                        <p className="font-bold text-brand-600 text-xl md:text-2xl">{t('about.what.p3')}</p>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* More than automation */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.more.title')}</h2>
                    <div className="space-y-4 text-gray-600 text-lg md:text-xl font-normal">
                        <p className="font-bold text-gray-900 text-xl">{t('about.more.p1')}</p>
                        <p>{t('about.more.p2')}</p>
                        <p className="font-bold text-brand-600 text-2xl">{t('about.more.p3')}</p>
                        <p>{t('about.more.p4')}</p>
                        <p className="font-semibold text-gray-900">{t('about.more.p5')}</p>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* Vision */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.vision.title')}</h2>
                    <div className="space-y-4 text-gray-600 text-lg md:text-xl font-normal">
                        <p className="font-semibold text-gray-900">{t('about.vision.p1')}</p>
                        <p>{t('about.vision.p2')}</p>
                        <p>{t('about.vision.p3')}</p>
                        <p>{t('about.vision.p4')}</p>
                        <p className="font-semibold text-brand-600 text-xl">{t('about.vision.p5')}</p>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* Because in the end */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('about.end.title')}</h2>
                    <div className="space-y-4 text-gray-600 text-lg md:text-xl font-normal">
                        <p>{t('about.end.p1')}</p>
                        <p className="font-bold text-brand-600 text-2xl">{t('about.end.p2')}</p>
                    </div>

                    <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 text-center">
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{t('about.welcome.title')}</h3>
                        <p className="text-gray-500 mb-2 font-normal text-lg">{t('about.welcome.p1')}</p>
                        <p className="text-gray-900 font-bold mb-8 text-xl">{t('about.welcome.p2')}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center font-normal text-base">
                           <Link href="/apps" className="btn-primary inline-flex items-center justify-center gap-2">
                               {t('nav.cta.explore')}
                               <ArrowRight className="w-4 h-4" />
                           </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
