/**
 * Generates the PWA PNG icons from scratch — no image libraries, just Node's
 * built-in zlib. Renders an opaque, full-bleed coral tile with the three white
 * "ascending bars" mark (matching favicon.svg / BrandMark). Full-bleed + opaque
 * means the same art works as a maskable icon and as the iOS apple-touch icon.
 *
 * Run: `npm run icons` (also runs automatically as part of `npm run build`).
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// ── minimal PNG encoder (RGBA, 8-bit, no-filter scanlines) ──────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type: RGBA
  const stride = size * 4
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0 // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride)
  }
  const idat = deflateSync(raw, { level: 9 })
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

// ── art ─────────────────────────────────────────────────────────────────────
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const lerp = (a, b, t) => a + (b - a) * t
const C1 = hex('#2563EB') // azure
const C2 = hex('#1D4ED8') // blue
const C3 = hex('#6D28D9') // violet

// gradient sampled along the top-left → bottom-right diagonal
function bg(u, v) {
  const t = Math.min(1, Math.max(0, u * 0.5 + v * 0.5))
  if (t < 0.5) {
    const k = t / 0.5
    return [lerp(C1[0], C2[0], k), lerp(C1[1], C2[1], k), lerp(C1[2], C2[2], k)]
  }
  const k = (t - 0.5) / 0.5
  return [lerp(C2[0], C3[0], k), lerp(C2[1], C3[1], k), lerp(C2[2], C3[2], k)]
}

// signed distance to a rounded rect centred at origin (negative = inside)
function sdRoundRect(px, py, halfW, halfH, r) {
  const qx = Math.abs(px) - halfW + r
  const qy = Math.abs(py) - halfH + r
  const ax = Math.max(qx, 0)
  const ay = Math.max(qy, 0)
  return Math.hypot(ax, ay) + Math.min(Math.max(qx, qy), 0) - r
}

// three ascending bars, in normalized [-1, 1] coordinates (well inside the
// maskable safe zone so nothing important gets cropped)
const BOTTOM = 0.46
const BARS = [
  { cx: -0.4, top: -0.02 },
  { cx: 0.0, top: -0.24 },
  { cx: 0.4, top: -0.46 },
].map((b) => ({
  cx: b.cx,
  cy: (b.top + BOTTOM) / 2,
  hw: 0.105,
  hh: (BOTTOM - b.top) / 2,
  r: 0.07,
}))

function renderIcon(size) {
  const SS = 4 // 4×4 supersampling for crisp bar edges
  const buf = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let R = 0, G = 0, B = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = ((x + (sx + 0.5) / SS) / size) * 2 - 1
          const py = ((y + (sy + 0.5) / SS) / size) * 2 - 1
          const u = (px + 1) / 2
          const v = (py + 1) / 2
          let [r, g, b] = bg(u, v)
          for (const bar of BARS) {
            if (sdRoundRect(px - bar.cx, py - bar.cy, bar.hw, bar.hh, bar.r) < 0) {
              r = 255; g = 255; b = 255
              break
            }
          }
          R += r; G += g; B += b
        }
      }
      const n = SS * SS
      const i = (y * size + x) * 4
      buf[i] = Math.round(R / n)
      buf[i + 1] = Math.round(G / n)
      buf[i + 2] = Math.round(B / n)
      buf[i + 3] = 255 // opaque
    }
  }
  return buf
}

mkdirSync(OUT, { recursive: true })
const targets = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]
for (const [name, size] of targets) {
  writeFileSync(join(OUT, name), encodePNG(size, renderIcon(size)))
  console.log(`  ✓ ${name} (${size}×${size})`)
}
console.log('Icons generated in public/.')
