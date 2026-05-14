'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  couple,
  invitationChapters,
  venue,
} from '../../data/weddingData';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { assetPath } from '../../lib/assetPath';
import { isTouchScrollDevice } from '../../lib/mobileMotion';
import PdfExportButton from '../PdfExportButton/PdfExportButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

const monogramUrl = assetPath('/monogram.jpg');
const floralCanopyUrl = assetPath('/ornaments/floral-canopy.webp');
const floralCornerUrl = assetPath('/ornaments/floral-corner.webp');
const ornateArchUrl = assetPath('/ornaments/ornate-arch.webp');
const lotusGroundUrl = assetPath('/ornaments/lotus-ground.webp');
const textFloralSprigUrl = assetPath('/ornaments/text-floral-sprig.webp');
const textLeafVineUrl = assetPath('/ornaments/text-leaf-vine.webp');

const frameOrnamentStyle = {
  '--floral-canopy-image': `url("${floralCanopyUrl}")`,
  '--floral-corner-image': `url("${floralCornerUrl}")`,
  '--ornate-arch-image': `url("${ornateArchUrl}")`,
  '--lotus-ground-image': `url("${lotusGroundUrl}")`,
  '--text-floral-sprig-image': `url("${textFloralSprigUrl}")`,
  '--text-leaf-vine-image': `url("${textLeafVineUrl}")`,
};

const coverPalette = {
  bg: '#f8efe3',
  paper: '#fffaf2',
  ink: '#30251f',
  muted: '#8d7660',
  accent: '#c39b55',
  deep: '#674534',
  wash: '#e4c78f',
};

const familyPalette = {
  bg: '#eef7e7',
  paper: '#fbfff6',
  ink: '#263427',
  muted: '#61735c',
  accent: '#a9c989',
  deep: '#48623e',
  wash: '#d8ecc5',
};

const closingPalette = {
  bg: '#efe0e0',
  paper: '#fff8f4',
  ink: '#342327',
  muted: '#805d63',
  accent: '#a74e60',
  deep: '#5c2b36',
  wash: '#d5a1aa',
};

const petals = [
  { left: '8%', top: '17%', delay: 0.1, scale: 0.75 },
  { left: '78%', top: '12%', delay: 0.8, scale: 0.55 },
  { left: '89%', top: '54%', delay: 1.4, scale: 0.7 },
  { left: '15%', top: '78%', delay: 2.1, scale: 0.6 },
  { left: '63%', top: '82%', delay: 2.8, scale: 0.8 },
  { left: '35%', top: '24%', delay: 3.2, scale: 0.48 },
];

const stars = [
  { left: '8%', top: '14%', size: 2, delay: 0.2 },
  { left: '19%', top: '28%', size: 1, delay: 1.3 },
  { left: '31%', top: '11%', size: 3, delay: 0.7 },
  { left: '44%', top: '24%', size: 1, delay: 1.9 },
  { left: '58%', top: '13%', size: 2, delay: 0.4 },
  { left: '71%', top: '30%', size: 1, delay: 2.2 },
  { left: '84%', top: '16%', size: 3, delay: 1.1 },
  { left: '91%', top: '44%', size: 1, delay: 0.9 },
  { left: '13%', top: '53%', size: 2, delay: 2.5 },
  { left: '28%', top: '72%', size: 1, delay: 1.6 },
  { left: '49%', top: '62%', size: 2, delay: 0.3 },
  { left: '67%', top: '78%', size: 1, delay: 1.4 },
  { left: '81%', top: '66%', size: 2, delay: 2.7 },
  { left: '36%', top: '42%', size: 1, delay: 0.8 },
];

function paletteStyle(palette) {
  return {
    '--page-bg': palette.bg,
    '--page-paper': palette.paper,
    '--page-ink': palette.ink,
    '--page-muted': palette.muted,
    '--page-accent': palette.accent,
    '--page-deep': palette.deep,
    '--page-wash': palette.wash,
  };
}

