import { useEffect, useState } from 'react'
import './Galeria.css'
import api from '../../services/api'
import { resolveAssetUrl } from '../../utils/resolveAssetUrl'

function Galeria() {
  const [imagenes, setImagenes] = useState([])
  const [actual, setActual] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/galeria')
        setImagenes(response.data.data || [])
      } catch (error) {
        console.error('Error cargando galeria:', error)
        setError('No se pudo cargar la galeria.')
      } finally {
        setLoading(false)
      }
    }

    obtenerImagenes()
  }, [])

  useEffect(() => {
    if (imagenes.length === 0) return

    const intervalo = setInterval(() => {
      setActual((prev) => {
        const nuevo = prev + 3
        return nuevo >= imagenes.length ? 0 : nuevo
      })
    }, 5000)

    return () => clearInterval(intervalo)
  }, [imagenes])

  const siguiente = () => {
    setActual((prev) => {
      const nuevo = prev + 3
      return nuevo >= imagenes.length ? 0 : nuevo
    })
  }

  const anterior = () => {
    setActual((prev) => {
      const nuevo = prev - 3
      return nuevo < 0 ? Math.max(imagenes.length - 3, 0) : nuevo
    })
  }

  if (loading || error || imagenes.length === 0) {
    return (
      <section className="galeria" id="galeria">
        <div className="galeria__container">
          <h2 className="section__title">Potosi Patrimonial y Natural</h2>
          <p className="galeria__status">
            {loading ? 'Cargando galeria...' : error || 'No existen imagenes registradas.'}
          </p>
        </div>
      </section>
    )
  }

  const visibles = imagenes.slice(actual, actual + 3)

  return (
    <section className="galeria" id="galeria">
      <div className="galeria__container">
        <h2 className="section__title">Potosi Patrimonial y Natural</h2>

        <div className="carousel">
          <button className="flecha izquierda" onClick={anterior} aria-label="Imagenes anteriores">
            &#10094;
          </button>

          <div className="contenedor-imagenes">
            {visibles.map((img) => (
              <div className="imagen-card" key={img.id}>
                <img src={resolveAssetUrl(img.imagenUrl)} alt={img.titulo} />
              </div>
            ))}
          </div>

          <button className="flecha derecha" onClick={siguiente} aria-label="Siguientes imagenes">
            &#10095;
          </button>
        </div>

        <div className="indicadores">
          {Array.from({
            length: Math.ceil(imagenes.length / 3),
          }).map((_, index) => (
            <button
              type="button"
              key={index}
              className={index === Math.floor(actual / 3) ? 'dot activo' : 'dot'}
              onClick={() => setActual(index * 3)}
              aria-label={`Ver grupo de imagenes ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Galeria
