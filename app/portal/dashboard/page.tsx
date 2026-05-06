'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, FileText, Briefcase, ExternalLink } from 'lucide-react';
import { supabase, Profile, ClientService, Document } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PortalDashboard() {
    const { t } = useLanguage();
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [services, setServices] = useState<ClientService[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/portal');
                return;
            }

            const [profileRes, servicesRes, documentsRes] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', session.user.id).single(),
                supabase.from('client_services').select('*, services(*)').eq('client_id', session.user.id).order('created_at', { ascending: false }),
                supabase.from('documents').select('*').eq('client_id', session.user.id).order('created_at', { ascending: false }),
            ]);

            if (profileRes.data?.role === 'admin') {
                router.replace('/portal/admin');
                return;
            }

            setProfile(profileRes.data);
            setServices(servicesRes.data || []);
            setDocuments(documentsRes.data || []);
            setLoading(false);
        }

        loadData();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/portal');
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
            <main className="max-w-4xl mx-auto px-6 py-10">
                {/* Welcome + logout */}
                <div className="flex items-start justify-between mb-10">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">{t('portal.dashboard.welcome')}</p>
                        <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h1>
                        {profile?.company_name && (
                            <p className="text-gray-500 mt-0.5 text-sm">{profile.company_name}</p>
                        )}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors mt-1"
                    >
                        <LogOut className="w-4 h-4" />
                        {t('portal.dashboard.logout')}
                    </button>
                </div>

                {/* Active Services */}
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-[#0f2250]" />
                        <h2 className="text-base font-semibold text-gray-900">{t('portal.dashboard.services.title')}</h2>
                    </div>
                    {services.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <p className="text-sm text-gray-400">{t('portal.dashboard.services.empty')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {services.map((cs) => (
                                <div key={cs.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm">{cs.services?.name}</h3>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${statusColor(cs.status)}`}>
                                            {t(`portal.status.${cs.status}` as any)}
                                        </span>
                                    </div>
                                    {cs.services?.description && (
                                        <p className="text-sm text-gray-500">{cs.services.description}</p>
                                    )}
                                    {cs.notes && (
                                        <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-50">{cs.notes}</p>
                                    )}
                                    <p className="text-xs text-gray-300 mt-2">Since {cs.start_date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Documents */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-[#0f2250]" />
                        <h2 className="text-base font-semibold text-gray-900">{t('portal.dashboard.docs.title')}</h2>
                    </div>
                    {documents.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <p className="text-sm text-gray-400">{t('portal.dashboard.docs.empty')}</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {documents.map((doc) => (
                                <a
                                    key={doc.id}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:border-[#0f2250]/20 hover:shadow-sm transition-all group"
                                >
                                    <FileText className="w-4 h-4 text-[#0f2250] flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                        {doc.file_type && <p className="text-xs text-gray-400">{doc.file_type}</p>}
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#0f2250] transition-colors flex-shrink-0" />
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
