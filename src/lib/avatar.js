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

// Deterministic gradient kept inside the brand's blue→violet band (hues ~212–278)
// so every avatar stays on-theme — no stray lime/green — while still giving each
// person a distinct color (which is how the two "SS" people are told apart).
export function avatarGradient(name) {
  const hue = 212 + (hash(name) % 66) // 212 (blue) … 278 (violet)
  const hue2 = hue + 22
  return `linear-gradient(140deg, hsl(${hue} 82% 60%), hsl(${hue2} 70% 48%))`
}

// Honors an optional per-person `color` override, else the name-based gradient.
export function avatarBackground(person) {
  if (person?.color) return `linear-gradient(140deg, ${person.color}, ${person.color}cc)`
  return avatarGradient(person?.name ?? '')
}
