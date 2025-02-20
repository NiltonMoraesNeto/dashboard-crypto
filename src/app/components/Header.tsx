'use client'
import { useTheme } from 'next-themes';
import Link from 'next/link';

export function Header() {
    const { setTheme, theme } = useTheme();

    return (
        <header className="bg-background border-b">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">Meu Sistema</Link>
                <div>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="bg-background border rounded p-1"
                    >
                        <option value="system">Sistema</option>
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                    </select>
                </div>
            </div>
        </header>
    );
}