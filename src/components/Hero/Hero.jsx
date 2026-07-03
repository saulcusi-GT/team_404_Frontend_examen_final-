import './Hero.css'
import api from '../../services/api'
import { useFetch } from '../../hooks/useFetch'
import { resolveAssetUrl } from '../../utils/resolveAssetUrl'

function Hero() {
  const { data: hero, loading, error } = useFetch(
    () => api.get('/hero/principal').then((res) => res.data.data),
    []
  )

  const backgroundStyle = hero?.imagenUrl
    ? { backgroundImage: `url(${resolveAssetUrl(hero.imagenUrl)})` }
    : undefined

  return (
    <section className="hero-section" id="inicio" style={backgroundStyle}>
      <div className="hero-section__overlay" />

      <div className="hero-section__container">
        {loading && <p className="hero-section__status">Cargando...</p>}
        {error && !hero && (
          <p className="hero-section__status hero-section__status--error">
            No se pudo cargar la información del backend. Verifica que esté corriendo en{' '}
            {import.meta.env.VITE_API_URL}.
          </p>
        )}

        {hero && (
          <>
            <p className="hero-section__eyebrow">{hero.textoSuperior}</p>
            <h1 className="hero-section__title">{hero.titulo}</h1>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
