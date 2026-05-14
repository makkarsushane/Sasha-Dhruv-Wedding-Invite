import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { PDFDocument } from 'pdf-lib';

export async function POST(request) {
  let browser = null;

  try {
    const url = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    const isLocal = !process.env.NEXT_PUBLIC_SITE_URL && process.env.NODE_ENV !== 'production';

    const executablePath = await chromium.executablePath();
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath || (isLocal ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Set mobile viewport matching iPhone 17 Pro
    await page.setViewport({
      width: 402,
      height: 874,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: false,
    });

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts and images
    await page.evaluate(async () => {
      await document.fonts.ready;
      
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));
    });

    // Wait an extra second for any GSAP/React state settling
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Scroll to top and add CSS
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.documentElement.classList.add('exporting-pdf');
    });

    // Give the DOM a moment to apply the .exporting-pdf class styles
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find bounding boxes of all data-pdf-page sections
    const pageBoxes = await page.evaluate(() => {
      const elements = document.querySelectorAll('[data-pdf-page]');
      return Array.from(elements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x + window.scrollX,
          y: rect.y + window.scrollY,
          width: rect.width,
          height: rect.height,
        };
      });
    });

    if (pageBoxes.length === 0) {
      throw new Error('No elements with data-pdf-page found.');
    }

    // Capture each page as a high-res PNG
    const pngBuffers = [];
    for (const box of pageBoxes) {
      const buffer = await page.screenshot({
        type: 'png',
        clip: box,
        omitBackground: true,
      });
      pngBuffers.push(buffer);
    }

    // Assemble PNGs into PDF
    const pdfDoc = await PDFDocument.create();

    for (const pngBuffer of pngBuffers) {
      const image = await pdfDoc.embedPng(pngBuffer);
      const { width, height } = image.scale(1);

      // Using the exact dimensions of the image
      // (because deviceScaleFactor is 4, width and height are 4x the CSS size,
      // but PDF coordinate space is abstract, so scaling 1:1 works perfectly for high fidelity)
      const pdfPage = pdfDoc.addPage([width, height]);
      
      pdfPage.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Sasha-Dhruv-Wedding-Invitation-iPhone-UHQ.pdf"',
      },
    });

  } catch (error) {
    console.error('PDF Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
