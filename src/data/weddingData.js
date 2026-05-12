export const couple = {
  bride: 'Sasha',
  groom: 'Dhruv',
  brideFull: 'Sasha Makkar',
  groomFull: 'Dhruv Kundu',
  weddingDate: '2026-06-29',
  tagline: 'Two souls, one journey',
};

export const families = {
  brideParents: {
    mother: 'Mrs. Sonia Makkar',
    father: 'Mr. Tushar Makkar',
    address: 'A-31, IDC Apartments, Plot 8C, Sector-11, Dwarka, New Delhi-110075',
  },
  groomParents: {
    mother: 'Mrs. Vandna Kundu',
    father: 'Mr. Sanjay Kundu',
  },
  grandparents: [
    { names: 'Smt. Mohini Devi & Late Shri Girdhari Lal Makkar' },
    { names: 'Smt. Suraj Kumari & Late Shri Kanwar Bhan' },
  ],
  invitedBy: 'Sushane Makkar',
  family: 'Makkar Family',
};

export const venue = {
  name: 'Calista Resort',
  hall: 'Grand Mansion Hall',
  address: 'Kapashera Border, Old Delhi-Gurgaon Highway',
  city: 'New Delhi',
  pincode: '110097',
  mapsUrl: 'https://maps.google.com/?q=Calista+Resort+Kapashera+Border+New+Delhi',
};

export const events = [
  {
    day: 'Day One',
    date: 'Sunday, 28th June 2026',
    celebrations: [
      {
        name: 'Haldi & Mehndi',
        time: '12:00 PM',
        venue: 'Ballroom',
        attire: 'Hues of Yellow',
        description: 'An afternoon of colour, laughter and blessings as we begin the celebrations.',
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        venue: 'Ballroom',
        attire: null,
        description: null,
      },
      {
        name: 'Ring Ceremony, Sagan, Chunni & Sangeet',
        time: '6:30 PM',
        venue: 'Glass House',
        attire: 'Indo-Western',
        description: 'An evening of rituals, music and dance under the glass canopy.',
      },
      {
        name: 'Dinner',
        time: '8:00 PM',
        venue: 'Glass House',
        attire: null,
        description: null,
      },
    ],
  },
  {
    day: 'Day Two',
    date: 'Monday, 29th June 2026',
    celebrations: [
      {
        name: 'Choora Ceremony',
        time: '11:00 AM',
        venue: 'Ballroom',
        attire: null,
        description: 'A sacred morning ritual adorning the bride with traditional bangles.',
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        venue: 'Ballroom',
        attire: null,
        description: null,
      },
      {
        name: 'Reception of Barat',
        time: '7:30 PM',
        venue: 'Grand Mansion Hall',
        attire: null,
        description: 'The grand arrival of the groom and his family.',
      },
      {
        name: 'Wedding Ceremony & Dinner',
        time: '8:00 PM',
        venue: 'Grand Mansion Hall',
        attire: null,
        description: 'The sacred union followed by a grand celebratory dinner.',
      },
      {
        name: 'Doli',
        time: 'Taaron Ki Chhaon Mein',
        venue: null,
        attire: null,
        description: 'Under the canopy of stars, a new journey begins.',
      },
    ],
  },
];

export const invitationChapters = [
  {
    id: 'haldi-mehndi',
    sequence: '01',
    day: 'Day One',
    title: 'Haldi & Mehndi',
    subtitle: 'Marigold blessings and henna hours',
    date: 'Sunday, 28 June 2026',
    time: '12:00 PM',
    venue: 'Ballroom',
    attire: 'Hues of Yellow',
    description:
      'An afternoon washed in turmeric, intricate mehndi, laughter and family blessings as the celebrations begin.',
    note: 'Lunch follows at 1:00 PM',
    motif: 'marigold',
    palette: {
      bg: '#fbf1c8',
      paper: '#fffaf0',
      ink: '#3d3423',
      muted: '#8a7240',
      accent: '#d9a63f',
      deep: '#8d6a22',
      wash: '#f5d873',
    },
  },
  {
    id: 'sangeet',
    sequence: '02',
    day: 'Day One',
    title: 'Ring Ceremony & Sangeet',
    subtitle: 'Sagan, chunni and a musical evening',
    date: 'Sunday, 28 June 2026',
    time: '6:30 PM',
    venue: 'Glass House',
    attire: 'Indo-Western',
    description:
      'Rituals unfold into music, dance and celebration beneath a dusky, luminous canopy.',
    note: 'Dinner follows at 8:00 PM',
    motif: 'night',
    palette: {
      bg: '#eaf4fb',
      paper: '#fffaf0',
      ink: '#253646',
      muted: '#6d7f8d',
      accent: '#c4a65a',
      deep: '#416b85',
      wash: '#cfe7f4',
    },
  },
  {
    id: 'choora',
    sequence: '03',
    day: 'Day Two',
    title: 'Choora Ceremony',
    subtitle: 'A sacred morning',
    date: 'Monday, 29 June 2026',
    time: '11:00 AM',
    venue: 'Ballroom',
    attire: null,
    description:
      'A quiet morning ritual adorning the bride with the bangles that mark a new beginning.',
    note: 'Lunch follows at 1:00 PM',
    motif: 'blush',
    palette: {
      bg: '#f5dfe0',
      paper: '#fff8f5',
      ink: '#3c2830',
      muted: '#8f6572',
      accent: '#c58b9b',
      deep: '#7b3d50',
      wash: '#efb4bc',
    },
  },
  {
    id: 'wedding-day',
    sequence: '04',
    day: 'Day Two',
    title: 'Wedding Day',
    subtitle: 'Barat, pheras and dinner',
    date: 'Monday, 29 June 2026',
    time: '7:30 PM onward',
    venue: 'Grand Mansion Hall',
    attire: null,
    description:
      'The barat arrives to ceremony and celebration, followed by the sacred wedding rituals and dinner.',
    motif: 'mandap',
    timeline: [
      { label: 'Reception of Barat', value: '7:30 PM' },
      { label: 'Wedding Ceremony & Dinner', value: '8:00 PM' },
      { label: 'Doli', value: 'Taaron Ki Chhaon Mein' },
    ],
    palette: {
      bg: '#f7ddd7',
      paper: '#fff8f0',
      ink: '#3d211c',
      muted: '#986d55',
      accent: '#c79b46',
      deep: '#9b2f2a',
      wash: '#eab1a5',
    },
  },
];

export const blessings = {
  sanskrit: 'विघ्न हरण मंगल करण, गौरी पुत्र गणेश। प्रथम निमंत्रण आपको, ब्रह्मा विष्णु महेश॥',
  english: 'With the blessings of grandparents',
};
