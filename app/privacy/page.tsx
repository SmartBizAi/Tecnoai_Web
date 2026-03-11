'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PrivacyPolicy() {
    const { t } = useLanguage();

    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        {t('privacy.title')}
                    </h1>
                    <p className="text-gray-500 text-lg">
                        TecnoAI<br/>
                        {t('privacy.lastUpdated')}
                    </p>
                </header>

                <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s1.title')}</h2>
                        <p className="mb-4">{t('privacy.s1.p1')}</p>
                        <p className="mb-4">{t('privacy.s1.p2')}</p>
                        <p className="font-semibold text-gray-900">{t('privacy.s1.p3')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s2.title')}</h2>
                        <p className="mb-4">{t('privacy.s2.p1')}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>{t('privacy.s2.l1.1')}</li>
                            <li>{t('privacy.s2.l1.2')}</li>
                            <li>{t('privacy.s2.l1.3')}</li>
                            <li>{t('privacy.s2.l1.4')}</li>
                            <li>{t('privacy.s2.l1.5')}</li>
                            <li>{t('privacy.s2.l1.6')}</li>
                        </ul>
                        <p className="mb-4">{t('privacy.s2.p2')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t('privacy.s2.l2.1')}</li>
                            <li>{t('privacy.s2.l2.2')}</li>
                            <li>{t('privacy.s2.l2.3')}</li>
                            <li>{t('privacy.s2.l2.4')}</li>
                            <li>{t('privacy.s2.l2.5')}</li>
                            <li>{t('privacy.s2.l2.6')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s3.title')}</h2>
                        <p className="mb-6">{t('privacy.s3.p1')}</p>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('privacy.s3.1.title')}</h3>
                        <p className="mb-3">{t('privacy.s3.1.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s3.1.l1.1')}</li>
                            <li>{t('privacy.s3.1.l1.2')}</li>
                            <li>{t('privacy.s3.1.l1.3')}</li>
                            <li>{t('privacy.s3.1.l1.4')}</li>
                            <li>{t('privacy.s3.1.l1.5')}</li>
                            <li>{t('privacy.s3.1.l1.6')}</li>
                            <li>{t('privacy.s3.1.l1.7')}</li>
                        </ul>
                        <p className="mb-3">{t('privacy.s3.1.p2')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-6">
                            <li>{t('privacy.s3.1.l2.1')}</li>
                            <li>{t('privacy.s3.1.l2.2')}</li>
                            <li>{t('privacy.s3.1.l2.3')}</li>
                            <li>{t('privacy.s3.1.l2.4')}</li>
                            <li>{t('privacy.s3.1.l2.5')}</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('privacy.s3.2.title')}</h3>
                        <p className="mb-3">{t('privacy.s3.2.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s3.2.l1.1')}</li>
                            <li>{t('privacy.s3.2.l1.2')}</li>
                            <li>{t('privacy.s3.2.l1.3')}</li>
                            <li>{t('privacy.s3.2.l1.4')}</li>
                            <li>{t('privacy.s3.2.l1.5')}</li>
                            <li>{t('privacy.s3.2.l1.6')}</li>
                            <li>{t('privacy.s3.2.l1.7')}</li>
                        </ul>
                        <p className="mb-4">{t('privacy.s3.2.p2')}</p>
                        <p className="mb-6 font-semibold">{t('privacy.s3.2.p3')}</p>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('privacy.s3.3.title')}</h3>
                        <p className="mb-3">{t('privacy.s3.3.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s3.3.l1.1')}</li>
                            <li>{t('privacy.s3.3.l1.2')}</li>
                            <li>{t('privacy.s3.3.l1.3')}</li>
                            <li>{t('privacy.s3.3.l1.4')}</li>
                            <li>{t('privacy.s3.3.l1.5')}</li>
                            <li>{t('privacy.s3.3.l1.6')}</li>
                            <li>{t('privacy.s3.3.l1.7')}</li>
                            <li>{t('privacy.s3.3.l1.8')}</li>
                            <li>{t('privacy.s3.3.l1.9')}</li>
                        </ul>
                        <p className="mb-3">{t('privacy.s3.3.p2')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-6">
                            <li>{t('privacy.s3.3.l2.1')}</li>
                            <li>{t('privacy.s3.3.l2.2')}</li>
                            <li>{t('privacy.s3.3.l2.3')}</li>
                            <li>{t('privacy.s3.3.l2.4')}</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('privacy.s3.4.title')}</h3>
                        <p className="mb-3">{t('privacy.s3.4.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s3.4.l1.1')}</li>
                            <li>{t('privacy.s3.4.l1.2')}</li>
                            <li>{t('privacy.s3.4.l1.3')}</li>
                            <li>{t('privacy.s3.4.l1.4')}</li>
                            <li>{t('privacy.s3.4.l1.5')}</li>
                            <li>{t('privacy.s3.4.l1.6')}</li>
                        </ul>
                        <p className="mb-3">{t('privacy.s3.4.p2')}</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>{t('privacy.s3.4.l2.1')}</li>
                            <li>{t('privacy.s3.4.l2.2')}</li>
                            <li>{t('privacy.s3.4.l2.3')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s4.title')}</h2>
                        <p className="mb-3">{t('privacy.s4.p1')}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>{t('privacy.s4.l1.1')}</li>
                            <li>{t('privacy.s4.l1.2')}</li>
                            <li>{t('privacy.s4.l1.3')}</li>
                            <li>{t('privacy.s4.l1.4')}</li>
                            <li>{t('privacy.s4.l1.5')}</li>
                            <li>{t('privacy.s4.l1.6')}</li>
                            <li>{t('privacy.s4.l1.7')}</li>
                            <li>{t('privacy.s4.l1.8')}</li>
                            <li>{t('privacy.s4.l1.9')}</li>
                            <li>{t('privacy.s4.l1.10')}</li>
                        </ul>
                        <p className="font-semibold text-gray-900">{t('privacy.s4.p2')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s5.title')}</h2>
                        <p className="mb-3">{t('privacy.s5.p1')}</p>
                        <p className="mb-3">{t('privacy.s5.p2')}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>{t('privacy.s5.l1.1')}</li>
                            <li>{t('privacy.s5.l1.2')}</li>
                            <li>{t('privacy.s5.l1.3')}</li>
                            <li>{t('privacy.s5.l1.4')}</li>
                        </ul>
                        <p className="mb-4">{t('privacy.s5.p3')}</p>
                        <p className="font-semibold">{t('privacy.s5.p4')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s6.title')}</h2>
                        <p className="mb-3">{t('privacy.s6.p1')}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>{t('privacy.s6.l1.1')}</li>
                            <li>{t('privacy.s6.l1.2')}</li>
                            <li>{t('privacy.s6.l1.3')}</li>
                            <li>{t('privacy.s6.l1.4')}</li>
                            <li>{t('privacy.s6.l1.5')}</li>
                            <li>{t('privacy.s6.l1.6')}</li>
                            <li>{t('privacy.s6.l1.7')}</li>
                        </ul>
                        <p className="mb-4">{t('privacy.s6.p2')}</p>
                        <p className="mb-4">{t('privacy.s6.p3')}</p>
                        <p className="font-semibold">{t('privacy.s6.p4')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s7.title')}</h2>
                        <p className="mb-6 font-semibold">{t('privacy.s7.p1')}</p>
                        <p className="mb-6">{t('privacy.s7.p2')}</p>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacy.s7.1.title')}</h3>
                        <p className="mb-6">{t('privacy.s7.1.p1')}</p>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacy.s7.2.title')}</h3>
                        <p className="mb-3">{t('privacy.s7.2.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-6">
                            <li>{t('privacy.s7.2.l1.1')}</li>
                            <li>{t('privacy.s7.2.l1.2')}</li>
                            <li>{t('privacy.s7.2.l1.3')}</li>
                            <li>{t('privacy.s7.2.l1.4')}</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacy.s7.3.title')}</h3>
                        <p className="mb-3">{t('privacy.s7.3.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>{t('privacy.s7.3.l1.1')}</li>
                            <li>{t('privacy.s7.3.l1.2')}</li>
                            <li>{t('privacy.s7.3.l1.3')}</li>
                            <li>{t('privacy.s7.3.l1.4')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s8.title')}</h2>
                        <p className="mb-3">{t('privacy.s8.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s8.l1.1')}</li>
                            <li>{t('privacy.s8.l1.2')}</li>
                            <li>{t('privacy.s8.l1.3')}</li>
                            <li>{t('privacy.s8.l1.4')}</li>
                            <li>{t('privacy.s8.l1.5')}</li>
                        </ul>
                        <p className="mb-4">{t('privacy.s8.p2')}</p>
                        <p className="mb-4 font-semibold">{t('privacy.s8.p3')}</p>
                        <p>{t('privacy.s8.p4')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s9.title')}</h2>
                        <p className="mb-3">{t('privacy.s9.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s9.l1.1')}</li>
                            <li>{t('privacy.s9.l1.2')}</li>
                            <li>{t('privacy.s9.l1.3')}</li>
                            <li>{t('privacy.s9.l1.4')}</li>
                        </ul>
                        <p className="mb-4">{t('privacy.s9.p2')}</p>
                        <p>{t('privacy.s9.p3')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s10.title')}</h2>
                        <p className="mb-3">{t('privacy.s10.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s10.l1.1')}</li>
                            <li>{t('privacy.s10.l1.2')}</li>
                            <li>{t('privacy.s10.l1.3')}</li>
                            <li>{t('privacy.s10.l1.4')}</li>
                            <li>{t('privacy.s10.l1.5')}</li>
                        </ul>
                        <p className="mb-4 font-semibold">{t('privacy.s10.p2')}</p>
                        <p>{t('privacy.s10.p3')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s11.title')}</h2>
                        <p className="mb-2">{t('privacy.s11.p1')}</p>
                        <p className="mb-2">{t('privacy.s11.p2')}</p>
                        <p>{t('privacy.s11.p3')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s12.title')}</h2>
                        <p className="mb-3">{t('privacy.s12.p1')}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>{t('privacy.s12.l1.1')}</li>
                            <li>{t('privacy.s12.l1.2')}</li>
                            <li>{t('privacy.s12.l1.3')}</li>
                            <li>{t('privacy.s12.l1.4')}</li>
                            <li>{t('privacy.s12.l1.5')}</li>
                            <li>{t('privacy.s12.l1.6')}</li>
                        </ul>
                        <p className="font-semibold">{t('privacy.s12.p2')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s13.title')}</h2>
                        <p className="mb-4">{t('privacy.s13.p1')}</p>
                        <p>{t('privacy.s13.p2')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s14.title')}</h2>
                        <p className="mb-2">{t('privacy.s14.p1')}</p>
                        <p className="mb-2">{t('privacy.s14.p2')}</p>
                        <p className="font-semibold">{t('privacy.s14.p3')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s15.title')}</h2>
                        <p className="mb-4">{t('privacy.s15.p1')}</p>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 font-medium">
                            <p className="mb-2"><strong>TecnoAI</strong></p>
                            <p className="mb-1">Email: {t('contact.email.value')}</p>
                            <p>Phone: {t('contact.phone.value')}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s16.title')}</h2>
                        <p className="text-sm text-gray-500 italic">
                            {t('privacy.s16.p1')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
