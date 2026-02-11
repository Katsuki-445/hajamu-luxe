import * as React from 'react';

interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  shippingAddress?: {
    street: string;
    city: string;
    region: string;
  };
  branding?: {
    brandName?: string;
    tagline?: string;
    logoUrl?: string;
  };
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  customerName,
  orderId,
  items,
  totalAmount,
  shippingAddress,
  branding,
}) => (
  <div style={{ fontFamily: 'sans-serif', color: '#1a1a1a', lineHeight: '1.5' }}>
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', textAlign: 'center' }}>
      {branding?.logoUrl ? (
        <img src={branding.logoUrl} alt={branding.brandName || "Brand Logo"} style={{ maxHeight: '60px', margin: '0 auto' }} />
      ) : (
        <h1 style={{ fontFamily: 'serif', color: '#333', margin: '0 0 10px 0' }}>{branding?.brandName || "HAJAMU LUXE"}</h1>
      )}
      <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px', color: '#666', margin: 0 }}>
        {branding?.tagline || "Authentic African Luxury"}
      </p>
    </div>
    
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <p>Greetings {customerName},</p>
      
      <p>Thank you for choosing HAJAMU LUXE. Your order has been received and is being processed with the care and heritage it deserves.</p>
      
      <div style={{ margin: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '20px 0' }}>
        <p style={{ margin: '0 0 10px 0' }}><strong>Order Reference:</strong> {orderId}</p>
        <p style={{ margin: '0 0 10px 0' }}><strong>Status:</strong> Pending</p>
        
        {shippingAddress && (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'serif', fontSize: '16px', margin: '0 0 10px 0' }}>Shipping Details</h3>
            <p style={{ margin: '0' }}>{shippingAddress.street}</p>
            <p style={{ margin: '0' }}>{shippingAddress.city}, {shippingAddress.region}</p>
          </div>
        )}

        <h3 style={{ fontFamily: 'serif', marginTop: '20px' }}>Your Selection</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item, index) => (
            <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.name} (x{item.quantity})</span>
              <span>GHS {item.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        
        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <p><strong>Total: GHS {totalAmount.toLocaleString()}</strong></p>
        </div>
      </div>
      
      <p>You will receive further updates as your piece moves through our crafting process.</p>
      
      <p>Warm regards,<br/>The HAJAMU LUXE Team</p>
    </div>
    
    <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#888', backgroundColor: '#f9f9f9' }}>
      <p>&copy; {new Date().getFullYear()} HAJAMU LUXE. All rights reserved.</p>
    </div>
  </div>
);
