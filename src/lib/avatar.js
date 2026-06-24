// Photo-free avatars: stable initials + a deterministic gradient per name.
// White initials stay legible on every generated gradient (saturated, mid/dark).

export function initials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0][0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function avatarGradient(name) {
  const hue = hash(name) % 360
  const hue2 = (hue + 26) % 360
  return `linear-gradient(135deg, hsl(${hue} 64% 54%), hsl(${hue2} 72% 44%))`
}

// Honors an optional per-person `color` override (single hue → a soft gradient
// off that color), else falls back to the deterministic name-based gradient.
export function avatarBackground(person) {
  if (person?.color) return `linear-gradient(140deg, ${person.color}, ${person.color}cc)`
  return avatarGradient(person?.name ?? '')
}
