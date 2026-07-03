// El backend guarda rutas relativas de imagen, ej: "/images/salar-uyuni-hero.jpeg"
// Este helper arma la URL completa apuntando al backend (no al frontend).
const apiUrl = import.meta.env.VITE_API_URL || ''

// Quita el "/api" final para obtener el origen puro del backend
export const backendOrigin = apiUrl.replace(/\/api\/?$/, '')

export function resolveAssetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${backendOrigin}${path.startsWith('/') ? '' : '/'}${path}`
}
