'use client';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h2>
            {children}
        </div>
    );
}

function Steps({ items }: { items: string[] }) {
    return (
        <ol className="space-y-3 mt-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </li>
            ))}
        </ol>
    );
}

function Tips({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3 mt-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function InventaryEasyDocsPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-10 px-6">
                <div className="max-w-2xl mx-auto">
                    <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4 inline-block">
                        {t('docs.back')}
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">📦</div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{t('docs.inventaryeasy.title')}</h1>
                            <p className="text-gray-500 text-sm mt-1">8 {t('docs.readtime')}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 leading-relaxed">{t('docs.inventaryeasy.intro')}</p>
                </div>
            </div>

            {/* Content */}
            <div className="py-12 px-6">
                <div className="max-w-2xl mx-auto">

                    <Section title={t('docs.inventaryeasy.s1.title')}>
                        <Steps items={[
                            t('docs.inventaryeasy.s1.step1'),
                            t('docs.inventaryeasy.s1.step2'),
                            t('docs.inventaryeasy.s1.step3'),
                        ]} />
                    </Section>

                    <Section title={t('docs.inventaryeasy.s2.title')}>
                        <Steps items={[
                            t('docs.inventaryeasy.s2.step1'),
                            t('docs.inventaryeasy.s2.step2'),
                            t('docs.inventaryeasy.s2.step3'),
                            t('docs.inventaryeasy.s2.step4'),
                        ]} />
                    </Section>

                    <Section title={t('docs.inventaryeasy.s3.title')}>
                        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-3">
                            ⚡ {t('docs.inventaryeasy.s3.p1')}
                        </p>
                        <Steps items={[
                            t('docs.inventaryeasy.s3.step1'),
                            t('docs.inventaryeasy.s3.step2'),
                            t('docs.inventaryeasy.s3.step3'),
                            t('docs.inventaryeasy.s3.step4'),
                        ]} />
                    </Section>

                    <Section title={t('docs.inventaryeasy.s4.title')}>
                        <Steps items={[
                            t('docs.inventaryeasy.s4.step1'),
                            t('docs.inventaryeasy.s4.step2'),
                            t('docs.inventaryeasy.s4.step3'),
                            t('docs.inventaryeasy.s4.step4'),
                        ]} />
                    </Section>

                    <Section title={t('docs.inventaryeasy.s5.title')}>
                        <Steps items={[
                            t('docs.inventaryeasy.s5.step1'),
                            t('docs.inventaryeasy.s5.step2'),
                            t('docs.inventaryeasy.s5.step3'),
                        ]} />
                    </Section>

                    <Section title={t('docs.inventaryeasy.s6.title')}>
                        <Tips items={[
                            t('docs.inventaryeasy.s6.tip1'),
                            t('docs.inventaryeasy.s6.tip2'),
                            t('docs.inventaryeasy.s6.tip3'),
                        ]} />
                    </Section>

                    <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                            {t('docs.back')}
                        </Link>
                        <Link href="/apps/inventaryeasy" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                            {t('app.cta.access')} →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
