'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Header() {
    const { lang, setLang, t } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/apps', label: t('nav.apps') },
        { href: '/chaos-challenge', label: t('nav.chaos') },
        { href: '/custom', label: t('nav.custom') },
        { href: '/pricing', label: t('nav.pricing') },
        { href: '/case-studies', label: t('nav.cases') },
        { href: '/about', label: t('nav.about') },
        { href: '/faq', label: t('nav.faq') },
        { href: '/contact', label: t('nav.contact') },
        { href: '/docs', label: t('nav.docs') },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                    : 'bg-white/90 backdrop-blur-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── Logo: navy pill with white text ── */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <div className="bg-[#0f2250] rounded-lg px-3.5 py-1.5">
                            <span className="text-white font-extrabold text-base tracking-tight leading-none select-none">
                                TecnoAI
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
                        {navLinks.slice(0, 6).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-2 xl:gap-3">
                        {/* Language toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${lang === 'en'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('es')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${lang === 'es'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                ES
                            </button>
                        </div>

                        <Link
                            href="/chaos-challenge"
                            className="hidden lg:inline-flex items-center justify-center px-3 py-1.5 xl:px-4 xl:py-2 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-xs whitespace-nowrap"
                        >
                            {t('nav.cta.chaos')}
                        </Link>
                        <Link
                            href="/apps"
                            className="inline-flex items-center justify-center px-3 py-1.5 xl:px-4 xl:py-2 bg-[#0f2250] text-white font-semibold rounded-xl hover:bg-[#243456] transition-all text-xs shadow-sm whitespace-nowrap"
                        >
                            {t('nav.cta.explore')}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Language:</span>
                            <button
                                onClick={() => setLang('en')}
                                className={`px-3 py-1 text-xs font-semibold rounded-md ${lang === 'en' ? 'bg-[#0f2250] text-white' : 'bg-gray-100 text-gray-600'}`}
                            >EN</button>
                            <button
                                onClick={() => setLang('es')}
                                className={`px-3 py-1 text-xs font-semibold rounded-md ${lang === 'es' ? 'bg-[#0f2250] text-white' : 'bg-gray-100 text-gray-600'}`}
                            >ES</button>
                        </div>
                        <Link href="/apps" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0f2250] text-white font-semibold rounded-xl text-sm">
                            {t('nav.cta.explore')}
                        </Link>
                        <Link href="/chaos-challenge" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm">
                            {t('nav.cta.chaos')}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
