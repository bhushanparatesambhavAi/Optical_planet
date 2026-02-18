import * as React from 'react';

interface OrderConfirmationEmailProps {
    customerName: string;
    orderId: string;
    total: number;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
    customerName,
    orderId,
    total,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5', color: '#333' }}>
        <h1 style={{ color: '#3B82F6' }}>Optical Planet</h1>
        <h2>Thank you for your order, {customerName}!</h2>
        <p>
            We are pleased to confirm your order <strong>{orderId}</strong>.
        </p>
        <p>
            Total Amount: <strong>${total.toFixed(2)}</strong>
        </p>
        <hr style={{ borderColor: '#eee', margin: '20px 0' }} />
        <p>
            We will notify you once your package is shipped.
        </p>
        <p style={{ fontSize: '12px', color: '#888' }}>
            &copy; {new Date().getFullYear()} Optical Planet. All rights reserved.
        </p>
    </div>
);
