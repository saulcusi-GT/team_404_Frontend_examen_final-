import { useState } from 'react'
import './Departamento.css'
import api from '../../services/api'
import { useFetch } from '../../hooks/useFetch'

const emptyAtractivoForm = { nombre: '', descripcion: '', orden: 1 }

function Departamento() {
  const { data: departamento, loading, error, setData: setDepartamento } = useFetch(
    () => api.get('/departamento/principal').then((res) => res.data.data),
    []
  )

  const [isAddingAtractivo, setIsAddingAtractivo] = useState(false)
  const [atractivoForm, setAtractivoForm] = useState(emptyAtractivoForm)
  const [savingAtractivo, setSavingAtractivo] = useState(false)
  const [atractivoError, setAtractivoError] = useState(null)

  const atractivos = departamento?.atractivos
    ? [...departamento.atractivos].sort((a, b) => a.orden - b.orden)
    : []

  function startAddAtractivo() {
    setAtractivoForm({ nombre: '', descripcion: '', orden: atractivos.length + 1 })
    setAtractivoError(null)
    setIsAddingAtractivo(true)
  }

  function cancelAddAtractivo() {
    setIsAddingAtractivo(false)
    setAtractivoError(null)
  }

  function handleAtractivoChange(event) {
    const { name, value } = event.target
    setAtractivoForm((prev) => ({ ...prev, [name]: name === 'orden' ? Number(value) : value }))
  }

  async function handleAtractivoSubmit(event) {
    event.preventDefault()
    if (!departamento) return

    setSavingAtractivo(true)
    setAtractivoError(null)

    try {
      const res = await api.post(`/departamento/${departamento.id}/atractivos`, atractivoForm)
      setDepartamento(res.data.data)
      cancelAddAtractivo()
    } catch {
      setAtractivoError('No se pudo guardar el atractivo.')
    } finally {
      setSavingAtractivo(false)
    }
  }

  return (
    <section className="section departamento" id="departamento">
      <div className="section__container departamento__container">
        {loading && <p className="section__placeholder departamento__placeholder">Cargando...</p>}
        {error && !departamento && (
          <p className="section__placeholder departamento__placeholder">
            No se pudo cargar la información del backend. Verifica que esté corriendo en{' '}
            {import.meta.env.VITE_API_URL}.
          </p>
        )}

        {departamento && (
          <>
            <h2 className="section__title departamento__title">{departamento.titulo}</h2>
            <p className="departamento__intro">{departamento.introduccion}</p>

            <ul className="departamento__lista">
              {atractivos.map((atractivo) => (
                <li key={atractivo.id} className="departamento__item">
                  <span className="departamento__check" aria-hidden="true">
                    ✓
                  </span>
                  <p className="departamento__item-texto">
                    <strong>{atractivo.nombre}, </strong>
                    {atractivo.descripcion}
                  </p>
                </li>
              ))}
            </ul>

            {isAddingAtractivo ? (
              <form className="departamento__form" onSubmit={handleAtractivoSubmit}>
                <label>
                  Nombre
                  <input
                    name="nombre"
                    value={atractivoForm.nombre}
                    onChange={handleAtractivoChange}
                    required
                  />
                </label>
                <label>
                  Descripcion
                  <textarea
                    name="descripcion"
                    value={atractivoForm.descripcion}
                    onChange={handleAtractivoChange}
                    rows={3}
                    required
                  />
                </label>
                <label>
                  Orden
                  <input
                    type="number"
                    name="orden"
                    value={atractivoForm.orden}
                    onChange={handleAtractivoChange}
                    min={1}
                    required
                  />
                </label>

                {atractivoError && <p className="departamento__error">{atractivoError}</p>}

                <div className="departamento__actions">
                  <button type="submit" className="btn btn--light" disabled={savingAtractivo}>
                    {savingAtractivo ? 'Guardando...' : 'Agregar'}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={cancelAddAtractivo}
                    disabled={savingAtractivo}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="departamento__actions">
                <button type="button" className="btn btn--light" onClick={startAddAtractivo}>
                  Agregar atractivo
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Departamento
