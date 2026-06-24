// Layer 1 — the saturated blue/violet mesh that makes the glass read as color
// instead of grey. Fixed, full-viewport, behind everything. Blobs drift via
// CSS transforms only (see index.css) — no JS loop, no canvas.
export default function MeshBackground() {
  return (
    <div className="mesh" aria-hidden="true">
      <span className="mesh__blob mesh__blob--blue" />
      <span className="mesh__blob mesh__blob--violet" />
      <span className="mesh__blob mesh__blob--azure" />
    </div>
  )
}
