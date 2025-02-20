'use client'

import { ProtectedRoute } from "../components/ProtectedRoute"
import { Sidebar } from "../components/Sidebar"


export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 p-4 md:ml-64">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    )
}