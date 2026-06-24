// Three ascending rounded bars — a clean "growth / tech-forward" mark.
// Uses currentColor so it inherits text color (white on the gradient hero).
// Matches favicon.svg and the generated PWA icons.
export default function BrandMark({ className = '', title = 'Aura Farming' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={title} fill="none">
      <rect x="9" y="26" width="8" height="13" rx="3.2" fill="currentColor" />
      <rect x="20" y="18" width="8" height="21" rx="3.2" fill="currentColor" />
      <rect x="31" y="10" width="8" height="29" rx="3.2" fill="currentColor" />
    </svg>
  )
}
