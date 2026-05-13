// import '../src/index.css';
// import { Cormorant_Garamond, Lora } from 'next/font/google'
// const cormorant = Cormorant_Garamond({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600'],
//   variable: '--font-heading',
// })

// const lora = Lora({
//   subsets: ['latin'],
//   weight: ['400', '500', '600'],
//   variable: '--font-body',
// })
// const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// export const metadata = {
//   title: 'Sasha weds Dhruv | Digital Wedding Invitation',
//   description:
//     'A handcrafted digital wedding invitation for Sasha Makkar and Dhruv Kundu. 28-29 June 2026, Calista Resort, New Delhi.',
//   openGraph: {
//     title: 'Sasha weds Dhruv | Digital Wedding Invitation',
//     description:
//       'A handcrafted invitation experience for the wedding celebrations of Sasha and Dhruv. 28-29 June 2026.',
//     images: [
//       {
//         url: 'https://makkarsushane.github.io/Sasha-Dhruv-Wedding-Invite/monogram.jpg',
//       },
//     ],
//     type: 'website',
//   },
// };

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   viewportFit: 'cover',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" type="image/jpeg" href={`${basePath}/monogram.jpg`} />
//         <link rel="preload" as="image" href={`${basePath}/monogram.jpg`} fetchPriority="high" />
//         <link rel="preload" as="image" href={`${basePath}/ornaments/floral-canopy.webp`} fetchPriority="high" />
//         <link rel="preload" as="image" href={`${basePath}/ornaments/floral-corner.webp`} />
//         <link rel="preload" as="image" href={`${basePath}/ornaments/ornate-arch.webp`} fetchPriority="high" />
//         <link rel="preload" as="image" href={`${basePath}/ornaments/lotus-ground.webp`} />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Manrope:wght@200;300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }
import '../src/index.css';
import { Cormorant_Garamond, Lora } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: 'Sasha weds Dhruv | Digital Wedding Invitation',
  description:
    'A handcrafted digital wedding invitation for Sasha Makkar and Dhruv Kundu. 28-29 June 2026, Calista Resort, New Delhi.',
  openGraph: {
    title: 'Sasha weds Dhruv | Digital Wedding Invitation',
    description:
      'A handcrafted invitation experience for the wedding celebrations of Sasha and Dhruv. 28-29 June 2026.',
    images: [
      {
        url: 'https://makkarsushane.github.io/Sasha-Dhruv-Wedding-Invite/monogram.jpg',
      },
    ],
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/jpeg"
          href={`${basePath}/monogram.jpg`}
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/monogram.jpg`}
          fetchPriority="high"
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/ornaments/floral-canopy.webp`}
          fetchPriority="high"
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/ornaments/floral-corner.webp`}
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/ornaments/ornate-arch.webp`}
          fetchPriority="high"
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/ornaments/lotus-ground.webp`}
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/ornaments/text-floral-sprig.webp`}
        />

        <link
          rel="preload"
          as="image"
          href={`${basePath}/ornaments/text-leaf-vine.webp`}
        />
      </head>

      <body className={`${cormorant.variable} ${lora.variable}`}>
        {children}
      </body>
    </html>
  );
}
