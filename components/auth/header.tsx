'use client'

import { Caladea } from "next/font/google"

interface headerProps {
    label: string
}

export default function Header({ label }: headerProps) {
    return (
        <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold">Auth</h3>
            <div className="text-muted-foreground text-sm">{label}</div>
        </div>
    )
}
