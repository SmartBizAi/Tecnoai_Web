'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Users, Briefcase, Plus, X, CheckCircle } from 'lucide-react';
import {
    getSession,
    signOut,
    getProfile,
    getAllProfiles,
    getAllServices,
    getAllClientServices,
    createService,
    assignService,
    type Profile,
    type Service,
    type ClientService,
} from '@/lib/portalAuth';

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function PortalAdmin() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [clients, setClients] = useState<Profile[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [clientServices, setClientServices] = useState<ClientService[]>([]);
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);

    // New service modal
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [newService, setNewService] = useState({ name: '', description: '' });
    const [savingService, setSavingService] = useState(false);

    // Assign service modal
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [assign, setAssign] = useState({ clientId: '', serviceId: '', notes: '' });
    const [savingAssign, setSavingAssign] = useState(false);

    const [toast, setToast] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const loadData = useCallback(async (token: string, userId: string) => {
        const [prof, all, svcs, cs] = await Promise.all([
            getProfile(userId, token),
            getAllProfiles(token),
            getAllServices(token),
            getAllClientServices(token),
        ]);
        setProfile(prof);
        setClients(all.filter((p) => p.role === 'client'));
        setServices(svcs);
        setClientServices(cs);
    }, []);

    useEffect(() => {
        const session = getSession();
        if (!session) { router.replace('/portal'); return; }

        loadData(session.access_token, session.user.id)
            .then(() => {
                // check admin after loading
            })
            .catch(() => router.replace('/portal'))
            .finally(() => setLoading(false));
    }, [router, loadData]);

    // Redirect non-admins after profile loads
    useEffect(() => {
        if (!loading && profile && profile.role !== 'admin') {
            router.replace('/portal/dashboard');
        }
    }, [loading, profile, router]);

    async function handleSignOut() {
        const session = getSession();
        setSigningOut(true);
        if (session) await signOut(session.access_token);
        router.push('/portal');
    }

    async function handleCreateService() {
        if (!newService.name.trim()) return;
        const session = getSession();
        if (!session) return;
        setSavingService(true);
        try {
            await createService(session.access_token, newService.name.trim(), newService.description.trim() || undefined);
            await loadData(session.access_token, session.user.id);
            setNewService({ name: '', description: '' });
            setShowServiceModal(false);
            showToast('Servicio creado');
        } catch {
            showToast('Error al crear servicio');
        } finally {
            setSavingService(false);
        }
    }

    async function handleAssign() {
        if (!assign.clientId || !assign.serviceId) return;
        const session = getSession();
        if (!session) return;
        setSavingAssign(true);
        try {
            await assignService(session.access_token, assign.clientId, assign.serviceId, assign.notes || undefined);
            await loadData(session.access_token, session.user.id);
            setAssign({ clientId: '', serviceId: '', notes: '' });
            setShowAssignModal(false);
            showToast('Servicio asignado');
        } catch {
            showToast('Error al asignar servicio');
        } finally {
            setSavingAssign(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
                <div className="w-8 h-8 border-2 border-[#0f2250] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const servicesByClient = (clientId: string) =>
        clientServices.filter((cs) => cs.client_id === clientId);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            {/* Toast */}
            {toast && (
                <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[#0f2250] text-white text-sm px-4 py-2.5 rounded-xl shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                    {toast}
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
                        <p className="text-sm text-gray-500 mt-0.5">TecnoAI — {profile?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/portal/dashboard"
                            className="text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Mi portal
                        </Link>
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

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Clientes', value: clients.length, icon: Users },
                        { label: 'Servicios', value: services.length, icon: Briefcase },
                        { label: 'Asignaciones', value: clientServices.length, icon: CheckCircle },
                    ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                            <Icon className="w-5 h-5 text-[#0f2250] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{value}</p>
                            <p className="text-xs text-gray-500">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Services section */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-[#0f2250]" />
                            <h2 className="text-lg font-bold text-gray-900">Servicios</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowAssignModal(true)}
                                className="flex items-center gap-1.5 text-xs font-medium text-[#0f2250] border border-[#0f2250]/30 px-3 py-1.5 rounded-lg hover:bg-[#0f2250]/5 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Asignar
                            </button>
                            <button
                                onClick={() => setShowServiceModal(true)}
                                className="flex items-center gap-1.5 text-xs font-medium bg-[#0f2250] text-white px-3 py-1.5 rounded-lg hover:bg-[#243456] transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Nuevo servicio
                            </button>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {services.length === 0 ? (
                            <div className="sm:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 text-center">
                                <p className="text-gray-400 text-sm">No hay servicios aún. Crea el primero.</p>
                            </div>
                        ) : services.map((svc) => (
                            <div key={svc.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                                <p className="font-semibold text-gray-900">{svc.name}</p>
                                {svc.description && (
                                    <p className="text-sm text-gray-500 mt-1">{svc.description}</p>
                                )}
                                <p className="text-xs text-gray-400 mt-2">{formatDate(svc.created_at)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Clients section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-[#0f2250]" />
                        <h2 className="text-lg font-bold text-gray-900">Clientes</h2>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{clients.length}</span>
                    </div>

                    {clients.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                            <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">No hay clientes registrados aún.</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {clients.map((client) => {
                                const assigned = servicesByClient(client.id);
                                return (
                                    <div key={client.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{client.full_name}</p>
                                                <p className="text-sm text-gray-500">{client.email}</p>
                                                {client.company_name && (
                                                    <p className="text-xs text-gray-400 mt-0.5">{client.company_name}</p>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 flex-shrink-0">{formatDate(client.created_at)}</p>
                                        </div>
                                        {assigned.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {assigned.map((cs) => (
                                                    <span
                                                        key={cs.id}
                                                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${cs.status === 'active'
                                                            ? 'bg-green-50 text-green-700'
                                                            : cs.status === 'paused'
                                                                ? 'bg-yellow-50 text-yellow-700'
                                                                : 'bg-red-50 text-red-500'
                                                            }`}
                                                    >
                                                        {cs.services.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            {/* New Service Modal */}
            {showServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-gray-900">Nuevo servicio</h3>
                            <button onClick={() => setShowServiceModal(false)}>
                                <X className="w-5 h-5 text-gray-400 hover:text-gray-700" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                                <input
                                    type="text"
                                    value={newService.name}
                                    onChange={(e) => setNewService((p) => ({ ...p, name: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2250]/20 focus:border-[#0f2250]"
                                    placeholder="ej. RxRoutes Pro"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Descripción <span className="text-gray-400 font-normal">(opcional)</span>
                                </label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService((p) => ({ ...p, description: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2250]/20 focus:border-[#0f2250] resize-none"
                                    placeholder="Descripción breve del servicio"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowServiceModal(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateService}
                                disabled={savingService || !newService.name.trim()}
                                className="px-5 py-2 bg-[#0f2250] text-white text-sm font-semibold rounded-xl hover:bg-[#243456] transition-colors disabled:opacity-60"
                            >
                                {savingService ? 'Guardando...' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Service Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-gray-900">Asignar servicio</h3>
                            <button onClick={() => setShowAssignModal(false)}>
                                <X className="w-5 h-5 text-gray-400 hover:text-gray-700" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cliente</label>
                                <select
                                    value={assign.clientId}
                                    onChange={(e) => setAssign((p) => ({ ...p, clientId: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2250]/20 focus:border-[#0f2250] bg-white"
                                >
                                    <option value="">Selecciona un cliente</option>
                                    {clients.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.full_name} — {c.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Servicio</label>
                                <select
                                    value={assign.serviceId}
                                    onChange={(e) => setAssign((p) => ({ ...p, serviceId: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2250]/20 focus:border-[#0f2250] bg-white"
                                >
                                    <option value="">Selecciona un servicio</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Notas <span className="text-gray-400 font-normal">(opcional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={assign.notes}
                                    onChange={(e) => setAssign((p) => ({ ...p, notes: e.target.value }))}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2250]/20 focus:border-[#0f2250]"
                                    placeholder="ej. Plan mensual"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAssign}
                                disabled={savingAssign || !assign.clientId || !assign.serviceId}
                                className="px-5 py-2 bg-[#0f2250] text-white text-sm font-semibold rounded-xl hover:bg-[#243456] transition-colors disabled:opacity-60"
                            >
                                {savingAssign ? 'Asignando...' : 'Asignar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
