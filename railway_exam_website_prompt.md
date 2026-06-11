# 🚂 Railway Exam Mastery Platform — Master Build Prompt

> **Version:** 1.0 | **Scope:** Full-Stack Web Application | **Target:** RRB / RRC / NTPC / Group D / ALP / JE Exam Aspirants (2010–2025)

---

## 🧠 PROJECT OVERVIEW

Build a fully responsive, feature-rich **Railway Exam Preparation Website** covering **all railway recruitment board (RRB/RRC) examinations from 2010 to 2025**. The platform serves as a complete self-study ecosystem with 1000+ questions per subject, interactive mock tests with scorecards, subject-wise syllabus pages, historical storytelling for GK/Maths, and a clean, professional UI inspired by government exam portals — but modern, fast, and mobile-first.

**Stack:** React + TypeScript + Tailwind CSS + Framer Motion + Vite  
**Data:** Static JSON question banks (1000+ per subject), no backend needed for MVP  
**Persistence:** localStorage for scores, progress, bookmarks

---

## 🎨 DESIGN SYSTEM

### Color Palette
```
--primary:       #1A3C6E   /* Indian Railways Navy Blue */
--accent:        #FF6B00   /* Safety Orange — signal color */
--highlight:     #F5C518   /* Gold — for answer highlights */
--success:       #22C55E   /* Correct answer green */
--danger:        #EF4444   /* Wrong answer red */
--bg-dark:       #0F1B2D   /* Night mode base */
--bg-light:      #F4F7FB   /* Day mode base */
--surface:       #FFFFFF
--story-answer:  #FF6B00   /* Bold orange for story highlights */
--story-question:#1A3C6E   /* Bold blue for question highlights in story */
--text-primary:  #1C1C1E
--text-muted:    #6B7280
--border:        #E5E7EB
```

### Typography
- **Display / Headings:** `Poppins` (700, 800) — strong, modern, government-exam confidence
- **Body / Questions:** `Inter` (400, 500, 600) — legible at small sizes on mobile
- **Code / Year Tags:** `JetBrains Mono` — for exam year badges, Q. numbers
- **Story Prose:** `Lora` (serif, 400 italic) — narrative warmth for historical storytelling

### Signature Design Element
A **train track progress bar** — replaces default progress bars throughout the site with animated SVG rails and a moving train icon. This appears in mock tests, syllabus completion, and score cards.

---

## 📁 SITE ARCHITECTURE — PAGE ROUTES

```
/                          → Home / Landing Page
/subjects                  → Subject Directory
/subjects/general-knowledge   → GK Page (PYQs + Story + Syllabus)
/subjects/mathematics         → Maths Page (PYQs + Story + Syllabus)
/subjects/general-science     → Science Page
/subjects/current-affairs     → Current Affairs Page
/subjects/reasoning           → Reasoning Page
/subjects/english             → English Page
/subjects/hindi               → Hindi Page
/subjects/computer            → Computer Awareness Page
/mock-test                 → Mock Test Home (select subject/full)
/mock-test/[id]            → Live Mock Test Interface
/mock-test/result/[id]     → Scorecard Page
/syllabus                  → Master Syllabus Overview
/history-stories           → Story Hub (all subjects)
/bookmarks                 → Saved Questions
/about                     → About the Platform
```

---

## 🧱 COMPONENT ARCHITECTURE

### Global Components
```
<Navbar />              — sticky, hamburger on mobile, subject dropdown
<Footer />              — links, disclaimer, copyright
<TrainProgressBar />    — animated SVG train on tracks (reusable)
<QuestionCard />        — renders a single PYQ with year badge, subject tag
<AnswerReveal />        — expandable answer section with explanation
<YearBadge />           — colored pill: e.g. "RRB 2019" in navy blue
<SubjectTag />          — pill tag for subject category
<BookmarkButton />      — heart/bookmark icon, saves to localStorage
<SearchBar />           — filter questions by keyword / year / topic
<ThemeToggle />         — light/dark mode switch
```

