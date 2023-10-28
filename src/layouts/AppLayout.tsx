import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';

type AppLayoutProps = {
    children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <React.Fragment>
            <header className='flex justify-end px-8 pt-1'>
                <ModeToggle />
            </header>
            <main className='flex font-inter relative items-center justify-center min-h-screen container mx-auto'>
                {children}
            </main>
        </React.Fragment>
    );
};

export default AppLayout;