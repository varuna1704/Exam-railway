import type { Question, SubjectInfo, SyllabusItem, StoryData } from '../types';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    icon: 'Globe',
    qCount: 1200,
    storyType: 'Historical Journey',
    description: 'Ancient, Medieval, Modern Indian History, Indian Geography, Polity, and Economics.'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'Percent',
    qCount: 1100,
    storyType: 'Loco Pilot’s Log',
    description: 'Arithmetic, Algebra, Geometry, Trigonometry, and Mensuration problem solving.'
  },
  {
    id: 'general-science',
    name: 'General Science',
    icon: 'FlaskConical',
    qCount: 1000,
    storyType: 'Scientific Chronology',
    description: 'Physics, Chemistry, and Life Sciences based on CBSE/NCERT curriculum.'
  },
  {
    id: 'current-affairs',
    name: 'Current Affairs',
    icon: 'CalendarDays',
    qCount: 1000,
    storyType: 'Journalist’s Diary',
    description: 'National and international news, sports achievements, summits, and government schemes.'
  },
  {
    id: 'reasoning',
    name: 'Reasoning',
    icon: 'Brain',
    qCount: 1000,
    storyType: 'Detective Puzzles',
    description: 'Verbal, non-verbal, coding-decoding, blood relations, and analytical puzzles.'
  },
  {
    id: 'english',
    name: 'General English',
    icon: 'BookOpen',
    qCount: 1000,
    storyType: 'Grammar Dialogue',
    description: 'Tenses, prepositions, voice change, synonyms, antonyms, and comprehension.'
  },
  {
    id: 'hindi',
    name: 'सामान्य हिंदी',
    icon: 'BookText',
    qCount: 1000,
    storyType: 'हिंदी व्याकरण वार्ता',
    description: 'संधि, समास, मुहावरे, पर्यायवाची, विलोम शब्द और गद्यांश अभ्यास।'
  },
  {
    id: 'computer',
    name: 'Computer Awareness',
    icon: 'Cpu',
    qCount: 800,
    storyType: 'Tech Timeline',
    description: 'Hardware, software, networking, internet history, security, and MS Office.'
  }
];

