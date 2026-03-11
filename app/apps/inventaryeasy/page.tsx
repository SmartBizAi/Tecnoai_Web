'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Zap } from 'lucide-react';
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

/* ─── InventaryEasy Slides ─── */

const vehicles = [
    { year: 2020, make: 'BMW', model: 'X2 sDrive28i', price: '$14,790', miles: '53,064', status: 'IN STOCK', photos: 36, color: '#1a1a2e' },
    { year: 2021, make: 'Chevrolet', model: 'Express 2500', price: '$17,390', miles: '75,043', status: 'IN STOCK', photos: 18, color: '#f5f5f5' },
    { year: 2020, make: 'Chevrolet', model: 'Silverado 1500 LT', price: '$27,990', miles: '31,284', status: 'IN STOCK', photos: 12, color: '#2d3436' },
    { year: 2018, make: 'BMW', model: 'X2 xDrive28i', price: '$13,990', miles: '64,930', status: 'SOLD', photos: 21, color: '#dfe6e9' },
    { year: 2018, make: 'Chevrolet', model: 'Suburban LT', price: '$19,990', miles: '88,976', status: 'IN STOCK', photos: 21, color: '#2d3436' },
    { year: 2024, make: 'Chrysler', model: 'Pacifica Touring L', price: '$25,990', miles: '46,729', status: 'PENDING', photos: 0, color: '#f5f5f5' },
];

