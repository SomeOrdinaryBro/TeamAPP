// Strength chip — glass pill, faint violet edge, solid soft-white label so it
// stays legible over the mesh under bright venue lighting.
export default function Pill({ children }) {
  return (
    <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[14px] font-semibold leading-none text-soft">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-2" />
      {children}
    </span>
  )
}