export const QUESTIONS: Record<string, Question[]> = {
  'general-knowledge': [
    {
      id: 'GK-2019-0001',
      subject: 'general-knowledge',
      topic: 'Indian History',
      subtopic: 'Ancient India',
      question: 'Which civilization is also known as the Harappan Civilization?',
      options: {
        A: 'Mesopotamian Civilization',
        B: 'Egyptian Civilization',
        C: 'Indus Valley Civilization',
        D: 'Chinese Civilization'
      },
      correct_option: 'C',
      explanation: 'The Indus Valley Civilization is also known as the Harappan Civilization because Harappa was the first archaeological site excavated in 1921.',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 4
    },
    {
      id: 'GK-2019-0002',
      subject: 'general-knowledge',
      topic: 'Indian History',
      subtopic: 'Modern India',
      question: 'Who is known as the "Iron Man of India"?',
      options: {
        A: 'Jawaharlal Nehru',
        B: 'Sardar Vallabhbhai Patel',
        C: 'Subhas Chandra Bose',
        D: 'Bhimrao Ambedkar'
      },
      correct_option: 'B',
      explanation: 'Sardar Vallabhbhai Patel unified 562 princely states into the Indian Union after independence, earning him the title "Iron Man of India".',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 5
    },
    {
      id: 'GK-2022-0003',
      subject: 'general-knowledge',
      topic: 'Indian Polity',
      subtopic: 'Constitution Articles',
      question: 'Which article of the Indian Constitution guarantees the "Right to Equality"?',
      options: {
        A: 'Article 14',
        B: 'Article 19',
        C: 'Article 21',
        D: 'Article 32'
      },
      correct_option: 'A',
      explanation: 'Article 14 guarantees equality before the law and equal protection of the laws to all citizens within India.',
      exam: 'RRB Group D',
      year: 2022,
      difficulty: 'Medium',
      appeared_count: 3
    },
    {
      id: 'GK-2021-0004',
      subject: 'general-knowledge',
      topic: 'Geography',
      subtopic: 'Indian Rivers & Dams',
      question: 'The Hirakud Dam is built across which of the following rivers?',
      options: {
        A: 'Ganga',
        B: 'Mahanadi',
        C: 'Godavari',
        D: 'Krishna'
      },
      correct_option: 'B',
      explanation: 'Hirakud Dam, one of the longest dams in the world, is built across the Mahanadi river in Odisha.',
      exam: 'RRB NTPC',
      year: 2021,
      difficulty: 'Medium',
      appeared_count: 4
    },
    {
      id: 'GK-2018-0005',
      subject: 'general-knowledge',
      topic: 'Indian History',
      subtopic: 'Medieval India',
      question: 'Who built the famous Buland Darwaza at Fatehpur Sikri?',
      options: {
        A: 'Shah Jahan',
        B: 'Akbar',
        C: 'Jahangir',
        D: 'Babur'
      },
      correct_option: 'B',
      explanation: 'Akbar built Buland Darwaza in 1601 AD to commemorate his victory over Gujarat.',
      exam: 'RRB ALP',
      year: 2018,
      difficulty: 'Medium',
      appeared_count: 3
    }
  ],
  'mathematics': [
    {
      id: 'MATH-2018-0001',
      subject: 'mathematics',
      topic: 'Arithmetic',
      subtopic: 'Speed Time Distance',
      question: 'A train travels 360 km in 4 hours. What is its average speed?',
      options: {
        A: '80 km/h',
        B: '85 km/h',
        C: '90 km/h',
        D: '95 km/h'
      },
      correct_option: 'C',
      explanation: 'Speed = Distance / Time. Here, Speed = 360 km / 4 hours = 90 km/h.',
      exam: 'RRB Group D',
      year: 2018,
      difficulty: 'Easy',
      appeared_count: 3
    },
    {
      id: 'MATH-2019-0002',
      subject: 'mathematics',
      topic: 'Arithmetic',
      subtopic: 'Profit and Loss',
      question: 'If a vendor sells an item for Rs. 240 making a 20% profit, what was the cost price of the item?',
      options: {
        A: 'Rs. 180',
        B: 'Rs. 200',
        C: 'Rs. 210',
        D: 'Rs. 220'
      },
      correct_option: 'B',
      explanation: 'Selling Price (SP) = Cost Price (CP) * (1 + Profit%). 240 = CP * 1.20 => CP = 240 / 1.2 = Rs. 200.',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 4
    },
    {
      id: 'MATH-2022-0003',
      subject: 'mathematics',
      topic: 'Geometry & Mensuration',
      subtopic: 'Area and Perimeter',
      question: 'The diagonal of a rectangle is 10 cm and its length is 8 cm. What is the area of the rectangle?',
      options: {
        A: '48 sq. cm',
        B: '24 sq. cm',
        C: '36 sq. cm',
        D: '60 sq. cm'
      },
      correct_option: 'A',
      explanation: 'By Pythagoras theorem, Width = sqrt(10^2 - 8^2) = sqrt(100 - 64) = 6 cm. Area = Length * Width = 8 * 6 = 48 sq. cm.',
      exam: 'RRB Group D',
      year: 2022,
      difficulty: 'Medium',
      appeared_count: 2
    },
    {
      id: 'MATH-2015-0004',
      subject: 'mathematics',
      topic: 'Arithmetic',
      subtopic: 'Percentages',
      question: 'If A’s income is 25% more than B’s income, by how much percentage is B’s income less than A’s income?',
      options: {
        A: '15%',
        B: '20%',
        C: '25%',
        D: '30%'
      },
      correct_option: 'B',
      explanation: 'Percentage less = [R / (100 + R)] * 100 = [25 / 125] * 100 = 20%.',
      exam: 'RRB JE',
      year: 2015,
      difficulty: 'Medium',
      appeared_count: 5
    }
  ],
  'general-science': [
    {
      id: 'SCI-2018-0001',
      subject: 'general-science',
      topic: 'Physics',
      subtopic: 'Light & Reflection',
      question: 'Which lens is used to correct short-sightedness (Myopia)?',
      options: {
        A: 'Convex Lens',
        B: 'Concave Lens',
        C: 'Cylindrical Lens',
        D: 'Bifocal Lens'
      },
      correct_option: 'B',
      explanation: 'Short-sightedness (Myopia) is corrected using a concave lens, which diverges incoming light rays to focus correctly on the retina.',
      exam: 'RRB Group D',
      year: 2018,
      difficulty: 'Easy',
      appeared_count: 5
    },
    {
      id: 'SCI-2019-0002',
      subject: 'general-science',
      topic: 'Chemistry',
      subtopic: 'Periodic Table',
      question: 'What is the chemical symbol of Gold?',
      options: {
        A: 'Gd',
        B: 'Ag',
        C: 'Au',
        D: 'Fe'
      },
      correct_option: 'C',
      explanation: 'The chemical symbol for Gold is "Au", which is derived from its Latin name "Aurum" (meaning shining dawn).',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 4
    },
    {
      id: 'SCI-2022-0003',
      subject: 'general-science',
      topic: 'Biology',
      subtopic: 'Human Anatomy',
      question: 'Which organ in the human body secretes insulin?',
      options: {
        A: 'Liver',
        B: 'Kidney',
        C: 'Pancreas',
        D: 'Gallbladder'
      },
      correct_option: 'C',
      explanation: 'The pancreas secretes insulin, a hormone that regulates blood glucose levels in the body.',
      exam: 'RRB Group D',
      year: 2022,
      difficulty: 'Medium',
      appeared_count: 3
    }
  ],
  'current-affairs': [
    {
      id: 'CA-2024-0001',
      subject: 'current-affairs',
      topic: 'Science & Tech',
      subtopic: 'Space Missions',
      question: 'Which rocket launched India’s Chandrayaan-3 lunar mission?',
      options: {
        A: 'GSLV MK III (LVM3)',
        B: 'PSLV C57',
        C: 'ASLV',
        D: 'GSLV F12'
      },
      correct_option: 'A',
      explanation: 'Chandrayaan-3 was successfully launched using the LVM3-M4 (previously GSLV Mk-III) rocket on July 14, 2023.',
      exam: 'RRB NTPC',
      year: 2024,
      difficulty: 'Medium',
      appeared_count: 2
    },
    {
      id: 'CA-2023-0002',
      subject: 'current-affairs',
      topic: 'Schemes & Summits',
      subtopic: 'G20 Summit',
      question: 'Where was the 18th G20 Summit hosted in September 2023?',
      options: {
        A: 'Rome, Italy',
        B: 'Bali, Indonesia',
        C: 'New Delhi, India',
        D: 'Rio de Janeiro, Brazil'
      },
      correct_option: 'C',
      explanation: 'New Delhi, India hosted the 18th G20 summit at the Bharat Mandapam Convention Centre in September 2023.',
      exam: 'RRB JE',
      year: 2023,
      difficulty: 'Easy',
      appeared_count: 3
    }
  ],
  'reasoning': [
    {
      id: 'REAS-2019-0001',
      subject: 'reasoning',
      topic: 'Verbal Reasoning',
      subtopic: 'Coding Decoding',
      question: 'If RAILWAY is coded as SBJMXBZ, then how is STATION coded?',
      options: {
        A: 'TUBUJPO',
        B: 'TUTBJPO',
        C: 'TUUBJPO',
        D: 'TUBCJPO'
      },
      correct_option: 'A',
      explanation: 'Each letter is replaced by its next alphabetical letter (R->S, A->B, I->J, L->M, etc.). STATION becomes TUBUJPO.',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 3
    },
    {
      id: 'REAS-2022-0002',
      subject: 'reasoning',
      topic: 'Verbal Reasoning',
      subtopic: 'Blood Relations',
      question: 'Pointing to a man, a woman says, "His mother is the only daughter of my father." How is the woman related to the man?',
      options: {
        A: 'Sister',
        B: 'Mother',
        C: 'Daughter',
        D: 'Grandmother'
      },
      correct_option: 'B',
      explanation: 'The only daughter of the woman’s father is the woman herself. So, the man’s mother is the woman herself. Thus, the woman is his mother.',
      exam: 'RRB Group D',
      year: 2022,
      difficulty: 'Medium',
      appeared_count: 4
    }
  ],
  'english': [
    {
      id: 'ENG-2019-0001',
      subject: 'english',
      topic: 'Grammar',
      subtopic: 'Prepositions',
      question: 'Select the correct preposition: He is sitting _______ the shadow of the banyan tree.',
      options: {
        A: 'under',
        B: 'in',
        C: 'below',
        D: 'on'
      },
      correct_option: 'B',
      explanation: 'We sit "in" the shade/shadow of a tree, but we sit "under" the tree itself.',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Medium',
      appeared_count: 2
    },
    {
      id: 'ENG-2021-0002',
      subject: 'english',
      topic: 'Vocabulary',
      subtopic: 'Synonyms & Antonyms',
      question: 'What is the synonym of the word "ABSCOND"?',
      options: {
        A: 'Flee',
        B: 'Obey',
        C: 'Surrender',
        D: 'Remain'
      },
      correct_option: 'A',
      explanation: '"Abscond" means to leave hurriedly and secretly, typically to escape detection. "Flee" is a synonym.',
      exam: 'RRB NTPC',
      year: 2021,
      difficulty: 'Medium',
      appeared_count: 3
    }
  ],
  'hindi': [
    {
      id: 'HIN-2019-0001',
      subject: 'hindi',
      topic: 'व्याकरण (Grammar)',
      subtopic: 'संधि और समास (Sandhi & Samas)',
      question: '’सूर्योदय’ शब्द का सही संधि विच्छेद क्या है?',
      options: {
        A: 'सूर्य + उदय',
        B: 'सूर्यो + दय',
        C: 'सूर + उदय',
        D: 'सूर्य + दय'
      },
      correct_option: 'A',
      explanation: '’सूर्योदय’ में गुण स्वर संधि है। इसका विच्छेद ’सूर्य + उदय’ (अ/आ + उ/ऊ = ओ) होता है।',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 3
    },
    {
      id: 'HIN-2022-0002',
      subject: 'hindi',
      topic: 'व्याकरण (Grammar)',
      subtopic: 'मुहावरे (Idioms)',
      question: '’अपना उल्लू सीधा करना’ मुहावरे का सही अर्थ क्या है?',
      options: {
        A: 'दूसरों की मदद करना',
        B: 'अपना स्वार्थ सिद्ध करना',
        C: 'मूर्ख बनाना',
        D: 'कठिन परिश्रम करना'
      },
      correct_option: 'B',
      explanation: '’अपना उल्लू सीधा करना’ का अर्थ होता है - अपना स्वार्थ निकालना या स्वार्थ सिद्ध करना।',
      exam: 'RRB Group D',
      year: 2022,
      difficulty: 'Easy',
      appeared_count: 4
    }
  ],
  'computer': [
    {
      id: 'COMP-2019-0001',
      subject: 'computer',
      topic: 'Computer Hardware',
      subtopic: 'Input Output Devices',
      question: 'Which of the following is an output device?',
      options: {
        A: 'Keyboard',
        B: 'Mouse',
        C: 'Plotter',
        D: 'Scanner'
      },
      correct_option: 'C',
      explanation: 'A plotter is an output device used to print high-quality vector graphics (like blueprints). Keyboards, mice, and scanners are input devices.',
      exam: 'RRB NTPC',
      year: 2019,
      difficulty: 'Easy',
      appeared_count: 4
    },
    {
      id: 'COMP-2022-0002',
      subject: 'computer',
      topic: 'Networking & Internet',
      subtopic: 'OSI Model',
      question: 'How many layers are there in the standard Open Systems Interconnection (OSI) model?',
      options: {
        A: '5',
        B: '6',
        C: '7',
        D: '8'
      },
      correct_option: 'C',
      explanation: 'The OSI model contains 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
      exam: 'RRB Group D',
      year: 2022,
      difficulty: 'Medium',
      appeared_count: 5
    }
  ]
};