### Mock Test Components
```
<MockTestConfig />      — choose subject, difficulty, question count (10/25/50)
<MockTestTimer />       — countdown timer with animated ring
<MockTestQuestion />    — single question with 4 options, navigation
<MockTestNav />         — question number grid (attempted/skipped/flagged)
<MockTestScorecard />   — full result breakdown (below)
```

### Story Components
```
<StoryRenderer />       — renders narrative prose with inline highlights
<HighlightQuestion />   — bold + orange color inline question mention
<HighlightAnswer />     — bold + gold/blue inline answer mention
<StoryChapter />        — accordion section for each story chapter
```

---

## 📚 SUBJECT PAGES — DETAILED SPECS

Each subject has its own route (e.g., `/subjects/general-knowledge`) and contains **4 tabs**:

### Tab 1: Previous Year Questions (PYQ Bank)
- 1000+ questions displayed with pagination (20 per page)
- Each question card shows:
  - Question number
  - Question text
  - 4 options (A, B, C, D)
  - "Show Answer" toggle → reveals correct answer + explanation
  - **Year Badge** (e.g., "RRB NTPC 2019", "RRB Group D 2022")
  - **Difficulty tag** (Easy / Medium / Hard)
  - Bookmark icon
- Filter bar: by Year (2010–2025), by Topic, by Difficulty
- Search box: full-text search within questions

### Tab 2: Syllabus
- Generated from actual question patterns across 2010–2025
- Accordion-based topic tree
- Each topic shows: "Appeared X times in exams" badge
- Downloadable as PDF (print-friendly stylesheet)
- Percentage coverage bar per topic

### Tab 3: History Story (GK, Science, Maths)
- A continuous narrative essay (2000–3000 words)
- Questions from the PYQ bank are **woven into the story naturally**
- When a question is referenced in the story:
  - The **question text is bolded and colored in navy blue**
  - The **answer is bolded and colored in safety orange**
  - Wrapped in `<HighlightQuestion>` and `<HighlightAnswer>` components
- Story is divided into chapters (for GK: Ancient India, Medieval India, Modern India, etc.)
- For Maths: story follows a fictional Indian engineer solving problems, each concept introduced narratively with the actual PYQ embedded
- "Read Mode" toggle: clean serif font, increased line height, reduced distractions

### Tab 4: Quick Revision
- Flashcard format: flip card animation
- 50 most important questions per subject
- Swipe left (wrong) / right (correct) on mobile
- Session tracking: "You got 38/50 correct today"

---

## 🧪 MOCK TEST SYSTEM — DETAILED SPECS

### Mock Test Home (`/mock-test`)
- 3 test types:
  1. **Subject Mock** — pick one subject, 25 questions, 25 min
  2. **Full Length Mock** — all subjects, 100 questions, 90 min (RRB NTPC pattern)
  3. **Speed Test** — 20 questions, 10 min
- "Questions are randomized every session" note
- Past test history (localStorage): date, score, rank percentile estimate

### Live Mock Test (`/mock-test/[id]`)
- Full-screen mode option
- Timer in top-right (animated countdown ring)
- Question displayed one at a time with smooth slide transition
- Bottom navigation: Previous / Next / Submit
- Question grid panel (right sidebar on desktop, modal on mobile):
  - Green = attempted
  - Red = skipped
  - Yellow = flagged for review
- "Submit Test" confirmation modal
- **Auto-submit when timer reaches 0**

### Scorecard Page (`/mock-test/result/[id]`)

This is a **full-featured results dashboard**, not just a score number.

