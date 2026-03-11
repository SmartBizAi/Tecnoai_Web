'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, MapPin, Clock, Package, User, FileText, Truck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import RequestAccessModal from '@/components/RequestAccessModal';
import AppSlideshow from '@/components/AppSlideshow';

function FAQ({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 text-sm">{q}</span>
                {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
            </button>
            {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</div>}
        </div>
    );
}

/* ─── RxRoutes UI slide components ─── */

const Slide1_Dashboard = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Admin Dashboard</p>
            <span className="text-xs text-brand-600 font-medium">Today · Feb 25</span>
        </div>
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2">
            {[
                { label: 'Active Routes', value: '7', color: 'bg-brand-50 text-brand-700', icon: Truck },
                { label: 'Delivered', value: '23', color: 'bg-green-50 text-green-700', icon: CheckCircle2 },
                { label: 'Pending', value: '5', color: 'bg-amber-50 text-amber-700', icon: Clock },
            ].map(({ label, value, color, icon: Icon }) => (
                <div key={label} className={`${color} rounded-xl p-3 text-center`}>
                    <Icon className="w-4 h-4 mx-auto mb-1 opacity-70" />
                    <div className="text-xl font-extrabold">{value}</div>
                    <div className="text-[10px] font-medium opacity-70">{label}</div>
                </div>
            ))}
        </div>
        {/* Driver status list */}
        <div className="space-y-1.5 mt-2">
            {[
                { name: 'Carlos M.', route: 'Route A — N. District', status: 'On Route', dot: 'bg-green-400' },
                { name: 'Pedro L.', route: 'Route B — Airport', status: 'Delivered', dot: 'bg-brand-400' },
                { name: 'Ana R.', route: 'Route C — Westside', status: 'Pending', dot: 'bg-amber-400' },
                { name: 'Luis G.', route: 'Route D — Downtown', status: 'On Route', dot: 'bg-green-400' },
            ].map((d) => (
                <div key={d.name} className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${d.dot} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{d.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{d.route}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500">{d.status}</span>
                </div>
            ))}
        </div>
    </div>
);

const Slide2_RouteMap = () => (
    <div className="space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Route Map — Carlos M.</p>
        {/* Fake map */}
        <div className="relative bg-brand-50 rounded-xl h-36 overflow-hidden border border-brand-100">
            {/* Grid lines to simulate a map */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(6)].map((_, i) => <div key={i} className="absolute border-t border-brand-200" style={{ top: `${i * 16.6}%`, left: 0, right: 0 }} />)}
                {[...Array(8)].map((_, i) => <div key={i} className="absolute border-l border-brand-200" style={{ left: `${i * 14.2}%`, top: 0, bottom: 0 }} />)}
            </div>
            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                <polyline points="10,50 25,35 45,30 65,20 82,15" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
                {[{ x: 10, y: 50 }, { x: 25, y: 35 }, { x: 45, y: 30 }, { x: 65, y: 20 }, { x: 82, y: 15 }].map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill={i === 0 ? '#16a34a' : i === 4 ? '#2563eb' : '#f59e0b'} stroke="white" strokeWidth="1.5" />
                ))}
            </svg>
            {/* Labels */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
                {[{ color: 'bg-green-500', label: 'Start' }, { color: 'bg-amber-400', label: '3 stops' }, { color: 'bg-brand-600', label: 'End' }].map(l => (
                    <div key={l.label} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${l.color}`} />
                        <span className="text-[9px] text-gray-600 font-medium">{l.label}</span>
                    </div>
                ))}
            </div>
        </div>
        {/* Stop list */}
        <div className="space-y-1.5">
            {[
                { stop: 'Stop 1 — 123 Oak St', time: '9:15 AM', status: '✅ Delivered' },
                { stop: 'Stop 2 — 456 Pine Ave', time: '10:02 AM', status: '✅ Delivered' },
                { stop: 'Stop 3 — 789 Maple Rd', time: '10:45 AM', status: '🔄 In progress' },
                { stop: 'Stop 4 — 321 Cedar Blvd', time: '~11:30 AM', status: '⏳ Pending' },
            ].map((s) => (
                <div key={s.stop} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                    <div>
                        <p className="text-xs font-medium text-gray-800">{s.stop}</p>
                        <p className="text-[10px] text-gray-400">{s.time}</p>
                    </div>
                    <span className="text-[10px]">{s.status}</span>
                </div>
            ))}
        </div>
    </div>
);

const Slide3_JobDetail = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Job Detail</p>
            <span className="text-xs font-semibold px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full">In Progress</span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
                {[
                    { icon: Package, label: 'Job #', value: 'RX-1042' },
                    { icon: User, label: 'Driver', value: 'Carlos M.' },
                    { icon: MapPin, label: 'Destination', value: '789 Maple Rd' },
                    { icon: Clock, label: 'ETA', value: '~10:45 AM' },
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Icon className="w-3 h-3 text-brand-500" />
                            <span className="text-[10px] text-gray-400 font-medium uppercase">{label}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-800">{value}</p>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium uppercase mb-1">Package notes</p>
                <p className="text-xs text-gray-700">3 boxes — refrigerated. Handle with care. Contact client on arrival.</p>
            </div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
            <button className="flex-1 py-2 bg-brand-600 text-white text-xs font-semibold rounded-lg">Mark Delivered</button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">Add Note</button>
        </div>
    </div>
);

const Slide4_ProofOfDelivery = () => (
    <div className="space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Proof of Delivery — RX-1042</p>
        {/* Photo upload */}
        <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 rounded-xl h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-2xl mb-1">📷</span>
                <span className="text-[10px] text-gray-400 font-medium">Add photo</span>
            </div>
            {/* Simulated taken photo */}
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-24 flex flex-col items-center justify-center relative overflow-hidden border border-gray-200">
                <span className="text-3xl">📦</span>
                <span className="absolute bottom-1 right-1 text-[8px] bg-black/60 text-white px-1.5 py-0.5 rounded">10:43 AM</span>
            </div>
        </div>
        {/* Signature pad */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <p className="text-[10px] text-gray-400 font-medium mb-2">Client signature</p>
            <div className="bg-white rounded-lg h-16 border border-gray-200 flex items-center justify-center relative">
                <svg viewBox="0 0 120 40" className="w-full h-full p-2">
                    <path d="M10,25 Q30,10 50,20 T90,15 T110,22" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="absolute bottom-1 right-2 text-[8px] text-gray-300">signed</span>
            </div>
        </div>
        {/* Recipient */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div>
                <p className="text-[10px] text-gray-400">Received by</p>
                <p className="text-xs font-semibold text-gray-800">Maria Gonzalez (front desk)</p>
            </div>
        </div>
        <button className="w-full py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl">✅ Confirm Delivery</button>
    </div>
);

const Slide5_DailyReport = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Daily Report — Feb 25</p>
            <button className="text-[10px] text-brand-600 font-semibold border border-brand-200 rounded-lg px-2 py-1 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Export
            </button>
        </div>
        {/* Summary row */}
        <div className="grid grid-cols-4 gap-1.5">
            {[
                { label: 'Total', value: '28', color: 'text-gray-800' },
                { label: 'Done', value: '23', color: 'text-green-600' },
                { label: 'Pending', value: '3', color: 'text-amber-600' },
                { label: 'Failed', value: '2', color: 'text-red-500' },
            ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-lg text-center py-2">
                    <div className={`text-base font-extrabold ${s.color}`}>{s.value}</div>
                    <div className="text-[9px] text-gray-400">{s.label}</div>
                </div>
            ))}
        </div>
        {/* Table */}
        <div className="bg-gray-50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 px-3 py-2 bg-gray-100">
                {['Driver', 'Routes', 'Delivered', 'Rate'].map(h => (
                    <span key={h} className="text-[9px] font-bold text-gray-500 uppercase">{h}</span>
                ))}
            </div>
            {[
                { driver: 'Carlos M.', routes: 3, delivered: 8, rate: '100%', color: 'text-green-600' },
                { driver: 'Pedro L.', routes: 2, delivered: 7, rate: '87%', color: 'text-amber-600' },
                { driver: 'Ana R.', routes: 2, delivered: 5, rate: '100%', color: 'text-green-600' },
                { driver: 'Luis G.', routes: 1, delivered: 3, rate: '75%', color: 'text-red-500' },
            ].map((r) => (
                <div key={r.driver} className="grid grid-cols-4 px-3 py-2.5 border-t border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-800 truncate">{r.driver}</span>
                    <span className="text-[10px] text-gray-500">{r.routes}</span>
                    <span className="text-[10px] text-gray-500">{r.delivered}</span>
                    <span className={`text-[10px] font-bold ${r.color}`}>{r.rate}</span>
                </div>
            ))}
        </div>
    </div>
);

const rxRoutesSlides = [
    { label: '📊 Dashboard', content: <Slide1_Dashboard /> },
    { label: '🗺️ Route Map', content: <Slide2_RouteMap /> },
    { label: '📋 Job Detail', content: <Slide3_JobDetail /> },
    { label: '📷 Proof of Delivery', content: <Slide4_ProofOfDelivery /> },
    { label: '📈 Daily Report', content: <Slide5_DailyReport /> },
];

export default function RxRoutesPage() {
    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);

    const features = [1, 2, 3, 4, 5, 6].map((n) => t(`rxroutes.features.${n}` as any));
    const who = [1, 2, 3].map((n) => t(`rxroutes.who.${n}` as any));
    const fixes = [1, 2, 3, 4].map((n) => t(`rxroutes.fixes.${n}` as any));
    const outcomes = [1, 2, 3].map((n) => t(`rxroutes.outcomes.${n}` as any));

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-brand-50 to-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/apps" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Apps</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm text-gray-900 font-medium">RxRoutes</span>
                    </div>
                    <div className="flex items-start gap-6 mb-8">
                        <div className="text-5xl">🚚</div>
                        <div>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{t('rxroutes.headline')}</h1>
                            <p className="text-xl text-gray-500 max-w-xl">{t('rxroutes.outcome')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => setModalOpen(true)} className="btn-primary text-base px-7 py-3.5">
                            {t('app.cta.access')} <ArrowRight className="w-4 h-4" />
                        </button>
                        <Link href="/chaos-challenge" className="btn-secondary text-base px-7 py-3.5">
                            {t('app.cta.chaos')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 5-slide app showcase ── */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">App Preview — 5 views</p>
                    <AppSlideshow slides={rxRoutesSlides} accentColor="blue" />
                </div>
            </section>

            {/* Details grid */}
            <section className="section-pad bg-white">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">{t('app.who')}</h2>
                        <ul className="space-y-3">
                            {who.map((w, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 text-sm">{w}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">{t('app.fixes')}</h2>
                        <ul className="space-y-3">
                            {fixes.map((f, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-red-500 text-xs font-bold">!</span>
                                    </div>
                                    <span className="text-gray-700 text-sm">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-pad bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('app.features')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-card">
                                <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                                </div>
                                <span className="text-sm font-medium text-gray-800">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outcomes */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('app.outcomes')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {outcomes.map((o, i) => (
                            <div key={i} className="bg-gradient-to-br from-brand-50 to-brand-100/30 border border-brand-100 rounded-2xl p-6 text-center">
                                <p className="font-semibold text-brand-900 text-sm">{o}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">Ranges vary by business and usage.</p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 bg-gradient-to-r from-brand-600 to-brand-700 text-white text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-3">Ready to take control of your field ops?</h2>
                    <p className="text-brand-100 mb-8">Get access to RxRoutes and run your routes in a real system.</p>
                    <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-all">
                        {t('app.cta.access')} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-pad bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('app.faq.title')}</h2>
                    <div className="space-y-3">
                        <FAQ q={t('rxroutes.faq.1.q')} a={t('rxroutes.faq.1.a')} />
                        <FAQ q={t('rxroutes.faq.2.q')} a={t('rxroutes.faq.2.a')} />
                        <FAQ q={t('rxroutes.faq.3.q')} a={t('rxroutes.faq.3.a')} />
                    </div>
                </div>
            </section>

            {modalOpen && <RequestAccessModal appName="RxRoutes" onClose={() => setModalOpen(false)} />}
        </div>
    );
}