export const SYLLABUS: Record<string, SyllabusItem[]> = {
  'general-knowledge': [
    {
      name: 'Indian History',
      appearedCount: 263,
      subtopics: [
        { name: 'Ancient India', appearedCount: 87 },
        { name: 'Medieval India', appearedCount: 64 },
        { name: 'Modern India / Freedom', appearedCount: 112 }
      ]
    },
    {
      name: 'Geography',
      appearedCount: 168,
      subtopics: [
        { name: 'Physical Geography', appearedCount: 58 },
        { name: 'Indian Rivers & Dams', appearedCount: 71 },
        { name: 'National Parks & Wildlife', appearedCount: 39 }
      ]
    },
    {
      name: 'Indian Polity',
      appearedCount: 161,
      subtopics: [
        { name: 'Constitution Articles', appearedCount: 94 },
        { name: 'Parliament & Elections', appearedCount: 67 }
      ]
    }
  ],
  'mathematics': [
    {
      name: 'Arithmetic',
      appearedCount: 380,
      subtopics: [
        { name: 'Speed Time Distance', appearedCount: 140 },
        { name: 'Profit and Loss', appearedCount: 125 },
        { name: 'Percentages', appearedCount: 115 }
      ]
    },
    {
      name: 'Geometry & Mensuration',
      appearedCount: 110,
      subtopics: [
        { name: 'Area and Perimeter', appearedCount: 72 },
        { name: 'Volume & Surfaces', appearedCount: 38 }
      ]
    }
  ],
  'general-science': [
    {
      name: 'Physics',
      appearedCount: 210,
      subtopics: [
        { name: 'Light & Reflection', appearedCount: 115 },
        { name: 'Mechanics & Work', appearedCount: 95 }
      ]
    },
    {
      name: 'Chemistry',
      appearedCount: 180,
      subtopics: [
        { name: 'Periodic Table', appearedCount: 105 },
        { name: 'Chemical Reactions', appearedCount: 75 }
      ]
    },
    {
      name: 'Biology',
      appearedCount: 240,
      subtopics: [
        { name: 'Human Anatomy', appearedCount: 155 },
        { name: 'Plant Kingdom', appearedCount: 85 }
      ]
    }
  ],
  'current-affairs': [
    {
      name: 'Science & Tech',
      appearedCount: 98,
      subtopics: [
        { name: 'Space Missions', appearedCount: 58 },
        { name: 'Defense Equipment', appearedCount: 40 }
      ]
    },
    {
      name: 'Schemes & Summits',
      appearedCount: 102,
      subtopics: [
        { name: 'Govt Schemes', appearedCount: 62 },
        { name: 'G20 Summit & Bilateral Meetings', appearedCount: 40 }
      ]
    }
  ],
  'reasoning': [
    {
      name: 'Verbal Reasoning',
      appearedCount: 290,
      subtopics: [
        { name: 'Coding Decoding', appearedCount: 150 },
        { name: 'Blood Relations', appearedCount: 140 }
      ]
    }
  ],
  'english': [
    {
      name: 'Grammar',
      appearedCount: 180,
      subtopics: [
        { name: 'Prepositions', appearedCount: 95 },
        { name: 'Tenses', appearedCount: 85 }
      ]
    },
    {
      name: 'Vocabulary',
      appearedCount: 160,
      subtopics: [
        { name: 'Synonyms & Antonyms', appearedCount: 110 },
        { name: 'Idioms & Phrases', appearedCount: 50 }
      ]
    }
  ],
  'hindi': [
    {
      name: 'व्याकरण (Grammar)',
      appearedCount: 280,
      subtopics: [
        { name: 'संधि और समास (Sandhi & Samas)', appearedCount: 160 },
        { name: 'मुहावरे (Idioms)', appearedCount: 120 }
      ]
    }
  ],
  'computer': [
    {
      name: 'Computer Hardware',
      appearedCount: 115,
      subtopics: [
        { name: 'Input Output Devices', appearedCount: 65 },
        { name: 'CPU & Memory', appearedCount: 50 }
      ]
    },
    {
      name: 'Networking & Internet',
      appearedCount: 135,
      subtopics: [
        { name: 'OSI Model', appearedCount: 75 },
        { name: 'Cyber Security', appearedCount: 60 }
      ]
    }
  ]
};

