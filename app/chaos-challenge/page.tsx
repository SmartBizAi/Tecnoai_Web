'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/* ─── Types ─── */
interface Answers {
    problem: number | null;      // 0–5
    invSource: string | null;
    hasPhotos: boolean | null;
    teamSize: 'solo' | 'small' | null;
    toolChaos: string | null;
    timeLost: string | null;
}

/* ─── Recommendation logic ─── */
function getRecommendation(a: Answers) {
    if (a.problem === 2) return 'rxroutes';         // field team
    if (a.problem === 1) return 'bookingpro';       // bookings
    if (a.problem === 3) return 'inventaryeasy';    // inventory
    return 'control';                               // custom
}

function getChaosMap(a: Answers): string[] {
    const maps: Record<number, string[]> = {
        0: ['Everything funnels through you—no delegation path', 'Daily priorities unclear until mid-afternoon', 'Tasks forgotten because they live in your head'],
        1: ['Critical tasks fall between team members', 'No central view of what\'s pending vs done', 'Deadlines missed because nothing has an owner'],
        2: ['No real-time visibility into driver or field status', 'Delivery proof scattered across phones and chats', 'Manual coordination eating 1–2 hours/day'],
        3: ['Writing captions manually per item takes 10–20 min each', 'Photos scattered across devices and drives', 'No system to know what\'s posted vs pending'],
        4: ['Client inquiries getting lost in messages', 'Follow-up depends on memory, not a system', 'Inconsistent touchpoints causing churn'],
        5: ['Data split between 3–6 tools (Sheets, notes, WhatsApp)', 'No single source of truth for jobs or clients', 'Decisions made on stale or incomplete info'],
    };
    return maps[a.problem ?? 0] ?? maps[0];
}

function getRoiText(a: Answers): { hours: string; description: string } {
    const timeLostMap: Record<string, { hours: string; description: string }> = {
        low: { hours: '3–6 hours/week', description: 'A centralized system could recover most of your manual overhead.' },
        mid: { hours: '5–10 hours/week', description: 'Centralizing your operation could cut your overhead to near zero.' },
        high: { hours: '8–16 hours/week', description: 'A structured system could save you the equivalent of 2 full workdays.' },
        vhigh: { hours: '15–25 hours/week', description: 'You\'re losing serious time. The right system could transform your output.' },
    };
    return timeLostMap[a.timeLost ?? 'mid'];
}

/* ─── Step progress bar ─── */
function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex gap-1 mb-8">
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < current ? 'bg-brand-600' : 'bg-gray-100'}`} />
            ))}
        </div>
    );
}

/* ─── Option button ─── */
function OptionBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${selected
                    ? 'border-brand-500 bg-brand-50 text-brand-800 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-brand-200 hover:bg-gray-50'
                }`}
        >
            {label}
        </button>
    );
}

