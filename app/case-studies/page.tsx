'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const CASES = [
    {
        icon: '🚚',
        appName: 'RxRoutes',
        href: '/apps/rxroutes',
        color: 'from-brand-50 to-brand-100/30',
        border: 'border-brand-100',
        badge: 'bg-brand-100 text-brand-800',
        problemEN: 'A courier operation was coordinating 12+ daily deliveries through WhatsApp voice notes and paper logs. Drivers had no real-time visibility, dispatchers had no proof of delivery, and billing took 2–3 days to reconcile.',
        problemES: 'Una operación de mensajería coordinaba más de 12 entregas diarias por WhatsApp y notas en papel. Los conductores no tenían visibilidad en tiempo real y la facturación tardaba 2–3 días en cuadrarse.',
        solutionEN: 'TecnoAI built RxRoutes: a field operations system with real-time driver tracking, digital delivery records, proof of delivery capture, and an admin control panel.',
        solutionES: 'TecnoAI construyó RxRoutes: un sistema de operaciones en campo con rastreo de conductores en tiempo real, registros digitales de entrega y prueba de entrega.',
        outcomeKeys: ['Reduce missed tasks by 30–70%', 'Centralize data from 3–6 sources', 'Save 5–15 hours/week'],
    },
    {
        icon: '📅',
        appName: 'BookingPro',
        href: '/apps/bookingpro',
        color: 'from-violet-50 to-violet-100/30',
        border: 'border-violet-100',
        badge: 'bg-violet-100 text-violet-800',
        problemEN: 'A booking broker was managing 4 partner companies using a shared Google Sheet and dozens of daily calls. Double-bookings, lost customer info, and unclear partner accountability were constant issues.',
        problemES: 'Un broker de reservas gestionaba 4 empresas socias con una Google Sheet compartida y docenas de llamadas diarias. Las reservas duplicadas y la información perdida de clientes eran problemas constantes.',
        solutionEN: 'TecnoAI built BookingPro: a unified booking system with partner-specific views, role-based access (admin/dispatch/partner), shared calendar, and centralized customer records.',
        solutionES: 'TecnoAI construyó BookingPro: un sistema de reservas unificado con vistas por socio, roles definidos y un calendario compartido.',
        outcomeKeys: ['Reduce missed tasks by 30–70%', 'Centralize data from 3–6 sources', 'Save 5–15 hours/week'],
    },
    {
        icon: '📦',
        appName: 'InventaryEasy',
        href: '/apps/inventaryeasy',
        color: 'from-emerald-50 to-emerald-100/30',
        border: 'border-emerald-100',
        badge: 'bg-emerald-100 text-emerald-800',
        problemEN: 'A vehicle dealer was spending 3–4 hours per day writing individual listing descriptions, searching for photos across phones, and manually copying data to sales platforms.',
        problemES: 'Un comercializador de vehículos pasaba 3–4 horas al día escribiendo descripciones de listados, buscando fotos en teléfonos y copiando datos manualmente a plataformas de venta.',
        solutionEN: 'TecnoAI built InventaryEasy: an inventory management system with photo upload per item, AI-generated descriptions and captions, and export-ready formatting for sales channels.',
        solutionES: 'TecnoAI construyó InventaryEasy: un sistema de inventario con fotos por artículo, descripciones generadas por IA y formato listo para exportar a canales de venta.',
        outcomeKeys: ['Cut posting time by 50–75% per item', 'Centralize data from 3–6 sources', 'Save 5–15 hours/week'],
    },
];

export default function CaseStudiesPage() {
    const { t, lang } = useLanguage();

    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{t('cases.title')}</h1>
                    <p className="text-lg text-gray-500">{t('cases.subtitle')}</p>
                </div>
            </section>

            {/* Cases */}
            <section className="section-pad bg-gray-50">
                <div className="max-w-4xl mx-auto space-y-8">
                    {CASES.map((c) => (
                        <div key={c.appName} className={`bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-8 card-hover`}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">{c.icon}</span>
                                <div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>{c.appName}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{t('cases.problem')}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {lang === 'es' ? c.problemES : c.problemEN}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{t('cases.solution')}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {lang === 'es' ? c.solutionES : c.solutionEN}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-white/60 pt-6">
                                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">{t('cases.outcomes')}</h3>
                                <ul className="flex flex-wrap gap-3">
                                    {c.outcomeKeys.map((o) => (
                                        <li key={o} className="bg-white/80 border border-white rounded-xl px-4 py-2 text-sm font-medium text-gray-800">
                                            ✅ {o}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-5">
                                <Link href={c.href} className="btn-ghost text-sm">
                                    Learn more about {c.appName} <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