export const STORIES: Record<string, StoryData> = {
  'general-knowledge': {
    subject: 'general-knowledge',
    chapters: [
      {
        id: 'gk-ch1',
        title: 'Chapter 1: The Ancient Chronicles',
        content: `The Indus Valley Civilization, one of the world's earliest urban cultures, flourished along the banks of rivers in present-day Pakistan and northwest India. Characterized by baked brick houses, drainage systems, and sophisticated crafts, it represents the dawn of Indian urban history.

It was during this era that a famous question arose in the RRB examinations: [[Q: Which civilization is also known as the Harappan Civilization?]] The answer that echoes through time is [[A: Indus Valley Civilization]] — a fact that every railway aspirant must etch into memory.

Moving forward in time, the Indian subcontinent witnessed many structural integrations, culminating in the struggle for independence from British rule...`
      },
      {
        id: 'gk-ch2',
        title: 'Chapter 2: The Unification of India',
        content: `As India gained independence in 1947, the country faced the monumental task of consolidating 562 princely states. A leader of immense resolve rose to this occasion, traveling tirelessly, persuading rulers, and using absolute firmness when needed to weave a unified nation.

In the 2019 RRB NTPC exams, the examiners asked about this crucial statesman: [[Q: Who is known as the "Iron Man of India"?]] The undisputed answer is [[A: Sardar Vallabhbhai Patel]]. His leadership is celebrated with the Statue of Unity.

This unified nation then formulated its supreme charter: the Constitution of India, guaranteeing key fundamental principles. An important question asks: [[Q: Which article of the Indian Constitution guarantees the "Right to Equality"?]] The fundamental guarantee lies in [[A: Article 14]], providing equality before the law for all.`
      }
    ]
  },
  'mathematics': {
    subject: 'mathematics',
    chapters: [
      {
        id: 'math-ch1',
        title: 'Chapter 1: The Loco Pilot’s Journey',
        content: `Arjun, a young loco pilot trainee from Nashik, sat in his cabin on Day 1 of hands-on training. His supervisor, Senior Engineer Mr. Shastri, handed him a clipboard with logs detailing speeds and fuel metrics.

"Arjun," Shastri said, pointing out at the track stretching towards the horizon, "our trains must run exactly on schedule. Try this scenario: [[Q: A train travels 360 km in 4 hours. What is its average speed?]]" Arjun did the quick arithmetic in his head and confidently answered, "The speed is [[A: 90 km/h]]." This classic problem was featured in the RRB Group D paper.

Next, Mr. Shastri discussed purchasing budget adjustments for repair bolts. "If we get a discount, it affects margins. What if [[Q: If a vendor sells an item for Rs. 240 making a 20% profit, what was the cost price of the item?]]" Arjun calculated that the base cost must be [[A: Rs. 200]], ensuring the vendor's math was clean.`
      }
    ]
  },
  'general-science': {
    subject: 'general-science',
    chapters: [
      {
        id: 'sci-ch1',
        title: 'Chapter 1: The Lab Diagnostics',
        content: `Dr. Shanya paced around the high-resolution microscope in the railway hospital’s laboratory. Diagnosing visual issues among locomotive staff was critical to safety.

"The driver has trouble reading distant railway signals," she commented to her intern. "This refractive error is myopia. Do you know: [[Q: Which lens is used to correct short-sightedness (Myopia)?]]" The intern answered quickly, "We must prescribe a [[A: Concave Lens]] to diverge the light."

Later, they examined metallurgy records for train track strength. Gold coatings were discussed for conductive relays. "What is the chemical symbol of Gold?" she asked. The symbol, which also appeared in RRB papers, is [[A: Au]].`
      }
    ]
  },
  'current-affairs': {
    subject: 'current-affairs',
    chapters: [
      {
        id: 'ca-ch1',
        title: 'Chapter 1: The Tech and Diplomatic Year',
        content: `As the chief editor of Bharat News, Kabir was finalizing the year-in-review columns for the civil services and railway exam specials.

The space section highlighted India's proudest landing on the south pole of the Moon. A critical box article asked: [[Q: Which rocket launched India’s Chandrayaan-3 lunar mission?]] Kabir noted the answer as the heavy launcher [[A: GSLV MK III (LVM3)]].

Following space highlights, Kabir reviewed the diplomatic front. India hosted global leaders under the theme of "Vasudhaiva Kutumbakam". A prominent exam query was: [[Q: Where was the 18th G20 Summit hosted in September 2023?]] The historic summit was held in [[A: New Delhi, India]].`
      }
    ]
  },
  'reasoning': {
    subject: 'reasoning',
    chapters: [
      {
        id: 'reas-ch1',
        title: 'Chapter 1: The Cryptographic Puzzle',
        content: `Detective ACP Vivek arrived at the signal cabin. The saboteurs had left a scrambled code on the display panel. "RAILWAY" was somehow showing up as "SBJMXBZ".

"It's a shift cipher," Vivek muttered, calculating the character distances. "Each letter shifted by +1. If they did that, then: [[Q: If RAILWAY is coded as SBJMXBZ, then how is STATION coded?]]" The answer decoded to [[A: TUBUJPO]].

In another file, they found a family lineage chart showing a suspect profile: [[Q: Pointing to a man, a woman says, "His mother is the only daughter of my father." How is the woman related to the man?]] Vivek deduced that the woman must be the suspect's [[A: Mother]].`
      }
    ]
  },
  'english': {
    subject: 'english',
    chapters: [
      {
        id: 'eng-ch1',
        title: 'Chapter 1: The Interview Prep',
        content: `Meera was tutoring her younger brother for the railway written exams. "Prepositions can be tricky," she warned.

"For instance, look at this question: [[Q: Select the correct preposition: He is sitting _______ the shadow of the banyan tree.]]" Her brother guessed 'under'. Meera corrected him: "No, the correct usage is [[A: in]] because we refer to the space inside the shade, whereas 'under' applies directly beneath the branches."

She then quizzed him on verb usage and vocabulary. "What is the synonym of the word "ABSCOND"?" Her brother replied correctly: "It is to [[A: Flee]] from custody."`
      }
    ]
  },
  'hindi': {
    subject: 'hindi',
    chapters: [
      {
        id: 'hin-ch1',
        title: 'अध्याय 1: व्याकरण अभ्यास',
        content: `राजेश और अमित रेलवे परीक्षा की तैयारी कर रहे थे। उन्होंने हिंदी व्याकरण के जटिल विषयों पर चर्चा की।

अमित ने पूछा, "रेलवे परीक्षा में पूछा गया यह सवाल देखो: [[Q: ’सूर्योदय’ शब्द का सही संधि विच्छेद क्या है?]]" राजेश ने तुरंत उत्तर दिया, "इसका सही उत्तर [[A: सूर्य + उदय]] होगा, जहाँ अ + उ मिलकर ओ बन जाते हैं।"

फिर राजेश ने एक मुहावरे का उदाहरण दिया: [[Q: ’अपना उल्लू सीधा करना’ मुहावरे का सही अर्थ क्या है?]] अमित ने मुस्कुराते हुए कहा, "इसका अर्थ [[A: अपना स्वार्थ सिद्ध करना]] होता है।" दोनों ने मिलकर अभ्यास जारी रखा।`
      }
    ]
  },
  'computer': {
    subject: 'computer',
    chapters: [
      {
        id: 'comp-ch1',
        title: 'Chapter 1: The Station Digitalization',
        content: `The technical team was upgrading the booking terminal at Lucknow station. Senior engineer Vikram was cataloging hardware components.

"A scanner takes inputs, but a plotter draws maps," Vikram explained to a trainee. "Tell me: [[Q: Which of the following is an output device?]]" The trainee selected [[A: Plotter]] correctly.

Vikram then tested the trainee's understanding of communication networks: [[Q: How many layers are there in the standard Open Systems Interconnection (OSI) model?]] The trainee confirmed there are [[A: 7]] layers in total.`
      }
    ]
  }
};
