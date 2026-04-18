'use client';
import { CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const FREE_ITEMS = ['pricing.free.1', 'pricing.free.2', 'pricing.free.3', 'pricing.free.4'] as const;
const AI_ITEMS = ['pricing.ai.1', 'pricing.ai.2', 'pricing.ai.3', 'pricing.ai.4'] as const;

const PLANS = [
    { nameKey: 'pricing.plans.starter' as const, credits: '100', bestforKey: 'pricing.plans.starter.bestfor' as const, exampleKey: 'pricing.plans.starter.example' as const, highlight: false },
    { nameKey: 'pricing.plans.growth' as const, credits: '500', bestforKey: 'pricing.plans.growth.bestfor' as const, exampleKey: 'pricing.plans.growth.example' as const, highlight: true },
    { nameKey: 'pricing.plans.power' as const, credits: '2,000', bestforKey: 'pricing.plans.power.bestfor' as const, exampleKey: 'pricing.plans.power.example' as const, highlight: false },
];

export default function PricingPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{t('pricing.title')}</h1>
                    <p className="text-xl text-gray-500">{t('pricing.def')}</p>
                </div>
            </section>

            {/* Free vs AI */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h2 className="font-bold text-gray-900 mb-5">{t('pricing.free.title')}</h2>
                        <ul className="space-y-3">
                            {FREE_ITEMS.map((key) => (
                                <li key={key} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* AI */}
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
                        <h2 className="font-bold text-gray-900 mb-5">{t('pricing.ai.title')}</h2>
                        <ul className="space-y-3">
                            {AI_ITEMS.map((key) => (
                                <li key={key} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-3 h-3 text-amber-700" />
                                    </div>
                                    <span className="text-sm text-gray-700">{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className="section-pad bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Credit bundles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.nameKey}
                                className={`rounded-2xl p-8 flex flex-col ${plan.highlight
                                        ? 'bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-lg'
                                        : 'bg-white border border-gray-100 shadow-card'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="text-xs font-bold uppercase tracking-wide bg-white/20 rounded-full px-3 py-1 mb-4 self-start">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                                    {t(plan.nameKey)}
                                </h3>
                                <div className={`text-4xl font-extrabold my-4 ${plan.highlight ? 'text-white' : 'text-brand-900'}`}>
                                    {plan.credits}
                                    <span className={`text-base font-medium ml-1 ${plan.highlight ? 'text-brand-100' : 'text-gray-400'}`}>
                                        {t('pricing.plans.credits')}
                                    </span>
                                </div>
                                <p className={`text-sm mb-2 font-medium ${plan.highlight ? 'text-brand-100' : 'text-gray-500'}`}>
                                    {t('pricing.plans.bestfor')}
                                </p>
                                <p className={`text-sm mb-6 flex-1 ${plan.highlight ? 'text-brand-50' : 'text-gray-600'}`}>
                                    {t(plan.bestforKey)}
                                </p>
                                <p className={`text-xs leading-relaxed mb-6 ${plan.highlight ? 'text-brand-100 opacity-75' : 'text-gray-400'}`}>
                                    Example: {t(plan.exampleKey)}
                                </p>
                                <a
                                    href="/contact"
                                    className={`py-3 rounded-xl text-sm font-semibold text-center transition-all ${plan.highlight ? 'bg-white text-brand-700 hover:bg-brand-50' : 'btn-primary justify-center'
                                        }`}
                                >
                                    {t('pricing.plans.price')}
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center bg-brand-50 border border-brand-100 rounded-2xl p-5">
                        <p className="text-brand-800 font-medium text-sm">
                            🎁 {t('pricing.note')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
