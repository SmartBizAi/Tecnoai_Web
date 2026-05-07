'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Briefcase, FileText, Building2, User, CheckCircle, PauseCircle, XCircle, ExternalLink } from 'lucide-react';
import {
    getSession,
    signOut,
    getProfile,
    getMyServices,
    getMyDocuments,
    type Profile,
    type ClientService,
    type Document,
} from '@/lib/portalAuth';

const statusIcon = {
    active: <CheckCircle className="w-4 h-4 text-green-500" />,
    paused: <PauseCircle className="w-4 h-4 text-yellow-500" />,
    cancelled: <XCircle className="w-4 h-4 text-red-400" />,
};

const statusLabel = {
    active: 'Activo',
    paused: 'Pausado',
    cancelled: 'Cancelado',
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function PortalDashboard() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [services, setServices] = useState<ClientService[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);

    useEffect(() => {
        const session = getSession();
        if (!session) { router.replace('/portal'); return; }

        Promise.all([
            getProfile(session.user.id, session.access_token),
            getMyServices(session.user.id, session.access_token),
            getMyDocuments(session.user.id, session.access_token),
        ])
            .then(([prof, svcs, docs]) => {
                setProfile(prof);
                setServices(svcs);
                setDocuments(docs);
            })
            .catch(() => { /* data stays empty */ })
            .finally(() => setLoading(false));
    }, [router]);

    async function handleSignOut() {
        const session = getSession();
        setSigningOut(true);
        if (session) await signOut(session.access_token);
        router.push('/portal');
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
                <div className="w-8 h-8 border-2 border-[#0f2250] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Hola, {profile?.full_name || 'Cliente'} 👋
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">{profile?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {profile?.role === 'admin' && (
                            <Link
                                href="/portal/admin"
                                className="text-xs font-medium text-[#0f2250] border border-[#0f2250]/30 px-3 py-1.5 rounded-lg hover:bg-[#0f2250]/5 transition-colors"
                            >
                                Panel Admin
                            </Link>
                        )}
                        <button
                            onClick={handleSignOut}
                            disabled={signingOut}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Salir
                        </button>
                    </div>
                </div>

                {/* Profile card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0f2250]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[#0f2250]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{profile?.full_name}</p>
                        {profile?.company_name && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                <Building2 className="w-3.5 h-3.5" />
                                {profile.company_name}
                            </p>
                        )}
                    </div>
                    <span className="text-xs bg-[#0f2250]/10 text-[#0f2250] font-medium px-2.5 py-1 rounded-full capitalize">
                        {profile?.role === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                </div>

                {/* Services */}
                <section className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-[#0f2250]" />
                        <h2 className="text-lg font-bold text-gray-900">Mis Servicios</h2>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{services.length}</span>
                    </div>

                    {services.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                            <Briefcase className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">No tienes servicios asignados aún.</p>
                            <p className="text-gray-400 text-xs mt-1">Contacta a TecnoAI para comenzar.</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {services.map((cs) => (
                                <div
                                    key={cs.id}
                                    className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900">{cs.services.name}</p>
                                        {cs.services.description && (
                                            <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                                                {cs.services.description}
                                            </p>
                                        )}
                                        {cs.notes && (
                                            <p className="text-xs text-gray-400 mt-1.5 italic">{cs.notes}</p>
                                        )}
                                        <p className="text-xs text-gray-400 mt-2">
                                            Desde {formatDate(cs.start_date)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        {statusIcon[cs.status]}
                                        <span className="text-xs font-medium text-gray-600">
                                            {statusLabel[cs.status]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Documents */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-[#0f2250]" />
                        <h2 className="text-lg font-bold text-gray-900">Mis Documentos</h2>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{documents.length}</span>
                    </div>

                    {documents.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">No hay documentos disponibles aún.</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {documents.map((doc) => (
                                <a
                                    key={doc.id}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4 hover:border-[#0f2250]/30 transition-colors group"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 bg-[#0f2250]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-4 h-4 text-[#0f2250]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-900 text-sm truncate">{doc.name}</p>
                                            <p className="text-xs text-gray-400">{formatDate(doc.created_at)}</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#0f2250] flex-shrink-0 transition-colors" />
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
