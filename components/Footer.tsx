'use client';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    const links = [
        { href: '/apps', label: t('nav.apps') },
        { href: '/chaos-challenge', label: t('nav.chaos') },
        { href: '/custom', label: t('nav.custom') },
        { href: '/pricing', label: t('nav.pricing') },
        { href: '/case-studies', label: t('nav.cases') },
        { href: '/about', label: t('nav.about') },
        { href: '/faq', label: t('nav.faq') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center mb-4">
                            <div className="bg-brand-900 rounded-lg px-3.5 py-1.5">
                                <span className="text-white font-extrabold text-base tracking-tight leading-none select-none">
                                    TecnoAI
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed">{t('common.tagline')}</p>
                        <div className="flex gap-3 mt-5">
                            <a
                                href="https://www.facebook.com/share/1E2ci29WMf/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                            >
                                <Facebook className="w-5 h-5 text-gray-600" />
                            </a>
                            <a
                                href="https://www.instagram.com/tecno__ai?igsh=MTl3MWtnNGhyNmpibw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                            >
                                <Instagram className="w-5 h-5 text-gray-600" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-4">{t('common.footer.links')}</h4>
                        <ul className="space-y-2.5">
                            {links.slice(0, 4).map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-800 transition-colors focus-visible:outline-none focus-visible:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-4">{t('common.footer.company' as const)}</h4>
                        <ul className="space-y-2.5">
                            {links.slice(4).map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-800 transition-colors focus-visible:outline-none focus-visible:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-4">{t('contact.title')}</h4>
                        <div className="space-y-2.5">
                            <div>
                                <span className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.email.label')}</span>
                                <p className="text-sm text-gray-600 mt-0.5">{t('contact.email.value')}</p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.phone.label')}</span>
                                <p className="text-sm text-gray-600 mt-0.5">{t('contact.phone.value')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">{t('common.footer.legal')}</p>
                    <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
