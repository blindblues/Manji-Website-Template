import React, { useState, useEffect } from 'react';

// Default password hash for "password"
const TARGET_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(c => c.trim().startsWith('site_auth='));

        if (authCookie) {
            const hash = authCookie.split('=')[1];
            if (hash === TARGET_HASH) {
                setIsAuthenticated(true);
            } else {
                // Invalid hash, redirect
                // Ensure slash is added if missing
                const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
                window.location.href = `${base}login`;
            }
        } else {
            // No cookie, redirect
            const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
            window.location.href = `${base}login`;
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return null; // Don't show anything while checking
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return null; // Should have redirected
}
