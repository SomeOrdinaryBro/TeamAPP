// Strength chip. Ink text on a soft accent tint = high contrast under venue
// lighting; the small coral dot carries the accent.
export default function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-2 text-[14px] font-semibold leading-none text-ink">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  )
}
