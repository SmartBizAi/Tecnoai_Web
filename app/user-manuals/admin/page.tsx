'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdminManualPage() {
    const { t } = useLanguage();

    return (
        <div className="pt-16 flex flex-col" style={{ height: '100dvh' }}>
            {/* Breadcrumb bar */}
            <div className="flex items-center gap-2 px-6 py-3 bg-white border-b border-gray-100 text-sm text-gray-500 flex-shrink-0">
                <Link href="/user-manuals" className="hover:text-gray-700 transition-colors">
                    {t('manuals.title')}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <span className="text-gray-900 font-medium">{t('manuals.admin.title')}</span>
            </div>

            {/* Full-height iframe */}
            <iframe
                src="/user-manuals/admin/manual.html"
                className="flex-1 w-full border-0"
                title="Admin User Manual"
            />
        </div>
    );
}
