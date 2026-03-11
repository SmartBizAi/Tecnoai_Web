'use client';
import React, { createContext, useContext, useState } from 'react';
import en from './en';
import es from './es';
import type { TranslationKey } from './en';

type Lang = 'en' | 'es';

interface LanguageContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'en',
    setLang: () => { },
    t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>('en');
    const translations = lang === 'en' ? en : es;
    const t = (key: TranslationKey): string => (translations as Record<string, string>)[key] ?? key;
    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