/* Slide 1 — Inventory Grid */
const IE1_Grid = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">Inventory</p>
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">34</span>
            </div>
            <div className="flex gap-2">
                <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 font-medium">Refresh</button>
                <button className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold">+ Add Car</button>
            </div>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-3 gap-2">
            {vehicles.map((v, i) => (
                <div key={i} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
                    {/* Photo area */}
                    <div className="relative" style={{ background: v.color === '#f5f5f5' ? '#e2e8f0' : v.color === '#dfe6e9' ? '#e2e8f0' : '#1e293b', height: 52 }}>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-50">🚗</div>
                        {/* Status badge */}
                        <div className={`absolute top-1 right-1 text-[8px] font-bold px-1.5 py-0.5 rounded-sm ${v.status === 'IN STOCK' ? 'bg-green-500 text-white' :
                                v.status === 'SOLD' ? 'bg-red-500 text-white' :
                                    'bg-amber-500 text-white'
                            }`}>{v.status}</div>
                        {/* Photo count */}
                        {v.photos > 0 && (
                            <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded">
                                1/{v.photos}
                            </div>
                        )}
                        {v.photos === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-[8px] text-gray-400 font-medium">No Image</div>
                        )}
                    </div>
                    {/* Info */}
                    <div className="p-2">
                        <p className="text-[8px] text-emerald-600 font-bold uppercase">THE SHOWROOM CORP</p>
                        <p className="text-[9px] font-bold text-gray-900 leading-tight">{v.year} {v.make} {v.model}</p>
                        <p className="text-[8px] text-gray-400 mt-0.5">Used · {v.miles} mi</p>
                        <p className="text-[9px] font-extrabold text-emerald-600 mt-1">{v.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/* Slide 2 — Add Vehicle Form */
const IE2_AddVehicle = () => (
    <div className="space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Add New Vehicle</p>
        <div className="grid grid-cols-2 gap-2">
            {[
                { label: 'Year', placeholder: '2022', value: '' },
                { label: 'Make', placeholder: 'Chevrolet', value: '' },
                { label: 'Model', placeholder: 'Silverado 1500', value: '' },
                { label: 'Trim', placeholder: 'LT Crew Cab', value: '' },
                { label: 'Miles', placeholder: '42,500', value: '' },
                { label: 'Price (USD)', placeholder: '$24,990', value: '' },
            ].map((f) => (
                <div key={f.label}>
                    <label className="text-[9px] text-gray-400 font-semibold uppercase block mb-0.5">{f.label}</label>
                    <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-[10px] text-gray-400 bg-gray-50">{f.placeholder}</div>
                </div>
            ))}
        </div>
        {/* Condition */}
        <div>
            <label className="text-[9px] text-gray-400 font-semibold uppercase block mb-1">Condition</label>
            <div className="flex gap-2">
                {['New', 'Used', 'Certified'].map((c) => (
                    <button key={c} className={`text-[10px] px-3 py-1.5 rounded-lg border font-medium ${c === 'Used' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500'}`}>{c}</button>
                ))}
            </div>
        </div>
        {/* Photo upload */}
        <div>
            <label className="text-[9px] text-gray-400 font-semibold uppercase block mb-1">Photos</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center bg-gray-50">
                <div className="text-xl mb-1">📸</div>
                <p className="text-[10px] text-gray-500 font-medium">Drop photos here or <span className="text-emerald-600">browse</span></p>
                <p className="text-[9px] text-gray-400 mt-0.5">Supports JPG, PNG — multiple OK</p>
            </div>
        </div>
        <button className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl">Save Vehicle</button>
    </div>
);

/* Slide 3 — Vehicle Detail */
const IE3_Detail = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Vehicle Detail</p>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-green-50 text-green-700 rounded-full">IN STOCK</span>
        </div>
        {/* Photo strip */}
        <div className="flex gap-1.5">
            <div className="flex-1 bg-slate-700 rounded-xl h-28 flex items-center justify-center relative">
                <span className="text-4xl opacity-60">🚗</span>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded">1 / 12</div>
            </div>
            <div className="flex flex-col gap-1.5 w-16">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-lg flex items-center justify-center text-lg ${i === 0 ? 'bg-slate-600' : 'bg-slate-200'}`}>
                        {i === 0 ? <span className="opacity-50">🔙</span> : <span className="opacity-30">🚗</span>}
                    </div>
                ))}
            </div>
        </div>
        {/* Specs */}
        <div className="grid grid-cols-2 gap-2">
            {[
                ['Make', 'Chevrolet'], ['Model', 'Silverado 1500 LT'],
                ['Year', '2020'], ['Miles', '31,284'],
                ['Color', 'Black'], ['Condition', 'Used'],
                ['VIN', '1GC4YR...'], ['Price', '$27,990'],
            ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-[9px] text-gray-400">{k}</p>
                    <p className="text-[10px] font-bold text-gray-800">{v}</p>
                </div>
            ))}
        </div>
        <div className="flex gap-2">
            <button className="flex-1 py-2 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">⚡ Generate Caption</button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-lg">✏️ Edit</button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-lg">📋 Copy</button>
        </div>
    </div>
);

/* Slide 4 — AI Caption Generator */
const IE4_AICaption = () => {
    const caption = `2020 Chevrolet Silverado 1500 LT — Only 31,284 miles! Strong V8 power, spacious crew cab, and a tow package ready for any job. Features include leather-trimmed seats, backup camera, Apple CarPlay, and more. Well-maintained — priced at $27,990. Don't miss it!`;
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">⚡ AI Caption Generator</p>
                <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2.5 py-1">cost: 1 credit</span>
            </div>
            {/* Vehicle chip */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <span className="text-lg">🚗</span>
                <div>
                    <p className="text-xs font-bold text-gray-800">2020 Chevrolet Silverado 1500 LT</p>
                    <p className="text-[10px] text-gray-400">12 photos · Used · $27,990</p>
                </div>
            </div>
            {/* Style selector */}
            <div>
                <label className="text-[9px] text-gray-400 font-semibold uppercase block mb-1.5">Caption style</label>
                <div className="flex gap-1.5">
                    {['Sales Listing', 'Social Post', 'WhatsApp'].map((s) => (
                        <button key={s} className={`text-[10px] px-3 py-1.5 rounded-lg border font-medium ${s === 'Sales Listing' ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-gray-200 text-gray-500'}`}>{s}</button>
                    ))}
                </div>
            </div>
            {/* Generated caption */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                    <Zap className="w-3 h-3 text-amber-600" />
                    <span className="text-[10px] font-bold text-amber-700">Generated caption</span>
                </div>
                <p className="text-[10px] text-gray-700 leading-relaxed">{caption}</p>
            </div>
            <div className="flex gap-2">
                <button className="flex-1 py-2 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">✅ Use this caption</button>
                <button className="flex-1 py-2 border border-amber-300 text-amber-700 text-[10px] font-semibold rounded-lg">🔄 Regenerate</button>
            </div>
        </div>
    );
};

/* Slide 5 — Post-Ready Export */
const IE5_Export = () => (
    <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Post-Ready Export</p>
            <span className="text-[10px] font-semibold text-emerald-600">6 of 34 selected</span>
        </div>
        {/* Platform targets */}
        <div>
            <label className="text-[9px] text-gray-400 font-semibold uppercase block mb-1.5">Export to</label>
            <div className="flex flex-wrap gap-1.5">
                {[
                    { label: 'Facebook Marketplace', active: true },
                    { label: 'AutoTrader', active: true },
                    { label: 'Cars.com', active: false },
                    { label: 'WhatsApp (PDF)', active: false },
                ].map((p) => (
                    <button key={p.label} className={`text-[10px] px-3 py-1.5 rounded-lg border font-medium ${p.active ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500'}`}>
                        {p.active ? '✓ ' : ''}{p.label}
                    </button>
                ))}
            </div>
        </div>
        {/* Selected vehicles */}
        <div className="space-y-1.5">
            {vehicles.slice(0, 4).map((v, i) => (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${v.status === 'SOLD' ? 'bg-gray-50 border-gray-100 opacity-50' : 'bg-white border-gray-100'}`}>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${v.status !== 'SOLD' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
                        {v.status !== 'SOLD' && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-800 truncate">{v.year} {v.make} {v.model}</p>
                        <p className="text-[9px] text-gray-400">{v.photos > 0 ? `${v.photos} photos · ⚡ caption ready` : '⚠️ No photos'}</p>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 flex-shrink-0">{v.price}</p>
                </div>
            ))}
        </div>
        <button className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2">
            <span>Export 6 vehicles</span> <ArrowRight className="w-3.5 h-3.5" />
        </button>
    </div>
);

const inventarySlides = [
    { label: '🚗 Inventory', content: <IE1_Grid /> },
    { label: '➕ Add Vehicle', content: <IE2_AddVehicle /> },
    { label: '📋 Vehicle Detail', content: <IE3_Detail /> },
    { label: '⚡ AI Caption', content: <IE4_AICaption /> },
    { label: '📤 Export / Post', content: <IE5_Export /> },
];

const COMPAT_OPTIONS = ['a', 'b', 'c', 'd'] as const;

export default function InventaryEasyPage() {
    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCompat, setSelectedCompat] = useState<string | null>(null);
    const [hasPhotos, setHasPhotos] = useState<boolean | null>(null);

    const features = [1, 2, 3, 4, 5, 6].map((n) => t(`inventaryeasy.features.${n}` as any));
    const who = [1, 2, 3].map((n) => t(`inventaryeasy.who.${n}` as any));
    const fixes = [1, 2, 3, 4].map((n) => t(`inventaryeasy.fixes.${n}` as any));
    const outcomes = [1, 2, 3].map((n) => t(`inventaryeasy.outcomes.${n}` as any));

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-emerald-50 to-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/apps" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Apps</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm text-gray-900 font-medium">InventaryEasy</span>
                    </div>
                    <div className="flex items-start gap-6 mb-8">
                        <div className="text-5xl">📦</div>
                        <div>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{t('inventaryeasy.headline')}</h1>
                            <p className="text-xl text-gray-500 max-w-xl">{t('inventaryeasy.outcome')}</p>
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
                    <AppSlideshow slides={inventarySlides} accentColor="emerald" />
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
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
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
                        {features.map((f, i) => {
                            const isAI = f.includes('⚡') || f.includes('IA') || f.includes('AI');
                            return (
                                <div key={i} className={`flex items-center gap-3 bg-white border rounded-xl px-5 py-4 shadow-card ${isAI ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isAI ? 'bg-amber-100' : 'bg-emerald-50'}`}>
                                        {isAI ? <Zap className="w-4 h-4 text-amber-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{f}</span>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 mt-5 inline-block">
                        ⚡ AI-labeled actions cost credits. All other features are free to use.
                    </p>
                </div>
            </section>

            {/* Compatibility check */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('inventaryeasy.compat.title')}</h2>
                    <p className="text-sm text-gray-500 mb-6">Help us recommend the best setup for you.</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {COMPAT_OPTIONS.map((opt) => (
                            <button key={opt} onClick={() => setSelectedCompat(opt)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${selectedCompat === opt ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-200'}`}>
                                {t(`inventaryeasy.compat.${opt}` as any)}
                            </button>
                        ))}
                    </div>
                    {selectedCompat && (
                        <>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('inventaryeasy.photos.title')}</h3>
                            <div className="flex gap-3">
                                {[true, false].map((val) => (
                                    <button key={String(val)} onClick={() => setHasPhotos(val)}
                                        className={`flex-1 py-3 px-5 rounded-xl border text-sm font-medium transition-all ${hasPhotos === val ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-200'}`}>
                                        {val ? t('inventaryeasy.photos.yes') : t('inventaryeasy.photos.no')}
                                    </button>
                                ))}
                            </div>
                            {hasPhotos === false && (
                                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mt-4">{t('inventaryeasy.photos.note')}</p>
                            )}
                            {hasPhotos === true && (
                                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800">
                                    ✅ Great! You're all set for AI-powered captions and ready-to-post formatting.
                                    <br /><button onClick={() => setModalOpen(true)} className="text-emerald-700 font-semibold underline mt-2 inline-block">{t('app.cta.access')} →</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Outcomes */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('app.outcomes')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {outcomes.map((o, i) => (
                            <div key={i} className="bg-gradient-to-br from-emerald-50 to-emerald-100/30 border border-emerald-100 rounded-2xl p-6 text-center">
                                <p className="font-semibold text-emerald-900 text-sm">{o}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">Ranges vary by business and usage.</p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-3">Ready to stop wasting time on posting?</h2>
                    <p className="text-emerald-100 mb-8">Get InventaryEasy and let AI handle the descriptions.</p>
                    <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all">
                        {t('app.cta.access')} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-pad bg-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('app.faq.title')}</h2>
                    <div className="space-y-3">
                        <FAQ q={t('inventaryeasy.faq.1.q')} a={t('inventaryeasy.faq.1.a')} />
                        <FAQ q={t('inventaryeasy.faq.2.q')} a={t('inventaryeasy.faq.2.a')} />
                        <FAQ q={t('inventaryeasy.faq.3.q')} a={t('inventaryeasy.faq.3.a')} />
                    </div>
                </div>
            </section>

            {modalOpen && <RequestAccessModal appName="InventaryEasy" onClose={() => setModalOpen(false)} />}
        </div>
    );
}
