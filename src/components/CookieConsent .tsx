
// src/components/CookieConsent.tsx
import { useEffect, useState } from 'react';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) setVisible(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <>
            <div style={styles.banner}>
                <p>We use cookies to improve your experience. By using our site, you agree to our use of cookies.</p>
                <button onClick={acceptCookies} style={styles.button}>Accept</button>
            </div>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    banner: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#333',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
    },
    button: {
        background: '#4CAF50',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        cursor: 'pointer',
    },
};

export default CookieConsent;
