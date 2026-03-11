'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
    label: string;
    content: React.ReactNode;
}

interface Props {
    slides: Slide[];
    accentColor?: string; // e.g. 'blue' | 'violet' | 'emerald'
}

const ACCENT: Record<string, { dot: string; border: string; nav: string; badge: string }> = {
    blue: { dot: 'bg-brand-500', border: 'border-brand-100', nav: 'hover:bg-brand-50 text-brand-600', badge: 'bg-brand-50 text-brand-700 border-brand-100' },
    violet: { dot: 'bg-violet-500', border: 'border-violet-100', nav: 'hover:bg-violet-50 text-violet-600', badge: 'bg-violet-50 text-violet-700 border-violet-100' },
    emerald: { dot: 'bg-emerald-500', border: 'border-emerald-100', nav: 'hover:bg-emerald-50 text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
};

export default function AppSlideshow({ slides, accentColor = 'blue' }: Props) {
    const [current, setCurrent] = useState(0);
    const c = ACCENT[accentColor] ?? ACCENT.blue;

    const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
    const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

    return (
        <div className={`bg-white border ${c.border} rounded-2xl overflow-hidden shadow-card`}>
            {/* Tab labels */}
            <div className="bg-gray-50 border-b border-gray-100 px-4 overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                    {slides.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${i === current
                                    ? `border-current ${c.badge.split(' ')[1]} border-b-2`
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Slide content */}
            <div className="relative">
                <div className="p-5 min-h-[320px]">
                    {slides[current].content}
                </div>

                {/* Nav arrows */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button onClick={prev} className={`w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center bg-white ${c.nav} transition-colors`}>
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={next} className={`w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center bg-white ${c.nav} transition-colors`}>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 justify-center pb-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? `${c.dot} w-4` : 'bg-gray-200'}`}
                    />
                ))}
            </div>
        </div>
    );
}
