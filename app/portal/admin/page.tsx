'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Users, Wrench, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, Profile, Service, ClientService } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type ClientWithServices = Profile & { clientServices: (ClientService & { services: Service })[] };

export default function PortalAdmin() {
    const { t } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<'clients' | 'services'>('clients');
    const [clients, setClients] = useState<ClientWithServices[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [expandedClient, setExpandedClient] = useState<string | null>(null);

    const [addingServiceTo, setAddingServiceTo] = useState<string | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [serviceNotes, setServiceNotes] = useState('');
    const [saving, setSaving] = useState(false);

    const [showNewService, setShowNewService] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDesc, setNewServiceDesc] = useState('');

    const fetchData = useCallback(async () => {
        const [clientsRes, servicesRes] = await Promise.all([
            supabase.from('profiles').select('*').eq('role', 'client').order('full_name'),
            supabase.from('services').select('*').order('name'),
        ]);

        const clientList = clientsRes.data || [];
        const { data: allClientServices } = await supabase
            .from('client_services')
            .select('*, services(*)')
            .in('client_id', clientList.map((c) => c.id));

        setClients(
            clientList.map((client) => ({
                ...client,
                clientServices: (allClientServices || []).filter((cs) => cs.client_id === client.id),
            }))
        );
        setServices(servicesRes.data || []);
    }, []);

    useEffect(() => {
        async function init() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/portal');
                return;
            }
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();
            if (profile?.role !== 'admin') {
                router.replace('/portal/dashboard');
                return;
            }
            await fetchData();
            setLoading(false);
        }
        init();
    }, [router, fetchData]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/portal');
    };

    const addServiceToClient = async () => {
        if (!addingServiceTo || !selectedServiceId) return;
        setSaving(true);
        await supabase.from('client_services').insert({
            client_id: addingServiceTo,
            service_id: selectedServiceId,
            notes: serviceNotes || null,
        });
        setAddingServiceTo(null);
        setSelectedServiceId('');
        setServiceNotes('');
        setSaving(false);
        await fetchData();
    };

    const removeClientService = async (id: string) => {
        await supabase.from('client_services').delete().eq('id', id);
        await fetchData();
    };

    const createService = async () => {
        if (!newServiceName.trim()) return;
        setSaving(true);
        await supabase.from('services').insert({
            name: newServiceName.trim(),
            description: newServiceDesc.trim() || null,
        });
        setNewServiceName('');
        setNewServiceDesc('');
        setShowNewService(false);
        setSaving(false);
        await fetchData();
    };

    const statusColor = (status: string) => {
        if (status === 'active') return 'bg-green-100 text-green-700';
        if (status === 'paused') return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-[#0f2250] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Header row */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold text-gray-900">{t('portal.admin.title')}</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        {t('portal.dashboard.logout')}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-8">
                    <button
                        onClick={() => setTab('clients')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'clients' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Users className="w-4 h-4" />
                        {t('portal.admin.clients')} ({clients.length})
                    </button>
                    <button
                        onClick={() => setTab('services')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'services' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Wrench className="w-4 h-4" />
                        {t('portal.admin.services')} ({services.length})
                    </button>
                </div>

                {/* Clients tab */}
                {tab === 'clients' && (
                    <div className="space-y-3">
                        {clients.length === 0 && (
                            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                                <p className="text-sm text-gray-400">{t('portal.admin.no.clients')}</p>
                                <p className="text-xs text-gray-300 mt-1">{t('portal.admin.clients.hint')}</p>
                            </div>
                        )}
                        {clients.map((client) => (
                            <div key={client.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div
                                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{client.full_name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {client.email}{client.company_name ? ` · ${client.company_name}` : ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-400">
                                            {client.clientServices.length} service{client.clientServices.length !== 1 ? 's' : ''}
                                        </span>
                                        {expandedClient === client.id
                                            ? <ChevronUp className="w-4 h-4 text-gray-300" />
                                            : <ChevronDown className="w-4 h-4 text-gray-300" />
                                        }
                                    </div>
                                </div>

                                {expandedClient === client.id && (
                                    <div className="border-t border-gray-100 p-5">
                                        <div className="space-y-2 mb-4">
                                            {client.clientServices.map((cs) => (
                                                <div key={cs.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900">{cs.services?.name}</span>
                                                        {cs.notes && <p className="text-xs text-gray-400 mt-0.5">{cs.notes}</p>}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor(cs.status)}`}>
                                                            {t(`portal.status.${cs.status}` as any)}
                                                        </span>
                                                        <button
                                                            onClick={() => removeClientService(cs.id)}
                                                            className="text-gray-300 hover:text-red-400 transition-colors ml-1"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {addingServiceTo === client.id ? (
                                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                                                <select
                                                    value={selectedServiceId}
                                                    onChange={(e) => setSelectedServiceId(e.target.value)}
                                                    className="input-field"
                                                >
                                                    <option value="">{t('portal.admin.select.service')}</option>
                                                    {services.map((s) => (
                                                        <option key={s.id} value={s.id}>{s.name}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="text"
                                                    placeholder={t('portal.admin.notes.placeholder') as string}
                                                    value={serviceNotes}
                                                    onChange={(e) => setServiceNotes(e.target.value)}
                                                    className="input-field"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={addServiceToClient}
                                                        disabled={saving || !selectedServiceId}
                                                        className="flex-1 py-2 bg-[#0f2250] text-white text-sm font-semibold rounded-lg hover:bg-[#243456] disabled:opacity-50 transition-all"
                                                    >
                                                        {saving ? '...' : t('portal.admin.save')}
                                                    </button>
                                                    <button
                                                        onClick={() => { setAddingServiceTo(null); setSelectedServiceId(''); setServiceNotes(''); }}
                                                        className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all"
                                                    >
                                                        {t('portal.admin.cancel')}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setAddingServiceTo(client.id)}
                                                className="flex items-center gap-1.5 text-sm text-[#0f2250] font-medium hover:opacity-70 transition-opacity"
                                            >
                                                <Plus className="w-4 h-4" />
                                                {t('portal.admin.add.service')}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Services tab */}
                {tab === 'services' && (
                    <div>
                        <div className="space-y-2 mb-4">
                            {services.length === 0 && (
                                <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                                    <p className="text-sm text-gray-400">{t('portal.admin.no.services')}</p>
                                </div>
                            )}
                            {services.map((service) => (
                                <div key={service.id} className="bg-white rounded-xl border border-gray-100 p-4">
                                    <p className="font-semibold text-gray-900 text-sm">{service.name}</p>
                                    {service.description && (
                                        <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {showNewService ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                                <h3 className="font-semibold text-gray-900 text-sm">{t('portal.admin.new.service.title')}</h3>
                                <input
                                    type="text"
                                    placeholder={t('portal.admin.service.name') as string}
                                    value={newServiceName}
                                    onChange={(e) => setNewServiceName(e.target.value)}
                                    className="input-field"
                                />
                                <textarea
                                    placeholder={t('portal.admin.service.desc') as string}
                                    value={newServiceDesc}
                                    onChange={(e) => setNewServiceDesc(e.target.value)}
                                    className="input-field resize-none"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={createService}
                                        disabled={saving || !newServiceName.trim()}
                                        className="flex-1 py-2 bg-[#0f2250] text-white text-sm font-semibold rounded-lg hover:bg-[#243456] disabled:opacity-50 transition-all"
                                    >
                                        {saving ? '...' : t('portal.admin.save')}
                                    </button>
                                    <button
                                        onClick={() => { setShowNewService(false); setNewServiceName(''); setNewServiceDesc(''); }}
                                        className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all"
                                    >
                                        {t('portal.admin.cancel')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowNewService(true)}
                                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#0f2250]/30 hover:text-[#0f2250] rounded-xl text-sm font-medium transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                {t('portal.admin.add.service.btn')}
                            </button>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
