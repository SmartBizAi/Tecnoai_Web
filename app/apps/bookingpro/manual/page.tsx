'use client';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { ROLES, ROLE_ORDER } from './data';

const ROLE_SLUGS: Record<string, string> = {
    owner: '/apps/bookingpro/manual/owner',
    rep: '/apps/bookingpro/manual/rep',
    admin: '/apps/bookingpro/manual/admin',
};

const ROLE_SECTION_COUNT: Record<string, number> = {
    owner: 3,
    rep: 4,
    admin: 6,
};

export default function BookingProManualIndex() {
    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-b from-violet-50 to-white py-16 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-5 text-sm text-gray-400">
                        <Link href="/apps" className="hover:text-gray-600 transition-colors">Apps</Link>
                        <span>/</span>
                        <Link href="/apps/bookingpro" className="hover:text-gray-600 transition-colors">BookingPro</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">User Manual</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-violet-600" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900">User Manual</h1>
                    </div>
                    <p className="text-gray-500 text-base max-w-xl">
                        Step-by-step guides for every role in BookingPro. Select your role below to open the documentation that applies to you.
                    </p>
                </div>
            </section>

            {/* Role cards */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {ROLE_ORDER.map((key) => {
                        const role = ROLES[key];
                        const Icon = role.Icon;
                        return (
                            <Link
                                key={key}
                                href={ROLE_SLUGS[key]}
                                className={`group flex flex-col gap-4 rounded-2xl border bg-white p-7 shadow-sm card-hover ${role.colors.cardBorder}`}
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${role.colors.cardBg}`}>
                                    <Icon className={`w-5 h-5 ${role.colors.iconColor}`} />
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-bold text-gray-900 text-lg mb-1">{role.label}</h2>
                                    <p className="text-xs text-gray-500 leading-relaxed">{role.intro.slice(0, 110)}…</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${role.colors.stepBadge}`}>
                                        {ROLE_SECTION_COUNT[key]} sections
                                    </span>
                                    <span className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${role.colors.linkText}`}>
                                        View <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
