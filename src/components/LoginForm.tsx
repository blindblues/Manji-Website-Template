import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

// Default password hash for "password"
const TARGET_HASH = "41c3590faa62584ea51ca3f22f2c8255d67d311835d1a77452e34e5fe433c4ff";

export default function LoginForm() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // If already authenticated, redirect to home
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(c => c.trim().startsWith('site_auth='));

        if (authCookie) {
            const hash = authCookie.split('=')[1];
            if (hash === TARGET_HASH) {
                const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
                window.location.href = base;
            }
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const hash = CryptoJS.SHA256(input).toString();

        if (hash === TARGET_HASH) {
            // Save cookie for 7 days
            const d = new Date();
            d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
            document.cookie = `site_auth=${hash};expires=${d.toUTCString()};path=/;SameSite=Strict`;

            // Redirect to home
            window.location.href = import.meta.env.BASE_URL;
        } else {
            alert(`Debug Info:\nInput: '${input}'\nHash: ${hash}\nTarget: ${TARGET_HASH}`);
            setError(true);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Accesso Limitato</h2>

            <form onSubmit={handleLogin} className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <input
                    id="password"
                    type="password"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setError(false);
                    }}
                    placeholder="Inserisci password"
                    className="password-input"
                />

                {error && (
                    <div className="error-message">
                        Password non valida
                    </div>
                )}

                <button type="submit" className="submit-button">
                    Accedi
                </button>
            </form>
            <p className="version-tag">v1.2 - Debugging</p>
        </div>
    );
}
