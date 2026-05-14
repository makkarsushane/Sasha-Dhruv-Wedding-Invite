import fs from 'fs';
import path from 'path';

async function exportPdf() {
  console.log('Initiating PDF export from local development server...');
  try {
    const response = await fetch('http://localhost:3000/api/export-pdf', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const outputPath = path.resolve(process.cwd(), 'Sasha-Dhruv-Wedding-Invitation-iPhone-UHQ.pdf');
    
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`✅ Successfully exported PDF to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to export PDF:', error.message);
    console.log('Make sure your Next.js server is running on http://localhost:3000');
  }
}

exportPdf();
