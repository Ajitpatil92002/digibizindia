"use client"

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface CongratsComponentProps {
    title: string;
    message: string;
    link: string;
}

const CongratsComponent: React.FC<CongratsComponentProps> = ({ title, message, link }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:opacity-75 dark:bg-slate-700">
            <div className="bg-white space-y-3 p-8 rounded-lg shadow-lg text-center max-w-lg dark:bg-background">
                <div className="text-4xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold mb-4 text-blue-600">{title}</h1>
                <p className="text-gray-700 text-lg mb-6 dark:text-white">{message}</p>
                <div className="text-4xl">🎊🎈🎉</div>
                <Link href={link} className={cn(buttonVariants({ variant: "outline" }))}>View Your Site !!</Link>
            </div>
        </div>
    );
};

export default CongratsComponent;
