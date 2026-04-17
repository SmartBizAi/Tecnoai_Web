'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { ROLES, ROLE_ORDER, type Section, type ColorConfig } from './data';

const ROLE_SLUGS: Record<string, string> = {
    owner: '/apps/bookingpro/manual/owner',
    rep: '/apps/bookingpro/manual/rep',
    admin: '/apps/bookingpro/manual/admin',
};

function SectionCard({ section, colors }: { section: Section; colors: ColorConfig }) {
    const [open, setOpen] = useState(true);

    return (
        <div className={`border ${colors.sectionBorder} rounded-2xl overflow-hidden bg-white shadow-sm`}>
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${colors.sectionHeaderBg}`}
            >
                <div>
                    <h3 className="font-bold text-gray-900 text-base">{section.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{section.subtitle}</p>
                </div>
                {open
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
            </button>

            {open && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {section.howtos.map((item, idx) => (
                        <div key={idx} className="px-6 py-5">
                            <h4 className="font-semibold text-sm text-gray-800 mb-3">{item.title}</h4>

                            {item.body && (
                                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                            )}

                            {item.steps && (
                                <ol className="space-y-2.5 mt-1">
                                    {item.steps.map((step, si) => (
                                        <li key={si} className="flex items-start gap-3">
                                            <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${colors.stepBadge}`}>
                                                {si + 1}
                                            </span>
                                            <span className="text-sm text-gray-600 leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            )}

                            {item.warning && (
                                <div className={`mt-3 rounded-xl px-4 py-3 border text-xs leading-relaxed ${colors.warningBg}`}>
                                    {item.warning}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function RoleManualTemplate({ roleKey }: { roleKey: string }) {
    const role = ROLES[roleKey];
    const Icon = role.Icon;

    const otherRoles = ROLE_ORDER.filter((k) => k !== roleKey);

    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            {/* Hero */}
            <section className={`bg-gradient-to-b ${role.colors.gradient} py-14 px-6 border-b border-gray-100`}>
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-5 text-sm text-gray-400">
                        <Link href="/apps" className="hover:text-gray-600 transition-colors">Apps</Link>
                        <span>/</span>
                        <Link href="/apps/bookingpro" className="hover:text-gray-600 transition-colors">BookingPro</Link>
                        <span>/</span>
                        <Link href="/apps/bookingpro/manual" className="hover:text-gray-600 transition-colors">User Manual</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{role.shortLabel}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${role.colors.cardBg}`}>
                            <Icon className={`w-5 h-5 ${role.colors.iconColor}`} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">User Manual</p>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{role.label}</h1>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-4xl mx-auto px-6 py-10 space-y-5">
                {/* Intro */}
                <div className={`rounded-2xl border px-6 py-5 ${role.colors.intro}`}>
                    <p className={`text-sm leading-relaxed ${role.colors.introText}`}>{role.intro}</p>
                </div>

                {/* Sections */}
                {role.sections.map((section) => (
                    <SectionCard key={section.id} section={section} colors={role.colors} />
                ))}

                {/* Other role links */}
                <div className="pt-4 pb-10">
                    <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Other role manuals</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {otherRoles.map((key) => {
                            const r = ROLES[key];
                            const RIcon = r.Icon;
                            return (
                                <Link
                                    key={key}
                                    href={ROLE_SLUGS[key]}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-white text-sm font-semibold transition-colors ${r.colors.tabInactive}`}
                                >
                                    <RIcon className="w-4 h-4" />
                                    {r.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
