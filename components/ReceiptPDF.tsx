import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Using standard fonts: Helvetica (sans-serif) and Times-Roman (serif)
// Times-Roman conveys a more traditional, luxury feel.

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: '#111',
    lineHeight: 1.5,
  },
  borderBox: {
    border: '1pt solid #ddd',
    height: '100%',
    padding: 30,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  brandName: {
    fontSize: 28,
    fontFamily: 'Times-Bold', // Standard bold serif
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 20, // Increased spacing to prevent overlap with tagline
    color: '#000',
  },
  logo: {
    width: 120,
    height: 'auto',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 9,
    fontFamily: 'Helvetica', // Clean contrast
    color: '#666',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 20,
    width: '100%',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  infoColumn: {
    width: '45%',
  },
  label: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    marginBottom: 10,
    color: '#000',
  },
  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 8,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  colItem: { width: '55%' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '30%', textAlign: 'right' },
  
  headerText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginRight: 20,
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#888',
    marginBottom: 4,
  },
  thankYou: {
    fontSize: 12,
    fontFamily: 'Times-Italic',
    marginTop: 10,
    color: '#333',
  },
});

interface ReceiptSettings {
  useDefaults?: boolean;
  brandName?: string;
  tagline?: string;
  websiteUrl?: string;
  supportEmail?: string;
  footerText?: string;
  logo?: string;
}

interface ReceiptProps {
  order: {
    orderNumber: string;
    createdAt: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress?: string;
    streetAddress?: string;
    city?: string;
    region?: string;
    items: Array<{
      product: { name: string };
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
  };
  settings?: ReceiptSettings;
}

const ReceiptPDF: React.FC<ReceiptProps> = ({ order, settings }) => {
  // Format Date and Time
  const dateObj = new Date(order.createdAt);
  const dateStr = dateObj.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const timeStr = dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const useDefaults = settings?.useDefaults;

  const brandName = (!useDefaults && settings?.brandName) || "HAJAMU LUXE";
  const tagline = (!useDefaults && settings?.tagline) || "Authentic African Luxury";
  const supportEmail = (!useDefaults && settings?.supportEmail) || "basitlimann@yahoo.com";
  // If footerText is provided in settings, use it. Otherwise use default.
  // Note: The original had two lines + thank you. I'll combine them if settings are present, or use defaults.
  const footerText = (!useDefaults && settings?.footerText) || "Thank you for choosing HAJAMU LUXE. Weaving Heritage Into Modern Luxury.";

  const logo = !useDefaults ? settings?.logo : undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.borderBox}>
          {/* Header */}
          <View style={styles.header}>
            {logo ? (
               <Image src={logo} style={styles.logo} />
            ) : (
               <Text style={styles.brandName}>{brandName}</Text>
            )}
            <Text style={styles.tagline}>{tagline}</Text>
            <View style={styles.divider} />
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>BILLED TO</Text>
              <Text style={styles.value}>{order.customerName}</Text>
              <Text style={styles.value}>{order.customerEmail}</Text>
              {order.customerPhone && <Text style={styles.value}>{order.customerPhone}</Text>}
              
              {/* Address Handling */}
              {order.streetAddress ? (
                <>
                  <Text style={[styles.label, { marginTop: 10 }]}>SHIPPING TO</Text>
                  <Text style={styles.value}>{order.streetAddress}</Text>
                  <Text style={styles.value}>{order.city}, {order.region}</Text>
                </>
              ) : (
                order.customerAddress && <Text style={styles.value}>{order.customerAddress}</Text>
              )}
            </View>
            <View style={[styles.infoColumn, { alignItems: 'flex-end' }]}>
              <Text style={styles.label}>RECEIPT DETAILS</Text>
              <Text style={styles.value}>Order #: {order.orderNumber}</Text>
              <Text style={styles.value}>Date: {dateStr}</Text>
              <Text style={styles.value}>Time: {timeStr}</Text>
              <Text style={[styles.value, { fontFamily: 'Helvetica-Bold', color: '#1a1a1a', marginTop: 5 }]}>PAID</Text>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.colItem]}>ITEM DESCRIPTION</Text>
              <Text style={[styles.headerText, styles.colQty]}>QTY</Text>
              <Text style={[styles.headerText, styles.colPrice]}>AMOUNT</Text>
            </View>

            {order.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.value, styles.colItem]}>{item.product.name}</Text>
                <Text style={[styles.value, styles.colQty]}>{item.quantity}</Text>
                <Text style={[styles.value, styles.colPrice]}>GHS {item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Total */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalValue}>GHS {order.totalAmount.toFixed(2)}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Support: {supportEmail}</Text>
            <Text style={styles.thankYou}>{footerText}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPDF;