function pageStyle(palette) {
  return {
    ...paletteStyle(palette),
    ...frameOrnamentStyle,
  };
}

function Atmosphere({ motif = 'mandap', quiet = false }) {
  return (
    <div className={`page-atmosphere motif-${motif} ${quiet ? 'is-quiet' : ''}`} aria-hidden="true">
      <div className="grain-layer" />
      <div className="wash-layer" data-float />
      <div className="jaali-layer" />
      <div className="floating-line line-one" data-float />
      <div className="floating-line line-two" data-float />
      {petals.map((petal, index) => (
        <span
          key={index}
          className="floating-petal"
          data-float
          style={{
            left: petal.left,
            top: petal.top,
            animationDelay: `${petal.delay}s`,
            transform: `scale(${petal.scale})`,
          }}
        />
      ))}
    </div>
  );
}

function FloralSpray({ position }) {
  return <div className={`floral-spray floral-spray-${position}`} />;
}

function FloralBorder() {
  return (
    <div className="floral-border" aria-hidden="true">
      <div className="floral-canopy" />
      <FloralSpray position="bottom-left" />
      <FloralSpray position="bottom-right" />
    </div>
  );
}

function InvitationFrame({ variant = 'classic' }) {
  return (
    <div
      className={`invitation-frame frame-${variant}`}
      data-frame
      aria-hidden="true"
      style={frameOrnamentStyle}
    >
      <FloralBorder />
      <div className="top-miniature-border" />
      <div className="side-miniature-border side-left" />
      <div className="side-miniature-border side-right" />
      <div className="ornate-arch" data-canopy />
      <div className="hanging-garlands" data-garlands>
        {[0, 1, 2, 3, 4].map((item) => (
          <span key={item} className={`garland garland-${item + 1}`}>
            <i />
            <i />
            <i />
          </span>
        ))}
      </div>
      <div className="lotus-ground" data-ground />
    </div>
  );
}

function MughalArch({ className = '' }) {
  return (
    <svg
      className={`mughal-arch ${className}`}
      viewBox="0 0 320 480"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="arch-fill"
        d="M62 438V206C62 108 118 42 160 42s98 66 98 164v232H62Z"
      />
      <path
        className="arch-stroke"
        d="M62 438V206C62 108 118 42 160 42s98 66 98 164v232"
      />
      <path
        className="arch-stroke is-soft"
        d="M91 438V215c0-78 39-128 69-128s69 50 69 128v223"
      />
      <path className="arch-stroke" d="M38 438h244M54 458h212" />
      <path
        className="arch-stroke is-soft"
        d="M104 160c18 10 36 10 56 0 20 10 39 10 56 0M109 196c34 18 68 18 102 0"
      />
      <path
        className="arch-stroke is-soft"
        d="M126 438V280M194 438V280M111 280h98"
      />
      <circle className="arch-dot" cx="160" cy="132" r="3.4" />
      <circle className="arch-dot" cx="126" cy="182" r="2.4" />
      <circle className="arch-dot" cx="194" cy="182" r="2.4" />
      <path
        className="arch-stroke is-soft"
        d="M160 238c14 16 14 31 0 47-14-16-14-31 0-47ZM143 263c-18 1-30 10-37 27 18 0 31-10 37-27ZM177 263c18 1 30 10 37 27-18 0-31-10-37-27Z"
      />
    </svg>
  );
}

function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <svg className="constellation" viewBox="0 0 420 420" fill="none">
        <path d="M72 92 148 138 226 92 318 151 365 86" />
        <path d="M52 284 132 236 218 281 294 222 373 272" />
        <circle cx="72" cy="92" r="3" />
        <circle cx="148" cy="138" r="2.5" />
        <circle cx="226" cy="92" r="3" />
        <circle cx="318" cy="151" r="2.5" />
        <circle cx="365" cy="86" r="3" />
        <circle cx="52" cy="284" r="2.5" />
        <circle cx="132" cy="236" r="3" />
        <circle cx="218" cy="281" r="2.5" />
        <circle cx="294" cy="222" r="3" />
        <circle cx="373" cy="272" r="2.5" />
      </svg>
    </div>
  );
}

