import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
            <p className="text-xl mb-8">Desculpe, a página que você está procurando não existe.</p>
            <Button asChild>
                <Link href="/dashboard">Voltar para o Dashboard</Link>
            </Button>
        </div>
    )
}

