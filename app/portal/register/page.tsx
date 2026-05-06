'use client';
import { useState } from 'react';
import Link from 'next/link';
import { UserPlus, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PortalRegisterPage() {
    const { t } = useLanguage();
    const [fullName, setFullName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName, company_name: company || null },
            },
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{t('portal.register.success.title')}</h2>
                        <p className="text-sm text-gray-500 mb-6">{t('portal.register.success')}</p>
                        <Link
                            href="/portal"
                            className="inline-flex items-center justify-center w-full py-3 bg-[#0f2250] text-white font-semibold rounded-xl hover:bg-[#243456] transition-all"
                        >
                            {t('portal.register.back')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0f2250]/10 rounded-xl mb-4">
                        <UserPlus className="w-6 h-6 text-[#0f2250]" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('portal.register.title')}</h1>
                    <p className="mt-2 text-sm text-gray-500">{t('portal.register.subtitle')}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="label">{t('portal.register.name')}</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">{t('portal.register.company')}</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="input-field"
                            />
                        </div>
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
                                autoComplete="new-password"
                                minLength={6}
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
                            {loading ? '...' : t('portal.register.submit')}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        {t('portal.register.login')}{' '}
                        <Link href="/portal" className="text-[#0f2250] font-medium hover:underline">
                            {t('portal.register.login.link')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
