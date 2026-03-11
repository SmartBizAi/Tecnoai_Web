'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Calendar, Users, Phone, Clock, ClipboardList } from 'lucide-react';
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

/* ─── BookingPro / JSRSF UI slide components ─── */

const BS1_Calendar = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const bookings: Record<number, { label: string; color: string }[]> = {
        1: [{ label: 'TruckCo — 9:00 AM', color: 'bg-violet-100 text-violet-700' }],
        2: [{ label: 'MedSupply — 10:30', color: 'bg-brand-100 text-brand-700' },
        { label: 'FastDrop — 2:00 PM', color: 'bg-emerald-100 text-emerald-700' }],
        3: [{ label: 'AirMove — 8:00 AM', color: 'bg-amber-100 text-amber-700' }],
        4: [{ label: 'TruckCo — 1:00 PM', color: 'bg-violet-100 text-violet-700' },
        { label: 'MedSupply — 4:00 PM', color: 'bg-brand-100 text-brand-700' }],
        5: [{ label: 'FastDrop — 9:30 AM', color: 'bg-emerald-100 text-emerald-700' }],
    };
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Unified Calendar</p>
                <span className="text-xs text-violet-600 font-medium">Week of Feb 24</span>
            </div>
            {/* Week grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => (
                    <div key={d} className="flex flex-col gap-1">
                        <div className="text-center text-[9px] font-bold text-gray-400 mb-0.5">{d}</div>
                        <div className={`rounded-lg min-h-[66px] p-1 ${i === 1 ? 'bg-violet-50 border border-violet-100' : 'bg-gray-50'}`}>
                            {(bookings[i] ?? []).map((b, bi) => (
                                <div key={bi} className={`text-[8px] font-semibold px-1 py-0.5 rounded mb-0.5 leading-tight ${b.color}`}>{b.label}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2">
                {[
                    { label: 'TruckCo', color: 'bg-violet-200' },
                    { label: 'MedSupply', color: 'bg-brand-200' },
                    { label: 'FastDrop', color: 'bg-emerald-200' },
                    { label: 'AirMove', color: 'bg-amber-200' },
                ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-sm ${color}`} />
                        <span className="text-[10px] text-gray-500">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BS2_BookingList = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Booking List</p>
            <div className="flex gap-1">
                {['All', 'Pending', 'Confirmed', 'Done'].map((f) => (
                    <button key={f} className={`text-[9px] font-semibold px-2 py-1 rounded-lg ${f === 'All' ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{f}</button>
                ))}
            </div>
        </div>
        <div className="space-y-2">
            {[
                { id: 'BK-0041', partner: 'TruckCo', client: 'Retail Hub', time: 'Mon 9:00 AM', status: 'Confirmed', sc: 'bg-green-50 text-green-700' },
                { id: 'BK-0042', partner: 'MedSupply', client: 'Clinic Norte', time: 'Tue 10:30 AM', status: 'Pending', sc: 'bg-amber-50 text-amber-700' },
                { id: 'BK-0043', partner: 'FastDrop', client: 'E-Shop Co', time: 'Tue 2:00 PM', status: 'Confirmed', sc: 'bg-green-50 text-green-700' },
                { id: 'BK-0044', partner: 'AirMove', client: 'Globe Import', time: 'Wed 8:00 AM', status: 'In Progress', sc: 'bg-brand-50 text-brand-700' },
                { id: 'BK-0045', partner: 'TruckCo', client: 'FreshMart', time: 'Thu 1:00 PM', status: 'Pending', sc: 'bg-amber-50 text-amber-700' },
            ].map((b) => (
                <div key={b.id} className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500">{b.id}</span>
                            <span className="text-[10px] font-semibold text-violet-700">{b.partner}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800 truncate">{b.client}</p>
                        <p className="text-[10px] text-gray-400">{b.time}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${b.sc}`}>{b.status}</span>
                </div>
            ))}
        </div>
    </div>
);

const BS3_BookingDetail = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Booking Detail</p>
            <span className="text-[10px] font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">Pending</span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
                {[
                    { icon: ClipboardList, label: 'Booking', value: 'BK-0042' },
                    { icon: Users, label: 'Partner', value: 'MedSupply' },
                    { icon: Phone, label: 'Client', value: 'Clinic Norte' },
                    { icon: Clock, label: 'Time', value: 'Tue 10:30 AM' },
                    { icon: Calendar, label: 'Service', value: 'Medical Courier' },
                    { icon: Users, label: 'Assigned', value: 'Dispatch A' },
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-lg p-2.5 border border-gray-100">
                        <div className="flex items-center gap-1 mb-0.5">
                            <Icon className="w-3 h-3 text-violet-500" />
                            <span className="text-[9px] text-gray-400 font-medium uppercase">{label}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-800">{value}</p>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-gray-100">
                <p className="text-[9px] text-gray-400 font-medium uppercase mb-1">Notes</p>
                <p className="text-xs text-gray-700">Pick up at loading dock B. Requires temp-controlled vehicle. 3 boxes.</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="flex-1 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl">Confirm Booking</button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl">Reassign</button>
        </div>
    </div>
);

const BS4_PartnerView = () => (
    <div className="space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Partner Management</p>
        <div className="space-y-2">
            {[
                { name: 'TruckCo', bookings: 12, active: 3, rate: '92%', color: 'border-l-violet-500', badge: 'bg-violet-50 text-violet-700' },
                { name: 'MedSupply', bookings: 8, active: 2, rate: '87%', color: 'border-l-brand-500', badge: 'bg-brand-50 text-brand-700' },
                { name: 'FastDrop', bookings: 15, active: 4, rate: '96%', color: 'border-l-emerald-500', badge: 'bg-emerald-50 text-emerald-700' },
                { name: 'AirMove', bookings: 5, active: 1, rate: '80%', color: 'border-l-amber-500', badge: 'bg-amber-50 text-amber-700' },
            ].map((p) => (
                <div key={p.name} className={`bg-white border border-gray-100 border-l-4 ${p.color} rounded-xl px-4 py-3 flex items-center gap-4`}>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-gray-900">{p.name}</p>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${p.badge}`}>Partner</span>
                        </div>
                        <div className="flex gap-3 text-[10px] text-gray-500">
                            <span>📋 {p.bookings} bookings</span>
                            <span>🔄 {p.active} active</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-extrabold text-gray-800">{p.rate}</p>
                        <p className="text-[9px] text-gray-400">completion</p>
                    </div>
                </div>
            ))}
        </div>
        <button className="w-full py-2 text-xs font-semibold text-violet-600 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors">
            + Add new partner
        </button>
    </div>
);

const BS5_ClientDirectory = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Client Directory</p>
            <div className="bg-gray-100 rounded-lg px-3 py-1 flex items-center gap-1">
                <span className="text-[10px] text-gray-400">🔍 Search...</span>
            </div>
        </div>
        <div className="space-y-2">
            {[
                { name: 'Clinic Norte', phone: '+1 305-555-0101', bookings: 8, last: 'Tue Feb 25' },
                { name: 'Retail Hub', phone: '+1 305-555-0182', bookings: 12, last: 'Mon Feb 24' },
                { name: 'E-Shop Co', phone: '+1 786-555-0245', bookings: 5, last: 'Tue Feb 25' },
                { name: 'Globe Import', phone: '+1 954-555-0312', bookings: 3, last: 'Wed Feb 26' },
                { name: 'FreshMart', phone: '+1 305-555-0419', bookings: 9, last: 'Thu Feb 27' },
            ].map((c) => (
                <div key={c.name} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{c.name}</p>
                        <p className="text-[10px] text-gray-400">{c.phone}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-[10px] font-bold text-violet-700">{c.bookings} bookings</p>
                        <p className="text-[9px] text-gray-400">Last: {c.last}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const bookingProSlides = [
    { label: '📅 Calendar', content: <BS1_Calendar /> },
    { label: '📋 Booking List', content: <BS2_BookingList /> },
    { label: '🔍 Booking Detail', content: <BS3_BookingDetail /> },
    { label: '🤝 Partners', content: <BS4_PartnerView /> },
    { label: '👥 Clients', content: <BS5_ClientDirectory /> },
];

export default function BookingProPage() {
    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);

    const features = [1, 2, 3, 4, 5, 6].map((n) => t(`bookingpro.features.${n}` as any));
    const who = [1, 2, 3].map((n) => t(`bookingpro.who.${n}` as any));
    const fixes = [1, 2, 3, 4].map((n) => t(`bookingpro.fixes.${n}` as any));
    const outcomes = [1, 2, 3].map((n) => t(`bookingpro.outcomes.${n}` as any));

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-violet-50 to-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/apps" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Apps</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm text-gray-900 font-medium">BookingPro</span>
                    </div>
                    <div className="flex items-start gap-6 mb-8">
                        <div className="text-5xl">📅</div>
                        <div>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{t('bookingpro.headline')}</h1>
                            <p className="text-xl text-gray-500 max-w-xl">{t('bookingpro.outcome')}</p>
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
                    <AppSlideshow slides={bookingProSlides} accentColor="violet" />
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
                                    <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
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
                                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-violet-500" />
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
                            <div key={i} className="bg-gradient-to-br from-violet-50 to-violet-100/30 border border-violet-100 rounded-2xl p-6 text-center">
                                <p className="font-semibold text-violet-900 text-sm">{o}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">Ranges vary by business and usage.</p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 bg-gradient-to-r from-violet-600 to-violet-700 text-white text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-3">Ready to unify your bookings?</h2>
                    <p className="text-violet-100 mb-8">Stop managing bookings through WhatsApp. Get BookingPro.</p>
                    <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-all">
                        {t('app.cta.access')} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-pad bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('app.faq.title')}</h2>
                    <div className="space-y-3">
                        <FAQ q={t('bookingpro.faq.1.q')} a={t('bookingpro.faq.1.a')} />
                        <FAQ q={t('bookingpro.faq.2.q')} a={t('bookingpro.faq.2.a')} />
                        <FAQ q={t('bookingpro.faq.3.q')} a={t('bookingpro.faq.3.a')} />
                    </div>
                </div>
            </section>

            {modalOpen && <RequestAccessModal appName="BookingPro" onClose={() => setModalOpen(false)} />}
        </div>
    );
}
