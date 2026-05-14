'use client';

import { useState } from 'react';

export default function PdfExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError(null);

      const response = await fetch('/api/export-pdf', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sasha-Dhruv-Wedding-Invitation-iPhone-UHQ.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error('PDF Export Error:', err);
      setError('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="pdf-export-button" style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#991b1b',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {error}
        </div>
      )}
      <button
        onClick={handleExport}
        disabled={isExporting}
        style={{
          background: 'var(--color-charcoal, #1A1A1A)',
          color: '#FFFDF7',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '30px',
          fontFamily: 'inherit',
          fontSize: '0.95rem',
          fontWeight: '500',
          cursor: isExporting ? 'not-allowed' : 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          opacity: isExporting ? 0.7 : 1,
          transition: 'transform 0.2s, opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {isExporting ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M12 4V2C6.477 2 2 6.477 2 12h2c0-4.418 3.582-8 8-8z" fill="currentColor"/>
            </svg>
            Generating PDF...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Save as PDF
          </>
        )}
      </button>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .pdf-export-button button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