```
┌─────────────────────────────────────────────┐
│         🚂 TEST COMPLETE                    │
│   Score: 73 / 100    |   Rank: Top 34%     │
│   Time Taken: 67 min |   Accuracy: 73%     │
├─────────────────────────────────────────────┤
│  SUBJECT-WISE BREAKDOWN                     │
│  ┌──────────┬──────────┬────────┬────────┐ │
│  │ Subject  │ Attempted│Correct │  Score │ │
│  ├──────────┼──────────┼────────┼────────┤ │
│  │ Maths    │   20/25  │   16   │  64%   │ │
│  │ GK       │   25/25  │   20   │  80%   │ │
│  │ Reasoning│   22/25  │   17   │  68%   │ │
│  │ Science  │   20/25  │   20   │  80%   │ │
│  └──────────┴──────────┴────────┴────────┘ │
├─────────────────────────────────────────────┤
│  QUESTION REVIEW (accordion)                │
│  ✅ Q1. Correct — Your answer: B — Ans: B  │
│  ❌ Q7. Wrong — You: A — Correct: C        │
│  ⏭ Q12. Skipped — Correct answer: D       │
├─────────────────────────────────────────────┤
│  PERFORMANCE METRICS                        │
│  Donut chart: Correct / Wrong / Skipped     │
│  Spider/Radar chart: subject-wise %         │
│  Train Progress Bar: journey to target score│
├─────────────────────────────────────────────┤
│  [Retake Test]  [Share Score]  [Download]   │
└─────────────────────────────────────────────┘
```

**Scorecard Features:**
- Animated score counter on load
- Confetti if score > 80%
- Motivational message based on score range
- "Weak Areas" section: topics with most errors
- "Recommended Study" links to PYQ bank filtered by weak topics
- Share score card as image (canvas screenshot)
- Download as PDF

---

## 📖 HISTORY STORY FORMAT — DETAILED SPEC

### General Knowledge Story Example Structure

**Chapter 1: The Ancient Chronicles**

> *The Indus Valley Civilization, one of the world's earliest urban cultures, flourished along the banks of rivers in present-day Pakistan and northwest India...*
>
> *It was during this era that a famous question arose in the 2015 RRB examinations:* **"Which civilization is also known as Harappan Civilization?"** *The answer that echoes through time is:* **"The Indus Valley Civilization"** *— a fact that every railway aspirant must etch into memory.*
>
> *Moving forward into the Vedic Age...*

**Rendering rules:**
- `<span class="story-question">` → `font-weight: 700; color: #1A3C6E; background: rgba(26,60,110,0.08); border-radius: 4px; padding: 2px 4px;`
- `<span class="story-answer">` → `font-weight: 700; color: #FF6B00; background: rgba(255,107,0,0.08); border-radius: 4px; padding: 2px 4px;`

### Mathematics Story Example Structure

**Chapter 1: The Railway Engineer's Journey**

> *Arjun, a young loco pilot trainee from Nashik, was handed his first problem sheet on Day 1 of training...*
>
> *His trainer asked:* **"A train travels 360 km in 4 hours. What is its average speed?"** *Arjun confidently replied:* **"90 km/h"** *— a question that appeared verbatim in the RRB Group D 2018 paper.*

