import * as React from 'react';

interface AbandonedCartEmailProps {
    customerName: string;
    items: string[]; // List of item names
    checkoutUrl: string;
}

export const AbandonedCartEmail: React.FC<AbandonedCartEmailProps> = ({
    customerName,
    items,
    checkoutUrl,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5', color: '#333' }}>
        <h1 style={{ color: '#3B82F6' }}>Optical Planet</h1>
        <h2>You left something behind, {customerName}!</h2>
        <p>
            We noticed you didn't complete your purchase. Your items are waiting for you:
        </p>
        <ul style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
            {items.map((item, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{item}</li>
            ))}
        </ul>
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
                href={checkoutUrl}
                style={{
                    background: '#3B82F6',
                    color: 'white',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                }}
            >
                Complete Checkout
            </a>
        </div>
        <p style={{ fontSize: '12px', color: '#888' }}>
            &copy; {new Date().getFullYear()} Optical Planet. All rights reserved.
        </p>
    </div>
);
