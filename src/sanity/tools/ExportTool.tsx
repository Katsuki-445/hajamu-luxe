import React, { useState } from 'react'
import { useClient } from 'sanity'

export const ExportTool = () => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [loading, setLoading] = useState(false)

  const handleExport = async (format: 'json' | 'csv') => {
    setLoading(true)
    try {
      // Fetch orders instead of products
      const orders = await client.fetch(`
        *[_type == "order"] | order(_createdAt desc) {
          orderNumber,
          _createdAt,
          status,
          customerName,
          firstName,
          lastName,
          customerEmail,
          customerPhone,
          streetAddress,
          city,
          region,
          totalAmount,
          items[]{
            quantity,
            price,
            product->{
              name,
              title
            }
          }
        }
      `)

      // Normalize data
      const data = orders.map((order: any) => ({
        'Order Number': order.orderNumber,
        'Date': new Date(order._createdAt).toLocaleDateString(),
        'Status': order.status,
        'Customer Name': order.customerName,
        'Email': order.customerEmail,
        'Phone': order.customerPhone || '',
        'First Name': order.firstName || '',
        'Second Name': order.lastName || '',
        'Address': order.streetAddress || '',
        'City': order.city || '',
        'Region': order.region || '',
        'Total Amount (GHS)': order.totalAmount,
        'Items': (order.items || []).map((i: any) => 
          `${i.quantity}x ${i.product?.name || i.product?.title || 'Unknown'}`
        ).join('; ')
      }))

      if (format === 'json') {
        const jsonString = JSON.stringify(data, null, 2)
        downloadFile(jsonString, `orders-export-${new Date().toISOString().split('T')[0]}.json`, 'application/json')
      } else {
        // Create CSV Content
        const headers = [
          'Order Number', 'Date', 'Status', 'Customer Name', 'Email', 'Phone',
          'First Name', 'Second Name', 'Address', 'City', 'Region',
          'Total Amount (GHS)', 'Items'
        ]
        
        const csvContent = [
          headers.join(','),
          ...data.map((row: any) =>
            headers.map(header => {
              const value = row[header]
              return `"${(value || '').toString().replace(/"/g, '""')}"`
            }).join(',')
          )
        ].join('\n')
        
        downloadFile(csvContent, `orders-export-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')
      }
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. See console for details.')
    } finally {
      setLoading(false)
    }
  }

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement('a')
    const file = new Blob([content], { type: contentType })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'serif' }}>The Heritage Store Export</h1>
      <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.5' }}>
        Export your complete product catalog including names, prices, descriptions, and permanent image links.
        This file can be used for backups or migrating data.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleExport('csv')}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            fontWeight: 500,
            fontSize: '1rem'
          }}
        >
          {loading ? 'Exporting...' : 'Download CSV'}
        </button>

        <button
          onClick={() => handleExport('json')}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #000',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            fontWeight: 500,
            fontSize: '1rem'
          }}
        >
          {loading ? 'Exporting...' : 'Download JSON'}
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Instructions</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#4b5563' }}>
          <li>Click <strong>Download CSV</strong> to open in Excel or Google Sheets.</li>
          <li>Click <strong>Download JSON</strong> for developer use or backups.</li>
          <li>Image URLs are direct links to the Sanity CDN and will remain valid.</li>
        </ul>
      </div>
    </div>
  )
}
