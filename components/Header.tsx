'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Header() {
    const { lang, setLang, t } = useLanguage();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) setMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { href: '/apps', label: t('nav.apps') },
        { href: '/chaos-challenge', label: t('nav.chaos') },
        { href: '/custom', label: t('nav.custom') },
        { href: '/pricing', label: t('nav.pricing') },
        { href: '/case-studies', label: t('nav.cases') },
        { href: '/about', label: t('nav.about') },
        { href: '/faq', label: t('nav.faq') },
        { href: '/contact', label: t('nav.contact') },
    ];

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                    : 'bg-white/90 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link href="/" className="flex items-center flex-shrink-0">
                        <div className="bg-brand-900 rounded-lg px-3.5 py-1.5">
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
                                aria-current={isActive(link.href) ? 'page' : undefined}
                                className={`text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:underline ${
                                    isActive(link.href)
                                        ? 'text-brand-900'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-2 xl:gap-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                                    lang === 'en'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('es')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                                    lang === 'es'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                ES
                            </button>
                        </div>

                        <Link
                            href="/chaos-challenge"
                            className="hidden lg:inline-flex items-center justify-center px-3 py-1.5 xl:px-4 xl:py-2 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                        >
                            {t('nav.cta.chaos')}
                        </Link>
                        <Link
                            href="/apps"
                            className="inline-flex items-center justify-center px-3 py-1.5 xl:px-4 xl:py-2 bg-brand-900 text-white font-semibold rounded-xl hover:bg-brand-800 transition-all text-xs shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                        >
                            {t('nav.cta.explore')}
                        </Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
                        className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg"
                    >
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                                    className={`block px-3 py-2.5 text-sm rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                                        isActive(link.href)
                                            ? 'bg-brand-50 text-brand-900'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{lang === 'en' ? 'Language' : 'Idioma'}:</span>
                                <button
                                    onClick={() => setLang('en')}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${lang === 'en' ? 'bg-brand-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                                >EN</button>
                                <button
                                    onClick={() => setLang('es')}
                                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${lang === 'es' ? 'bg-brand-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                                >ES</button>
                            </div>
                            <Link
                                href="/apps"
                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-900 text-white font-semibold rounded-xl text-sm hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                            >
                                {t('nav.cta.explore')}
                            </Link>
                            <Link
                                href="/chaos-challenge"
                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                            >
                                {t('nav.cta.chaos')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
