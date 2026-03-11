'use client';
import { useEffect, useState } from 'react';

/* Mini dashboard "windows" rendered as decorative background elements.
   Each frame is a small coded UI panel that fades in/out slowly. */

const frames = [
    /* ── RxRoutes: Admin Dashboard ── */
    <div key="rx-dash" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#1e3a8a] px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-300 opacity-60" />
            <span className="text-white text-[10px] font-bold tracking-wide">RxRoutes — Dashboard</span>
        </div>
        <div className="p-3 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
                {[['7', 'Active'], ['23', 'Done'], ['5', 'Pending']].map(([v, l]) => (
                    <div key={l} className="bg-brand-50 rounded-lg p-2 text-center">
                        <div className="text-base font-extrabold text-brand-700">{v}</div>
                        <div className="text-[8px] text-brand-400">{l}</div>
                    </div>
                ))}
            </div>
            {[
                ['Carlos M.', 'On Route', 'bg-green-400'],
                ['Pedro L.', 'Delivered', 'bg-brand-400'],
                ['Ana R.', 'Pending', 'bg-amber-400'],
                ['Luis G.', 'On Route', 'bg-green-400'],
            ].map(([name, status, dot]) => (
                <div key={name as string} className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg">
                    <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    <span className="text-[9px] font-semibold text-gray-700 flex-1">{name}</span>
                    <span className="text-[8px] text-gray-400">{status}</span>
                </div>
            ))}
        </div>
    </div>,

    /* ── RxRoutes: Proof of Delivery ── */
    <div key="rx-pod" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#1e3a8a] px-3 py-2">
            <span className="text-white text-[10px] font-bold">RxRoutes — Proof of Delivery</span>
        </div>
        <div className="p-3 space-y-2">
            <div className="flex gap-1.5">
                <div className="flex-1 bg-slate-700 rounded-lg h-14 flex items-center justify-center text-xl opacity-60">🚗</div>
                <div className="flex-1 bg-gray-100 rounded-lg h-14 flex items-center justify-center text-xl border-2 border-dashed border-gray-300">📷</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 h-10 flex items-center">
                <svg viewBox="0 0 100 30" className="w-full h-full">
                    <path d="M5,20 Q25,8 45,15 T85,10" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>
            <div className="flex gap-1.5">
                <button className="flex-1 bg-green-500 text-white text-[9px] font-bold py-1.5 rounded-lg">✅ Confirm</button>
                <button className="flex-1 bg-gray-100 text-gray-600 text-[9px] font-semibold py-1.5 rounded-lg">Note</button>
            </div>
        </div>
    </div>,

    /* ── BookingPro: Calendar ── */
    <div key="be-cal" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#4c1d95] px-3 py-2">
            <span className="text-white text-[10px] font-bold">BookingPro — Calendar</span>
        </div>
        <div className="p-3 space-y-1.5">
            <div className="grid grid-cols-7 gap-0.5 mb-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className="text-center text-[8px] font-bold text-gray-400">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className={`rounded min-h-[30px] p-0.5 ${i === 1 ? 'bg-violet-50 border border-violet-200' : i === 3 ? 'bg-violet-50 border border-violet-200' : 'bg-gray-50'}`}>
                        {i === 1 && <div className="w-full text-[7px] font-semibold text-violet-700 bg-violet-200 rounded px-0.5 leading-tight mt-0.5">TruckCo</div>}
                        {i === 3 && <div className="w-full text-[7px] font-semibold text-brand-700 bg-brand-200 rounded px-0.5 leading-tight mt-0.5">MedSupply</div>}
                    </div>
                ))}
            </div>
            {[
                { id: 'BK-0041', partner: 'TruckCo', sc: 'bg-green-50 text-green-700', s: 'Confirmed' },
                { id: 'BK-0042', partner: 'MedSupply', sc: 'bg-amber-50 text-amber-700', s: 'Pending' },
                { id: 'BK-0043', partner: 'FastDrop', sc: 'bg-green-50 text-green-700', s: 'Confirmed' },
            ].map((b) => (
                <div key={b.id} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg">
                    <span className="text-[8px] text-gray-400">{b.id}</span>
                    <span className="text-[8px] font-bold text-violet-700 flex-1">{b.partner}</span>
                    <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${b.sc}`}>{b.s}</span>
                </div>
            ))}
        </div>
    </div>,

    /* ── BookingPro: Partners ── */
    <div key="be-partners" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#4c1d95] px-3 py-2">
            <span className="text-white text-[10px] font-bold">BookingPro — Partners</span>
        </div>
        <div className="p-3 space-y-2">
            {[
                { name: 'TruckCo', rate: '92%', b: 12, color: 'border-l-violet-500' },
                { name: 'MedSupply', rate: '87%', b: 8, color: 'border-l-brand-500' },
                { name: 'FastDrop', rate: '96%', b: 15, color: 'border-l-emerald-500' },
                { name: 'AirMove', rate: '80%', b: 5, color: 'border-l-amber-500' },
            ].map((p) => (
                <div key={p.name} className={`bg-gray-50 border-l-4 ${p.color} rounded-lg px-3 py-2 flex items-center`}>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-800">{p.name}</p>
                        <p className="text-[8px] text-gray-400">{p.b} bookings</p>
                    </div>
                    <p className="text-sm font-extrabold text-gray-700">{p.rate}</p>
                </div>
            ))}
        </div>
    </div>,

    /* ── InventaryEasy: Grid ── */
    <div key="ie-grid" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#064e3b] px-3 py-2 flex items-center justify-between">
            <span className="text-white text-[10px] font-bold">InventaryEasy — Inventory</span>
            <span className="bg-green-400/30 text-green-100 text-[8px] font-bold px-2 py-0.5 rounded-full">34</span>
        </div>
        <div className="p-2 grid grid-cols-3 gap-1.5">
            {[
                { make: 'BMW X2', price: '$14,790', status: 'IN STOCK', bg: 'bg-slate-700' },
                { make: 'Chevy Express', price: '$17,390', status: 'IN STOCK', bg: 'bg-gray-200' },
                { make: 'Silverado LT', price: '$27,990', status: 'IN STOCK', bg: 'bg-slate-800' },
                { make: 'BMW X2 Sport', price: '$13,990', status: 'SOLD', bg: 'bg-gray-300' },
                { make: 'Suburban LT', price: '$19,990', status: 'IN STOCK', bg: 'bg-slate-700' },
                { make: 'Pacifica Tour', price: '$25,990', status: 'PENDING', bg: 'bg-gray-100' },
            ].map((v) => (
                <div key={v.make} className="rounded-lg overflow-hidden border border-gray-100">
                    <div className={`${v.bg} h-8 relative flex items-center justify-center`}>
                        <span className="text-sm opacity-40">🚗</span>
                        <div className={`absolute top-0.5 right-0.5 text-[6px] font-bold px-1 rounded-sm ${v.status === 'IN STOCK' ? 'bg-green-500 text-white' : v.status === 'SOLD' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{v.status}</div>
                    </div>
                    <div className="p-1">
                        <p className="text-[7px] font-bold text-gray-800 leading-tight truncate">{v.make}</p>
                        <p className="text-[8px] font-extrabold text-emerald-600">{v.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>,

    /* ── InventaryEasy: AI Caption ── */
    <div key="ie-ai" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#064e3b] px-3 py-2">
            <span className="text-white text-[10px] font-bold">InventaryEasy — ⚡ AI Caption</span>
        </div>
        <div className="p-3 space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
                <span className="text-sm">🚗</span>
                <div>
                    <p className="text-[9px] font-bold text-gray-800">2020 Chevrolet Silverado 1500 LT</p>
                    <p className="text-[8px] text-gray-400">12 photos · $27,990</p>
                </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                <p className="text-[8px] font-bold text-amber-700 mb-1">⚡ Generated caption</p>
                <p className="text-[8px] text-gray-600 leading-relaxed">2020 Chevrolet Silverado 1500 LT — Only 31,284 miles! Strong V8, spacious crew cab, tow package, leather seats, backup cam. Priced at $27,990.</p>
            </div>
            <div className="flex gap-1.5">
                <button className="flex-1 bg-emerald-600 text-white text-[8px] font-bold py-1.5 rounded-lg">✅ Use caption</button>
                <button className="flex-1 bg-gray-100 text-gray-600 text-[8px] font-semibold py-1.5 rounded-lg">🔄 Regenerate</button>
            </div>
            <div className="flex justify-end">
                <span className="text-[8px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">cost: 1 credit</span>
            </div>
        </div>
    </div>,
];

const POSITIONS = [
  /* top-left */   'top-8   left-4  w-56 h-60 rotate-[-6deg] opacity-[0.13]',
  /* top-right */  'top-4   right-4 w-52 h-56 rotate-[5deg]  opacity-[0.12]',
  /* mid-left */   'top-32  left-8  w-48 h-52 rotate-[-3deg] opacity-[0.10]',
  /* mid-right */  'top-24  right-8 w-54 h-58 rotate-[4deg]  opacity-[0.11]',
  /* bottom-left */'bottom-4 left-12 w-50 h-54 rotate-[2deg] opacity-[0.09]',
];

export default function HeroBgCarousel() {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
            {POSITIONS.map((pos, i) => {
                const frameIdx = (tick + i) % frames.length;
                return (
                    <div
                        key={i}
                        className={`absolute ${pos} transition-all duration-1000 ease-in-out`}
                        style={{ filter: 'blur(0.5px)' }}
                    >
                        {frames[frameIdx]}
                    </div>
                );
            })}
        </div>
    );
}