### Subjects that get Story pages:
- ✅ General Knowledge (Historical narrative)
- ✅ Mathematics (Engineer's journey narrative)
- ✅ General Science (Scientist biography narrative)
- ✅ Current Affairs (Journalist's year-in-review narrative)
- ✅ Reasoning (Detective mystery narrative)
- ⬜ English / Hindi (Grammar-as-dialogue narrative — optional)

---

## 📋 SYLLABUS PAGE — DETAILED SPEC

Each subject syllabus is **derived from question patterns** (not just copied from official PDFs), so it reflects what *actually* appeared in exams.

### Structure per subject:

```
Subject Syllabus: General Knowledge
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ Indian History                [★★★★★ Very High Frequency]
    • Ancient India             — 87 questions appeared (2010–2025)
    • Medieval India            — 64 questions
    • Modern India / Freedom    — 112 questions
    • Governors-General / Viceroys — 43 questions

▶ Geography                    [★★★★☆ High Frequency]
    • Physical Geography        — 58 questions
    • Indian Rivers & Dams      — 71 questions
    • National Parks & Wildlife — 39 questions

▶ Indian Polity                [★★★★☆ High Frequency]
    • Constitution Articles     — 94 questions
    • Parliament & Elections    — 67 questions

▶ Economics                    [★★★☆☆ Medium Frequency]
    • Five Year Plans           — 28 questions
    • Budget & GDP Concepts     — 35 questions

[... and so on for all topics]
```

**Frequency stars** are calculated from question count:
- ★★★★★ = 80+ questions
- ★★★★☆ = 50–79
- ★★★☆☆ = 25–49
- ★★☆☆☆ = 10–24
- ★☆☆☆☆ = 1–9

---

## 🗂️ QUESTION BANK DATA STRUCTURE (JSON)

```json
{
  "id": "GK-2019-0034",
  "subject": "general-knowledge",
  "topic": "Indian History",
  "subtopic": "Modern India",
  "question": "Who is known as the 'Iron Man of India'?",
  "options": {
    "A": "Jawaharlal Nehru",
    "B": "Sardar Vallabhbhai Patel",
    "C": "Subhas Chandra Bose",
    "D": "Bhimrao Ambedkar"
  },
  "correct_option": "B",
  "explanation": "Sardar Vallabhbhai Patel unified 562 princely states into the Indian Union after independence, earning him the title 'Iron Man of India'.",
  "exam": "RRB NTPC",
  "year": 2019,
  "difficulty": "Easy",
  "appeared_count": 4
}
```

---

## 🧩 SUBJECTS & QUESTION COUNT TARGETS

| Subject              | Target Q Count | Story Type                    | Syllabus Source         |
|----------------------|----------------|-------------------------------|-------------------------|
| General Knowledge    | 1200+          | Historical Narrative          | Pattern-derived         |
| Mathematics          | 1100+          | Engineer Journey Narrative    | Pattern-derived         |
| General Science      | 1000+          | Scientist Biography           | Pattern-derived         |
| Current Affairs      | 1000+          | Journalist's Diary            | Year-wise (2010–2025)   |
| Reasoning            | 1000+          | Detective Mystery             | Pattern-derived         |
| English              | 1000+          | Grammar-as-Dialogue (optional)| Pattern-derived         |
| Hindi                | 1000+          | Grammar-as-Dialogue (optional)| Pattern-derived         |
| Computer Awareness   | 800+           | Tech Timeline Narrative       | Pattern-derived         |

---

## 🔥 FEATURES CHECKLIST

### Core Features
- [x] Subject-wise PYQ bank (1000+ per subject)
- [x] Year filter (2010–2025), Difficulty filter, Topic filter
- [x] Full-text search across all questions
- [x] Show/hide answer with explanation
- [x] Year badge on every question
- [x] Bookmark questions (localStorage)
- [x] Progress tracking per subject

### Mock Test Features
- [x] Randomized question selection every session
- [x] 3 test formats (Subject / Full-Length / Speed)
- [x] Countdown timer with auto-submit
- [x] Question navigation grid (attempted / skipped / flagged)
- [x] Full scorecard with subject breakdown
- [x] Radar/Spider chart for subject performance
- [x] Donut chart for correct/wrong/skipped
- [x] Weak area detection and study recommendations
- [x] Score history (last 10 tests, localStorage)
- [x] Confetti on high scores
- [x] Share + Download scorecard

### Story Features
- [x] Narrative prose with embedded PYQs
- [x] Questions highlighted in bold navy blue
- [x] Answers highlighted in bold safety orange
- [x] Chapter-based accordion navigation
- [x] Read Mode (clean serif, distraction-free)
- [x] "Where did this question appear?" tooltip on hover

### Syllabus Features
- [x] Topic-wise question frequency stars
- [x] Accordion topic tree
- [x] Questions appeared count per subtopic
- [x] Print/Download PDF version

### UX / Design Features
- [x] Light / Dark mode toggle
- [x] Animated train progress bar
- [x] Mobile-first responsive design
- [x] Framer Motion page transitions
- [x] Keyboard accessible
- [x] Loading skeletons for question cards

---

## ⚙️ TECHNICAL IMPLEMENTATION NOTES

### Data Loading Strategy
```typescript
// Lazy-load per subject to keep initial bundle small
const loadQuestions = async (subject: string) => {
  const module = await import(`./data/${subject}.json`);
  return module.default as Question[];
};
```

### Question Randomization (Mock Test)
```typescript
const shuffle = <T>(arr: T[]): T[] =>
  arr.sort(() => Math.random() - 0.5);

const selectQuestions = (
  bank: Question[],
  subject: string | 'all',
  count: number
): Question[] => {
  const filtered = subject === 'all' ? bank : bank.filter(q => q.subject === subject);
  return shuffle(filtered).slice(0, count);
};
```

### Scorecard Calculation
```typescript
interface TestResult {
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  timeTaken: number; // seconds
  subjectBreakdown: Record<string, SubjectScore>;
  weakTopics: string[];
}
```

### Story Rendering
```tsx
// Parse story markdown with custom tokens
// [[Q: question text]] → <HighlightQuestion>
// [[A: answer text]]   → <HighlightAnswer>

const StoryRenderer = ({ content }: { content: string }) => {
  const parts = parseStoryTokens(content);
  return (
    <div className="story-prose font-lora">
      {parts.map((part, i) =>
        part.type === 'question' ? (
          <HighlightQuestion key={i}>{part.text}</HighlightQuestion>
        ) : part.type === 'answer' ? (
          <HighlightAnswer key={i}>{part.text}</HighlightAnswer>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </div>
  );
};
```

---

## 🏠 HOME PAGE LAYOUT

```
┌──────────────────────────────────────────────┐
│  🚂 NAVBAR: Logo | Subjects ▾ | Mock Test   │
│             Syllabus | Stories | [Start Test]│
├──────────────────────────────────────────────┤
│  HERO SECTION                                │
│  "15 Years of Railway Exams. All in One      │
│   Place."                                    │
│  Subtext: 8000+ questions | 2010–2025 |      │
│           Free | No login                    │
│  [Start Mock Test] [Browse Questions]        │
│  Animated train moving on tracks (SVG)       │
├──────────────────────────────────────────────┤
│  STATS BAR                                   │
│  8,000+ Questions | 8 Subjects | 15 Years   │
│  | 100% Free                                 │
├──────────────────────────────────────────────┤
│  SUBJECT CARDS GRID (2x4)                    │
│  GK | Maths | Science | Current Affairs      │
│  Reasoning | English | Hindi | Computer      │
│  Each card: icon, Q count, "1200 questions"  │
├──────────────────────────────────────────────┤
│  MOCK TEST CTA SECTION                       │
│  "Ready to Test Yourself?"                   │
│  [Full Mock — 100 Qs] [Quick 25 Qs]         │
├──────────────────────────────────────────────┤
│  HISTORY STORIES PREVIEW                     │
│  "Learn through Stories"                     │
│  3 story preview cards (GK, Maths, Science) │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
│  Disclaimer | About | All Subjects | Contact │
└──────────────────────────────────────────────┘
```

---

## 📱 MOBILE EXPERIENCE

- Bottom navigation bar on mobile: Home | Subjects | Test | Bookmarks
- Questions stack in single column
- Test interface: full-screen with swipe navigation between questions
- Story mode: reader-first, full-width prose
- Scorecard: vertically stacked sections, horizontal scrollable table

---

## 🎯 EXAM PATTERNS COVERED

| Exam | Years Covered |
|------|--------------|
| RRB NTPC (Non-Technical Popular Categories) | 2010, 2011, 2016, 2019, 2021, 2022, 2024 |
| RRB Group D | 2013, 2018, 2022, 2023, 2024 |
| RRB ALP (Assistant Loco Pilot) | 2010, 2014, 2018, 2023 |
| RRB JE (Junior Engineer) | 2011, 2015, 2019, 2023 |
| RRC (Railway Recruitment Cell) | 2012, 2014, 2019, 2023 |
| RRB Paramedical | 2019, 2023 |
| RRB Ministerial & Isolated | 2019, 2023 |

---

## 🚀 BUILD PHASES

### Phase 1: Foundation
- Setup Vite + React + TypeScript + Tailwind
- Design system tokens (CSS variables)
- Routing (React Router v6)
- Navbar, Footer, ThemeToggle
- Home page with static content

### Phase 2: Question Bank
- JSON structure for all 8 subjects (seed with 100 questions each)
- QuestionCard component
- Subject pages with PYQ tab
- Filter + Search functionality
- Bookmark system (localStorage)

### Phase 3: Mock Test
- MockTestConfig page
- Live test interface (timer, navigation, flagging)
- Scorecard page (charts, breakdown, recommendations)
- Score history

### Phase 4: Syllabus
- Pattern-analysis algorithm on question bank
- Accordion syllabus UI
- Frequency star system

### Phase 5: Stories
- Story data format (markdown with [[Q:]] [[A:]] tokens)
- StoryRenderer component
- Read Mode
- 8 subject stories (min 2000 words each with 50+ embedded PYQs)

### Phase 6: Polish
- Framer Motion transitions
- Animated train progress bars
- Confetti
- Mobile bottom nav
- Performance: lazy loading, code splitting
- PWA (offline support for question bank)

---

## 📌 CONTENT GENERATION PROMPT (For AI-Assisted Question Generation)

Use this prompt to generate subject-wise questions in the correct JSON format:

```
Generate 50 multiple-choice questions for the [SUBJECT] section of Indian Railway Recruitment Board (RRB) exams. 

Requirements:
- Questions should be based on actual RRB/RRC/NTPC/Group D exam patterns from 2010–2025
- Each question must have exactly 4 options (A, B, C, D)
- Include the correct option
- Include a 1-2 sentence explanation for the correct answer
- Assign a realistic exam year (2010–2024), exam name (RRB NTPC / RRB Group D / RRB ALP / RRB JE), difficulty (Easy/Medium/Hard), and topic/subtopic
- Format as a JSON array using this exact structure:

{
  "id": "[SUBJECT_CODE]-[YEAR]-[4-DIGIT-INDEX]",
  "subject": "[subject-slug]",
  "topic": "...",
  "subtopic": "...",
  "question": "...",
  "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
  "correct_option": "A/B/C/D",
  "explanation": "...",
  "exam": "RRB NTPC",
  "year": 2019,
  "difficulty": "Medium",
  "appeared_count": 1
}

Output ONLY the JSON array, no markdown, no preamble.
```

---

## 📝 STORY GENERATION PROMPT (For AI-Assisted Story Writing)

Use this prompt to generate subject stories with embedded questions:

```
Write a [2500-word] educational narrative story for the [SUBJECT] section of a Railway Exam preparation website. 

Rules:
1. The story must feel like engaging prose, NOT a quiz or list
2. For General Knowledge: write a historical journey through Indian history/geography/polity
3. For Mathematics: follow a fictional Indian railway employee solving daily math problems
4. For General Science: follow a scientist character explaining concepts
5. For Reasoning: write a detective/puzzle-solving narrative
6. Naturally embed the following exam questions within the story. When a question is referenced:
   - Wrap the question text in: [[Q: question text here]]
   - Wrap the answer in: [[A: answer text here]]
7. Make the question and answer flow naturally in the narrative — don't announce them as "exam questions"
8. Divide into 4–5 chapters with titles

Questions to embed:
[PASTE 30–50 QUESTIONS FROM JSON BANK HERE]

Output only the story text with [[Q:]] and [[A:]] tokens. No markdown headers except chapter titles.
```

---

## 🔒 LEGAL / DISCLAIMER

Add a disclaimer on all pages:

> "This platform is an independent study resource. Questions are compiled from publicly available previous year papers and memory-based recollections. This site is not affiliated with the Railway Recruitment Board (RRB), Railway Recruitment Cell (RRC), or the Ministry of Railways, Government of India."

---

## ✅ FINAL CHECKLIST BEFORE LAUNCH

- [ ] 1000+ questions in each subject JSON file
- [ ] All 8 subject pages functional (PYQ, Syllabus, Story, Flashcard tabs)
- [ ] Mock test generates unique random sets per session
- [ ] Scorecard shows all metrics correctly
- [ ] Stories render with correct blue/orange highlights
- [ ] Mobile responsive across all pages
- [ ] Dark mode works throughout
- [ ] Bookmarks persist across page refresh
- [ ] Score history visible on mock test home
- [ ] All links and navigation working
- [ ] Performance: Lighthouse score > 85
- [ ] Disclaimer present on all pages

---

*Built for every Railway aspirant who dreams of the green signal. 🚦*