function CeremonyVector({ variant }) {
  if (variant === 'marigold') {
    return (
      <svg className="ceremony-vector vector-marigold" viewBox="0 0 260 260" fill="none" aria-hidden="true">
        <path className="vector-stroke" d="M49 168c43 26 119 26 162 0M64 169c6 33 126 33 132 0" />
        <path className="vector-stroke is-soft" d="M88 160c0-22 16-39 38-39h8c22 0 38 17 38 39" />
        <path className="vector-stroke" d="M123 113c-5-18 2-35 20-48 17 14 23 31 17 49" />
        <path className="vector-stroke" d="M100 122c-18-8-29-24-30-46 23 1 39 13 47 31" />
        <path className="vector-stroke" d="M181 122c18-8 29-24 30-46-23 1-39 13-47 31" />
        <path className="vector-stroke is-soft" d="M78 83c-24 22-39 49-44 80M205 83c24 22 39 49 44 80" />
        {[64, 78, 92, 181, 196, 210].map((cx) => (
          <circle key={cx} className="vector-dot" cx={cx} cy="71" r="5" />
        ))}
      </svg>
    );
  }

  if (variant === 'night') {
    return (
      <svg className="ceremony-vector vector-sangeet" viewBox="0 0 260 260" fill="none" aria-hidden="true">
        <path className="vector-stroke" d="M69 107c0-28 23-50 61-50s61 22 61 50v46c0 28-23 50-61 50s-61-22-61-50v-46Z" />
        <path className="vector-stroke is-soft" d="M69 111c16 14 38 22 61 22s45-8 61-22M69 151c16-14 38-22 61-22s45 8 61 22" />
        <path className="vector-stroke" d="M54 68 92 96M206 68l-38 28M88 56l-23-30M172 56l23-30" />
        <path className="vector-stroke is-soft" d="M124 33l6-16 6 16 16 6-16 6-6 16-6-16-16-6 16-6ZM211 128l5-12 5 12 12 5-12 5-5 12-5-12-12-5 12-5ZM43 144l4-10 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" />
        <circle className="vector-dot" cx="130" cy="130" r="5" />
        <circle className="vector-dot" cx="108" cy="130" r="3" />
        <circle className="vector-dot" cx="152" cy="130" r="3" />
      </svg>
    );
  }

  if (variant === 'blush') {
    return (
      <svg className="ceremony-vector vector-choora" viewBox="0 0 260 260" fill="none" aria-hidden="true">
        <ellipse className="vector-stroke" cx="130" cy="126" rx="72" ry="38" />
        <ellipse className="vector-stroke is-soft" cx="130" cy="126" rx="55" ry="28" />
        <ellipse className="vector-stroke" cx="130" cy="154" rx="72" ry="38" />
        <ellipse className="vector-stroke is-soft" cx="130" cy="154" rx="55" ry="28" />
        <ellipse className="vector-stroke" cx="130" cy="182" rx="72" ry="38" />
        <path className="vector-stroke is-soft" d="M82 84c19-29 77-36 105 0M104 63c5-15 15-26 26-34 11 8 21 19 26 34" />
        <path className="vector-stroke" d="M130 29l5 17 17 5-17 5-5 17-5-17-17-5 17-5 5-17Z" />
        <circle className="vector-dot" cx="73" cy="126" r="3" />
        <circle className="vector-dot" cx="187" cy="154" r="3" />
        <circle className="vector-dot" cx="86" cy="182" r="3" />
      </svg>
    );
  }

  return (
    <svg className="ceremony-vector vector-mandap" viewBox="0 0 260 260" fill="none" aria-hidden="true">
      <path className="vector-stroke" d="M48 217h164M65 217V104c0-42 30-76 65-76s65 34 65 76v113" />
      <path className="vector-stroke is-soft" d="M88 217V110c0-29 20-51 42-51s42 22 42 51v107" />
      <path className="vector-stroke" d="M51 101h158M74 124c34 19 78 19 112 0" />
      <path className="vector-stroke is-soft" d="M82 88c4 9 11 14 21 14s17-5 21-14c4 9 11 14 21 14s17-5 21-14" />
      <path className="vector-stroke" d="M130 143c12 16 12 31 0 46-12-15-12-30 0-46ZM114 165c-17 1-29 10-34 26 17 0 29-10 34-26ZM146 165c17 1 29 10 34 26-17 0-29-10-34-26Z" />
      <circle className="vector-dot" cx="130" cy="105" r="4" />
    </svg>
  );
}

