import * as React from 'react';

interface OrderStatusUpdateEmailProps {
  customerName: string;
  orderId: string;
  newStatus: string;
}

export const OrderStatusUpdateEmail: React.FC<OrderStatusUpdateEmailProps> = ({
  customerName,
  orderId,
  newStatus,
}) => {
  const getStatusMessage = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return "Your order is now being processed. Our team is reviewing the details to ensure perfection.";
      case 'in-factory':
        return "Great news! Your piece has entered our factory. Our master weavers are now crafting your selection with tradition and skill.";
      case 'shipped':
        return "Your order is on its way. It has left our facility and is journeying to you.";
      case 'delivered':
        return "Your order has been delivered. We hope it brings a touch of heritage and luxury to your life.";
      case 'cancelled':
        return "Your order has been cancelled. If this was a mistake, please contact our support team.";
      default:
        return `The status of your order has been updated to: ${status}.`;
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#1a1a1a', lineHeight: '1.5' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'serif', color: '#333' }}>HAJAMU LUXE</h1>
        <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px', color: '#666' }}>Status Update</p>
      </div>
      
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <p>Greetings {customerName},</p>
        
        <p>We are writing to update you on the progress of your order <strong>{orderId}</strong>.</p>
        
        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '4px', borderLeft: '4px solid #333' }}>
          <p style={{ margin: 0, fontSize: '16px' }}>
            <strong>New Status: {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</strong>
          </p>
        </div>
        
        <p>{getStatusMessage(newStatus)}</p>
        
        <p>You can track further updates via your account or contact us if you have any questions.</p>
        
        <p>Warm regards,<br/>The HAJAMU LUXE Team</p>
      </div>
      
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#888', backgroundColor: '#f9f9f9' }}>
        <p>&copy; {new Date().getFullYear()} HAJAMU LUXE. All rights reserved.</p>
      </div>
    </div>
  );
};
