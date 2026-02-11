"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPDF from './ReceiptPDF';
import { Download, Loader2 } from 'lucide-react';

interface ReceiptSettings {
  useDefaults?: boolean;
  brandName?: string;
  tagline?: string;
  websiteUrl?: string;
  supportEmail?: string;
  footerText?: string;
  logo?: string;
}

interface ReceiptButtonProps {
  order: any;
  settings?: ReceiptSettings;
}

export default function ReceiptButton({ order, settings }: ReceiptButtonProps) {
  // Ensure we only render this on client to avoid hydration issues with PDF generation
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button disabled className="px-6 py-2 bg-white border border-gray-200 text-gray-400 rounded-full text-sm font-medium flex items-center gap-2 cursor-not-allowed">
        <Download className="w-4 h-4" />
        Loading Receipt...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ReceiptPDF order={order} settings={settings} />}
      fileName={`receipt-${order.orderNumber}.pdf`}
      className="px-6 py-2 bg-white border border-gray-200 text-gray-900 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
    >
      {/* @ts-ignore - PDFDownloadLink children prop type definition is tricky */}
      {({ blob, url, loading, error }: any) => (
        <>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {loading ? 'Generating...' : 'Download Receipt'}
        </>
      )}
    </PDFDownloadLink>
  );
}