function MonogramSeal({ large = false, quiet = false }) {
  const priority = large && !quiet;

  return (
    <div className={`monogram-seal ${large ? 'is-large' : ''} ${quiet ? 'is-quiet' : ''}`}>
      <span className="seal-ring ring-one" aria-hidden="true" />
      <span className="seal-ring ring-two" aria-hidden="true" />
      <span className="seal-ring ring-three" aria-hidden="true" />
      <img
        src={monogramUrl}
        alt={quiet ? '' : 'Sasha and Dhruv monogram'}
        width="1280"
        height="1280"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
}

function CoverPage() {
  return (
    <section
      className="invitation-page cover-page"
      style={pageStyle(coverPalette)}
      aria-label="Cover"
      data-pdf-page
    >
      <Atmosphere motif="mandap" />
      <InvitationFrame variant="cover" />
      <MughalArch className="cover-arch arch-left" />
      <MughalArch className="cover-arch arch-right" />
      <CeremonyVector variant="mandap" />

      <motion.div className="cover-monogram" data-reveal>
        <MonogramSeal large />
      </motion.div>

      <motion.div className="cover-copy">
        <h1 className="cover-title" data-reveal>
          <span>{couple.bride}</span>
          <em>weds</em>
          <span>{couple.groom}</span>
        </h1>
        <p className="cover-date" data-reveal>
          28 - 29 June 2026 | New Delhi
        </p>
      </motion.div>

      <div className="cover-footer-note" data-reveal>
        <span>Calista Resort</span>
        <span>Grand Mansion Hall</span>
      </div>
    </section>
  );
}

function FamilyPage() {
  return (
    <section
      className="invitation-page family-page"
      style={pageStyle(familyPalette)}
      aria-label="Family and blessings"
      data-pdf-page
    >
      <Atmosphere motif="mehendi" quiet />
      <InvitationFrame variant="family" />
      <MughalArch className="family-arch" />

      <div className="family-invitation" data-paper>
        <div className="family-monogram-slot" data-reveal aria-hidden="true">
          <MonogramSeal quiet />
        </div>
        <p className="family-sanskrit" data-reveal>
          || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः<br />
          निर्विघ्न कुरु मे देव सर्वकार्येषु सर्वदा:||
        </p>
        <p className="family-small" data-reveal>
          With the blessings of grand parents
        </p>
        <div className="family-blessing-names" data-reveal>
          <p>Smt. Mohini Devi &amp; Late Shri Girdhari Lal Makkar</p>
          <span>and</span>
          <p>Smt. Suraj Kumari &amp; Late Shri Kanwar Bhan</p>
        </div>
        <p className="family-parents" data-reveal>
          Mrs. Sonia Makkar &amp; Mr. Tushar Makkar
        </p>
        <p className="family-request" data-reveal>
          request the honour of your gracious presence at the
        </p>
        <h2 data-reveal>Wedding Ceremony</h2>
        <p className="family-small" data-reveal>
          of their daughter
        </p>
        <p className="family-couple-name italic" data-reveal>
          Sasha
        </p>
        <p className="family-with italic" data-reveal>
          with
        </p>
        <p className="family-couple-name italic" data-reveal>
          Dhruv
        </p>
        <p className="family-groom-line" data-reveal>
          (s/o Mrs. Vandna Kundu &amp; Mr. Sanjay Kundu)
        </p>
        <p className="family-date-line" data-reveal>
          On Monday, 29th June 2026
        </p>
      </div>
    </section>
  );
}

function Detail({ label, value }) {
  if (!value) return null;

  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EventPage({ chapter, index }) {
  const isWeddingDay = chapter.id === 'wedding-day';
  const ribbonText = `${chapter.title} / ${chapter.subtitle}`;

  return (
    <section
      className={`invitation-page event-page event-${chapter.id} ${index % 2 ? 'is-reversed' : ''} ${isWeddingDay ? 'wedding-day-page page--ceremony' : ''}`}
      style={pageStyle(chapter.palette)}
      aria-label={chapter.title}
      data-pdf-page
    >
      <Atmosphere motif={chapter.motif} />
      {chapter.motif === 'night' && <StarField />}
      <InvitationFrame variant={chapter.motif} />
      <MughalArch className="event-arch" />

      <div className="chapter-marquee" data-marquee aria-hidden="true">
        <div className="chapter-marquee-track">
          {[0, 1, 2, 3].map((item) => (
            <span key={item}>{ribbonText}</span>
          ))}
        </div>
      </div>

      <div className="event-shell">
        <div className="event-art" data-art>
          <div className={`event-motif motif-card-${chapter.motif}`} data-float>
            <span />
          </div>
          <CeremonyVector variant={chapter.motif} />
          <p>{chapter.subtitle}</p>
        </div>

        <article className="event-folio" data-paper>
          {!isWeddingDay && (
            <span className="event-text-ornament event-text-ornament-top" data-ornament aria-hidden="true" />
          )}

          <h2 data-reveal>{chapter.title}</h2>

          <div className="detail-grid" data-reveal>
            <Detail label="Date" value={chapter.date} />
            <Detail label="Time" value={chapter.time} />
            {!isWeddingDay && <Detail label="Venue" value={chapter.venue} />}
            <Detail label="Attire" value={chapter.attire} />
          </div>

          {chapter.timeline && (
            <div className="ceremony-timeline" data-reveal>
              {chapter.timeline.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          )}

          {isWeddingDay && (
            <div className="venue-note" data-reveal>
              <span>Venue</span>
              <strong>{venue.name}</strong>
              <p>
                {venue.hall}, {venue.address}, {venue.city} - {venue.pincode}
              </p>
            </div>
          )}

          {chapter.note && (
            <p className="event-note" data-reveal>
              {chapter.note}
            </p>
          )}

          <span className="event-text-ornament event-text-ornament-bottom" data-ornament aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}

function ClosingPage() {
  return (
    <section
      className="invitation-page closing-page"
      style={pageStyle(closingPalette)}
      aria-label="RSVP and closing"
      data-pdf-page
    >
      <Atmosphere motif="wine" />
      <InvitationFrame variant="closing" />
      <MughalArch className="closing-arch" />
      <CeremonyVector variant="blush" />

      <div className="closing-frame" data-paper>
        <div data-reveal>
          <MonogramSeal />
        </div>
        <p className="closing-shlok" data-reveal>
          विघ्न हरण मंगल करण, गौरी पुत्र गणेश।
          <br />
          प्रथम निमंत्रण आपको, ब्रह्मा विष्णु महेश॥
        </p>
        <p className="closing-love" data-reveal>
          With love and anticipation
        </p>
        <h2 data-reveal style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>Sushane Makkar</h2>
        <div className="closing-signature" data-reveal>
          <strong>RSVP</strong>
          <p>Makkar family</p>
        </div>
      </div>
    </section>
  );
}

export default function InvitationExperience() {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();
  useSmoothScroll();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const pages = gsap.utils.toArray('.invitation-page');
      const useNativeTouchScroll = isTouchScrollDevice();

      pages.forEach((page, pageIndex) => {
        const reveals = page.querySelectorAll('[data-reveal]');
        const paper = page.querySelector('[data-paper]');
        const ornaments = page.querySelectorAll('[data-ornament]');
        const floaters = page.querySelectorAll('[data-float]');
        const marquee = page.querySelector('[data-marquee] .chapter-marquee-track');
        const frame = page.querySelector('[data-frame]');
        const canopy = page.querySelector('[data-canopy]');
        const garlands = page.querySelectorAll('[data-garlands] .garland');
        const grounds = page.querySelectorAll('[data-ground]');
        const art = page.querySelector('[data-art]');
        const isEventPage = page.classList.contains('event-page');

        gsap.fromTo(
          page,
          { scale: 0.985 },
          {
            scale: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: page,
              start: 'top 92%',
              end: 'top 12%',
              scrub: 0.9,
            },
          },
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: page,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        });

        if (frame) {
          tl.fromTo(
            frame,
            { autoAlpha: 0.18 },
            { autoAlpha: 1, duration: 1.25, ease: 'power2.out' },
            0
          );
        }

        if (canopy) {
          tl.fromTo(
            canopy,
            { y: -58, scale: 1.08, transformOrigin: '50% 0%', autoAlpha: 0.1 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 1.55, ease: 'power3.out' },
            0.1
          );
        }

        if (garlands.length) {
          tl.fromTo(
            garlands,
            { y: -42, autoAlpha: 0, scaleY: 0.74, transformOrigin: 'top center' },
            { y: 0, autoAlpha: 1, scaleY: 1, duration: 1.1, stagger: 0.08, ease: 'back.out(1.35)' },
            0.3
          );
        }

        if (grounds.length) {
          tl.fromTo(
            grounds,
            { y: 44, autoAlpha: 0, scale: 0.9 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out' },
            0.4
          );
        }

        if (art) {
          tl.fromTo(
            art,
            { y: 70, rotate: pageIndex % 2 ? -1.8 : 1.8, scale: 0.94, autoAlpha: 0 },
            { y: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 1.25, ease: 'power3.out' },
            0.5
          );
        }

        if (paper && isEventPage && useNativeTouchScroll) {
          tl.fromTo(
            paper,
            { autoAlpha: 0, scale: 0.985 },
            { autoAlpha: 1, scale: 1, duration: 1.05, ease: 'power2.out' },
            0.6
          );
        } else if (paper) {
          tl.fromTo(
            paper,
            { clipPath: 'inset(10% 7% 10% 7%)', scale: 0.96, y: 34, rotateX: 7, transformPerspective: 900, transformOrigin: '50% 100%' },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, y: 0, rotateX: 0, duration: 1.32, ease: 'power3.out' },
            0.6
          );
        }

        if (ornaments.length) {
          tl.fromTo(
            ornaments,
            { autoAlpha: 0, clipPath: 'inset(0 50% 0 50%)' },
            { autoAlpha: 1, clipPath: 'inset(0 0% 0 0%)', duration: 0.95, stagger: 0.12, ease: 'power2.out' },
            0.72
          );
        }

        if (reveals.length) {
          tl.fromTo(
            reveals,
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.075, ease: 'power3.out' },
            0.8
          );
        }

        if (marquee && !useNativeTouchScroll) {
          gsap.fromTo(
            marquee,
            { xPercent: pageIndex % 2 ? -14 : 0 },
            {
              xPercent: pageIndex % 2 ? 0 : -14,
              ease: 'none',
              scrollTrigger: {
                trigger: page,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.6,
              },
            },
          );
        }

        if (!useNativeTouchScroll) {
          floaters.forEach((floater, floaterIndex) => {
            gsap.to(floater, {
              y: floaterIndex % 2 ? -44 : 34,
              rotate: floaterIndex % 2 ? -7 : 7,
              ease: 'none',
              scrollTrigger: {
                trigger: page,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
          });
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reducedMotion] },
  );

  return (
    <main ref={root} className="invitation-experience">
      <CoverPage />
      <FamilyPage />
      {invitationChapters.map((chapter, index) => (
        <EventPage key={chapter.id} chapter={chapter} index={index} />
      ))}
      <ClosingPage />
      <PdfExportButton />
    </main>
  );
}
