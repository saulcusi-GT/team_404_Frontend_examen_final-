import { useEffect, useState } from 'react'
import './Lugares.css'
import api from '../../services/api'

function Lugares() {
  const [lugares, setLugares] = useState([])
  const [actual, setActual] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarLugares = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get('/lugares')
        setLugares(response.data.data || [])
      } catch (error) {
        console.error('Error cargando lugares:', error)
        setError('No se pudo cargar lugares turisticos.')
      } finally {
        setLoading(false)
      }
    }

    cargarLugares()
  }, [])

  useEffect(() => {
    if (lugares.length === 0) return

    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % lugares.length)
    }, 5000)

    return () => clearInterval(intervalo)
  }, [lugares])

  const siguiente = () => {
    setActual((prev) => (prev + 1) % lugares.length)
  }

  const anterior = () => {
    setActual((prev) => (prev === 0 ? lugares.length - 1 : prev - 1))
  }

  if (loading || error || lugares.length === 0) {
    return (
      <section className="lugares" id="lugares">
        <div className="lugares__container">
          <h2 className="section__title">Lugares Turisticos</h2>
          <p className="lugares__status">
            {loading ? 'Cargando lugares...' : error || 'No existen lugares registrados.'}
          </p>
        </div>
      </section>
    )
  }

  const lugar = lugares[actual]

  return (
    <section className="lugares" id="lugares">
      <div className="lugares__container">
        <h2 className="section__title">Lugares Turisticos</h2>

        <div className="carousel">
          <button className="flecha izquierda" onClick={anterior} aria-label="Lugar anterior">
            &#10094;
          </button>

          <div className="lugar-card">
            <div className="estrellas" aria-hidden="true">
              *****
            </div>

            <p className="descripcion">"{lugar.descripcion}"</p>
            <h3>{lugar.nombre}</h3>
            <span>{lugar.ubicacion}</span>
          </div>

          <button className="flecha derecha" onClick={siguiente} aria-label="Siguiente lugar">
            &#10095;
          </button>
        </div>

        <div className="indicadores">
          {lugares.map((_, index) => (
            <button
              type="button"
              key={index}
              className={index === actual ? 'dot activo' : 'dot'}
              onClick={() => setActual(index)}
              aria-label={`Ver lugar ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Lugares