/* ─── Results screen ─── */
function ResultsScreen({ answers, onUnlock, t }: { answers: Answers; onUnlock: () => void; t: (key: any) => string }) {
    const router = useRouter();
    const rec = getRecommendation(answers);
    const chaosMap = getChaosMap(answers);
    const roi = getRoiText(answers);

    const appMeta: Record<string, { name: string; href: string; color: string; icon: string }> = {
        rxroutes: { name: 'RxRoutes', href: '/apps/rxroutes', color: 'bg-brand-600', icon: '🚚' },
        bookingpro: { name: 'BookingPro', href: '/apps/bookingpro', color: 'bg-violet-600', icon: '📅' },
        inventaryeasy: { name: 'InventaryEasy', href: '/apps/inventaryeasy', color: 'bg-emerald-600', icon: '📦' },
    };

    const coreModules = ['Jobs/Orders with statuses', 'Calendar', 'Daily dashboard', 'Roles (Owner/Staff)', 'Tasks with due dates'];
    const optModules = ['CRM Lite (Clients)', 'Client Portal'];

    const goToCustomPrefilled = () => {
        const params = new URLSearchParams();
        params.set('summary', `Based on your Chaos Challenge: main problem #${(answers.problem ?? 0) + 1}, team size: ${answers.teamSize ?? 'solo'}, tools: ${answers.toolChaos ?? 'mixed'}, time lost: ${answers.timeLost ?? 'mid'}.`);
        params.set('modules', rec === 'control' ? 'Control Center,CRM Lite,Client Portal' : appMeta[rec]?.name ?? '');
        router.push(`/custom?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">{t('chaos.results.title')}</h2>

            {/* Chaos Map */}
            <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-card">
                <h3 className="font-bold text-gray-900 mb-4">{t('chaos.results.map.title')}</h3>
                <ul className="space-y-3">
                    {chaosMap.map((leak, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                            </div>
                            <span className="text-sm text-gray-700">{leak}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ROI */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-50 border border-brand-100 rounded-2xl p-7">
                <h3 className="font-bold text-gray-900 mb-2">{t('chaos.results.roi.title')}</h3>
                <p className="text-sm text-gray-600 mb-3">{t('chaos.results.roi.desc')}</p>
                <div className="text-3xl font-extrabold gradient-text">{roi.hours}</div>
                <p className="text-sm text-gray-600 mt-2">{roi.description}</p>
                <p className="text-xs text-gray-400 mt-2">Estimates based on typical businesses with your profile. Ranges vary.</p>
            </div>

            {/* Recommendation */}
            <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-card">
                <h3 className="font-bold text-gray-900 mb-5">{t('chaos.results.rec.title')}</h3>
                {rec !== 'control' ? (
                    <div className="space-y-3">
                        <div className={`${appMeta[rec].color} text-white rounded-xl p-5`}>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{appMeta[rec].icon}</span>
                                <span className="font-bold text-lg">{appMeta[rec].name}</span>
                            </div>
                            <p className="text-sm opacity-80">This app is built exactly for your type of operation.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href={appMeta[rec].href} className="btn-primary flex-1 justify-center">
                                Go to {appMeta[rec].name} <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button onClick={goToCustomPrefilled} className="btn-secondary flex-1 justify-center text-sm">
                                {t('chaos.different')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-xl p-6">
                            <p className="font-bold text-lg mb-1">{t('chaos.results.control.name')}</p>
                            <p className="text-sm opacity-80 mb-4">{t('chaos.results.control.desc')}</p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">{t('chaos.results.modules.core')}</p>
                                    <ul className="space-y-1.5">
                                        {coreModules.map((m) => (
                                            <li key={m} className="flex items-center gap-2 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-brand-200" />{m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">{t('chaos.results.modules.opt')}</p>
                                    <ul className="space-y-1.5">
                                        {optModules.map((m) => (
                                            <li key={m} className="flex items-center gap-2 text-sm opacity-75">
                                                <div className="w-4 h-4 rounded-full border-2 border-brand-300" />{m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button onClick={goToCustomPrefilled} className="btn-primary w-full justify-center">
                            Request this custom build <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Preview */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card">
                <div className="p-7">
                    <h3 className="font-bold text-gray-900 mb-2">{t('chaos.results.preview.title')}</h3>
                    <p className="text-sm text-gray-500 mb-5">{t('chaos.results.preview.sub')}</p>
                </div>
                {/* Mockup UI */}
                <div className="bg-gray-50 border-t border-gray-100 p-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Top bar */}
                        <div className="bg-brand-600 px-5 py-3 flex items-center gap-3">
                            <Zap className="w-4 h-4 text-white" />
                            <span className="text-white font-semibold text-sm">Control Center</span>
                            <div className="ml-auto flex gap-2 opacity-60">
                                {['Dashboard', 'Jobs', 'Calendar', 'Team'].map((tab) => (
                                    <span key={tab} className="text-xs text-white">{tab}</span>
                                ))}
                            </div>
                        </div>
                        {/* Dashboard grid */}
                        <div className="p-5 grid grid-cols-3 gap-3">
                            {[
                                { label: 'Open Jobs', value: '12', color: 'bg-brand-50' },
                                { label: 'Completed Today', value: '8', color: 'bg-green-50' },
                                { label: 'Pending Tasks', value: '4', color: 'bg-amber-50' },
                            ].map((card) => (
                                <div key={card.label} className={`${card.color} rounded-lg p-4 text-center`}>
                                    <div className="text-2xl font-bold text-gray-800">{card.value}</div>
                                    <div className="text-xs text-gray-500 mt-1">{card.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* Job list preview */}
                        <div className="px-5 pb-5 space-y-2">
                            {[
                                { job: 'Delivery #1042', status: 'In Progress', color: 'text-brand-600 bg-brand-50' },
                                { job: 'Route A — Downtown', status: 'Completed', color: 'text-green-600 bg-green-50' },
                                { job: 'Client Follow-up', status: 'Pending', color: 'text-amber-600 bg-amber-50' },
                            ].map((row) => (
                                <div key={row.job} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700 font-medium">{row.job}</span>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.color}`}>{row.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-6 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Real-time job tracking', 'Role-based access', 'Daily dashboard'].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" /> {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Unlock */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
                <p className="text-gray-400 text-sm mb-2">Want the high-fidelity version with your workflow?</p>
                <h3 className="text-2xl font-bold text-white mb-5">{t('chaos.unlock.btn')}</h3>
                <button
                    onClick={onUnlock}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all"
                >
                    {t('chaos.unlock.btn')} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

/* ─── Main page ─── */
export default function ChaosChallengeePage() {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({ problem: null, invSource: null, hasPhotos: null, teamSize: null, toolChaos: null, timeLost: null });
    const [showResults, setShowResults] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);
    const [unlockSubmitted, setUnlockSubmitted] = useState(false);
    const [unlockForm, setUnlockForm] = useState({ fullName: '', email: '', phone: '' });

    const isInventory = answers.problem === 3;

    // Build dynamic steps
    const steps: Array<{ id: string; render: () => JSX.Element }> = [
        {
            id: 'problem',
            render: () => (
                <div>
                    <p className="text-sm font-semibold text-brand-600 mb-2">{t('chaos.step')} 1 {t('chaos.of')} {totalSteps}</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('chaos.q1')}</h2>
                    <div className="space-y-3">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <OptionBtn
                                key={i}
                                label={t(`chaos.q1.o${i + 1}` as any)}
                                selected={answers.problem === i}
                                onClick={() => {
                                    setAnswers({ ...answers, problem: i });
                                }}
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        ...(isInventory ? [
            {
                id: 'invSource',
                render: () => (
                    <div>
                        <p className="text-sm font-semibold text-brand-600 mb-2">{t('chaos.step')} 2 {t('chaos.of')} {totalSteps}</p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('chaos.q2.inv')}</h2>
                        <div className="space-y-3">
                            {['a', 'b', 'c', 'd'].map((k) => (
                                <OptionBtn key={k} label={t(`chaos.q2.inv.${k}` as any)} selected={answers.invSource === k} onClick={() => setAnswers({ ...answers, invSource: k })} />
                            ))}
                        </div>
                    </div>
                ),
            },
            {
                id: 'hasPhotos',
                render: () => (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('chaos.q3.photos')}</h2>
                        <div className="space-y-3">
                            <OptionBtn label={t('chaos.q3.photos.yes')} selected={answers.hasPhotos === true} onClick={() => setAnswers({ ...answers, hasPhotos: true })} />
                            <OptionBtn label={t('chaos.q3.photos.no')} selected={answers.hasPhotos === false} onClick={() => setAnswers({ ...answers, hasPhotos: false })} />
                        </div>
                    </div>
                ),
            },
        ] : []),
        {
            id: 'teamSize',
            render: () => (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('chaos.q4')}</h2>
                    <div className="space-y-3">
                        <OptionBtn label={t('chaos.q4.solo')} selected={answers.teamSize === 'solo'} onClick={() => setAnswers({ ...answers, teamSize: 'solo' })} />
                        <OptionBtn label={t('chaos.q4.small')} selected={answers.teamSize === 'small'} onClick={() => setAnswers({ ...answers, teamSize: 'small' })} />
                    </div>
                </div>
            ),
        },
        {
            id: 'toolChaos',
            render: () => (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('chaos.q5')}</h2>
                    <div className="space-y-3">
                        {['sheets', 'whatsapp', 'notes', 'mixed'].map((k) => (
                            <OptionBtn key={k} label={t(`chaos.q5.${k}` as any)} selected={answers.toolChaos === k} onClick={() => setAnswers({ ...answers, toolChaos: k })} />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 'timeLost',
            render: () => (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('chaos.q6')}</h2>
                    <div className="space-y-3">
                        {['low', 'mid', 'high', 'vhigh'].map((k) => (
                            <OptionBtn key={k} label={t(`chaos.q6.${k}` as any)} selected={answers.timeLost === k} onClick={() => setAnswers({ ...answers, timeLost: k })} />
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    const totalSteps = steps.length;
    const currentStep = steps[step];

    const canAdvance = () => {
        const sid = currentStep?.id;
        if (sid === 'problem') return answers.problem !== null;
        if (sid === 'invSource') return answers.invSource !== null;
        if (sid === 'hasPhotos') return answers.hasPhotos !== null;
        if (sid === 'teamSize') return answers.teamSize !== null;
        if (sid === 'toolChaos') return answers.toolChaos !== null;
        if (sid === 'timeLost') return answers.timeLost !== null;
        return false;
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <div className="pt-16 pb-20 px-6">
                <div className="max-w-xl mx-auto mt-10">
                    <ResultsScreen answers={answers} onUnlock={() => setShowUnlock(true)} t={t} />
                    {showUnlock && !unlockSubmitted && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUnlock(false)} />
                            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">{t('chaos.unlock.title')}</h2>
                                <p className="text-sm text-gray-500 mb-6">{t('chaos.unlock.sub')}</p>
                                <form onSubmit={(e) => { e.preventDefault(); setUnlockSubmitted(true); setShowUnlock(false); }} className="space-y-4">
                                    <div>
                                        <label className="label">{t('chaos.unlock.fullname')}</label>
                                        <input type="text" required className="input-field" value={unlockForm.fullName} onChange={(e) => setUnlockForm({ ...unlockForm, fullName: e.target.value })} placeholder="Jane Smith" />
                                    </div>
                                    <div>
                                        <label className="label">{t('chaos.unlock.email')}</label>
                                        <input type="email" required className="input-field" value={unlockForm.email} onChange={(e) => setUnlockForm({ ...unlockForm, email: e.target.value })} placeholder="jane@business.com" />
                                    </div>
                                    <div>
                                        <label className="label">{t('chaos.unlock.phone')}</label>
                                        <input type="tel" required className="input-field" value={unlockForm.phone} onChange={(e) => setUnlockForm({ ...unlockForm, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <button type="submit" className="btn-primary w-full justify-center py-3.5">{t('chaos.unlock.submit')}</button>
                                </form>
                            </div>
                        </div>
                    )}
                    {unlockSubmitted && (
                        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg z-50">
                            ✅ {t('chaos.unlock.success')}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                        <Zap className="w-3.5 h-3.5" /> Free diagnosis — 5 min
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{t('chaos.title')}</h1>
                    <p className="text-lg text-gray-500">{t('chaos.subtitle')}</p>
                </div>
            </section>

            {/* Wizard */}
            <section className="py-16 px-6">
                <div className="max-w-xl mx-auto">
                    <ProgressBar current={step + 1} total={totalSteps} />
                    {currentStep.render()}

                    <div className="flex gap-3 mt-8">
                        {step > 0 && (
                            <button
                                onClick={() => { setStep(step - 1); }}
                                className="btn-secondary px-5"
                            >
                                <ChevronLeft className="w-4 h-4" /> {t('chaos.back')}
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={!canAdvance()}
                            className={`btn-primary flex-1 justify-center ${!canAdvance() ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                            {step < steps.length - 1 ? t('chaos.next') : 'See my diagnosis →'}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
