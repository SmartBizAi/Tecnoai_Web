'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PortalLoginPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                router.replace(profile?.role === 'admin' ? '/portal/admin' : '/portal/dashboard');
            } else {
                setChecking(false);
            }
        });
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

        if (signInError) {
            setError(t('portal.login.error'));
            setLoading(false);
            return;
        }

        if (data.user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();
            router.push(profile?.role === 'admin' ? '/portal/admin' : '/portal/dashboard');
        }
    };

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-brand-900 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0f2250]/10 rounded-xl mb-4">
                        <Lock className="w-6 h-6 text-[#0f2250]" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('portal.login.title')}</h1>
                    <p className="mt-2 text-sm text-gray-500">{t('portal.login.subtitle')}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="label">{t('portal.login.email')}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="label">{t('portal.login.password')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#0f2250] text-white font-semibold rounded-xl hover:bg-[#243456] transition-all disabled:opacity-60"
                        >
                            {loading ? t('portal.login.loading') : t('portal.login.submit')}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        {t('portal.login.register')}{' '}
                        <Link href="/portal/register" className="text-[#0f2250] font-medium hover:underline">
                            {t('portal.login.register.link')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
