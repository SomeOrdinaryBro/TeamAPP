/**
 * ───────────────────────────────────────────────────────────────────
 *  CONTENT — this is the ONLY file you edit to change what the app shows.
 *  No component changes needed: add, remove, or reorder entries and the
 *  Presenters and Team screens update themselves.
 *
 *  These are the real Aura Farming (Group 04) names. Everything except the
 *  names still needs to be filled in — the app shows names cleanly until
 *  you add detail:
 *
 *    title:        'Job title / role'        // optional — shown under the name
 *    about:        'Short blurb.'            // optional — "About" section
 *    isPresenter:  true                       // optional — puts them on the
 *                                             //   Presenters screen + enables a
 *                                             //   Strengths section
 *    strengths:    ['...', '...']             // presenters only — shown as chips
 *                                             //   on the presenter swipe cards
 *    color:        '#c026d3'                  // optional avatar color override;
 *                                             //   omit to auto-generate from name
 *
 *  There is no "weaknesses" field, by design. Don't add one.
 *
 *  Example of a fully filled-in person:
 *    {
 *      id: 'jane-doe',
 *      name: 'Jane Doe',
 *      title: 'Engineering Lead',
 *      isPresenter: true,
 *      strengths: ['Pragmatic builder', 'Calm under pressure'],
 *      about: 'Jane turns ideas into shipped software.',
 *    }
 * ───────────────────────────────────────────────────────────────────
 */

// App-wide text. Install metadata lives in index.html / manifest.webmanifest.
export const app = {
  title: 'Aura Farming',
  subtitle: 'Group 04 · Team Showcase',
  tagline: 'A tech-forward team — tap to meet everyone behind it.',
}

// NOTE: names transcribed from the shared image. Please double-check spellings,
// especially the ones flagged with "// verify".
export const people = [
  // ── Presenters ── deck shows them in THIS order: Diwonsha, Shakila,
  //    Sadhurshana, Sajid (per Sajid). title is ignored on presenter cards.
  {
    id: 'diwonsha-sundaram',
    name: 'Diwonsha Sundaram', // was "Divonshund Sundaram" — corrected per Sajid
    isPresenter: true,
    strengths: ['Team Player', 'Creative Thinking', 'Fast Learner'],
  },
  {
    id: 'shakila-senarathna',
    name: 'Shakila Senarathna',
    isPresenter: true,
    // Placeholder strengths added at Sajid's request — confirm/replace with real ones.
    strengths: ['Detail-Oriented', 'Collaborative', 'Adaptable'],
  },
  {
    id: 'sadhurshana-chandrasegaram',
    name: 'Sadhurshana Chandrasegaram', // spelling per Sajid (was "Sadhurstana")
    isPresenter: true,
    strengths: ['Quick Learner', 'Analytical Thinking', 'Organized'],
  },
  {
    id: 'daphne-williams',
    name: 'Daphne Williams',
    isPresenter: true,
    strengths: ['Resilience', 'Creativity', 'Determination'],
  },
  {
    id: 'sajid-sabreen',
    name: 'Sajid Sabreen',
    isPresenter: true,
    // CEO-level leadership, without saying "CEO" — per Sajid.
    strengths: ['Visionary Leadership', 'Strategic Decision-Making', 'Empowering Teams'],
  },

  // ── Team (non-presenters) ── shown in "The Team" deck. Add `title` to show a
  //    job title on the card; left blank for now pending real titles.
  { id: 'arib-razmi', name: 'Arib Razmi', title: '' },
  { id: 'chathuni-anahauda', name: 'Chathuni Anahauda', title: '' }, // verify
  { id: 'chamodini-sepalika', name: 'Chamodini Sepalika', title: '' },
  { id: 'riza-lahiba', name: 'Riza Lahiba', title: '' }, // not presenting — team member only
  { id: 'hiruni-piyumika', name: 'Hiruni Piyumika', title: '' },
  { id: 'nadarajah-thamilchelvi', name: 'Nadarajah Thamilchelvi', title: '' },
  { id: 'amoda-erandi', name: 'Amoda Erandi', title: '' },
  { id: 'thisul-fernando', name: 'Thisul Fernando', title: '' },
]
