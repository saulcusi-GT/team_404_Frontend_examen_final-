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

  const [formMode, setFormMode] = useState(null)
  const [editingAtractivoId, setEditingAtractivoId] = useState(null)
  const [atractivoForm, setAtractivoForm] = useState(emptyAtractivoForm)
  const [savingAtractivo, setSavingAtractivo] = useState(false)
  const [atractivoError, setAtractivoError] = useState(null)

  const atractivos = departamento?.atractivos
    ? [...departamento.atractivos].sort((a, b) => a.orden - b.orden)
    : []

  function updateAtractivos(nextAtractivos) {
    setDepartamento((prev) => (prev ? { ...prev, atractivos: nextAtractivos } : prev))
  }

  function startAddAtractivo() {
    setAtractivoForm({ nombre: '', descripcion: '', orden: atractivos.length + 1 })
    setEditingAtractivoId(null)
    setAtractivoError(null)
    setFormMode('create')
  }

  function startEditAtractivo(atractivo) {
    setAtractivoForm({
      nombre: atractivo.nombre || '',
      descripcion: atractivo.descripcion || '',
      orden: atractivo.orden || atractivos.length,
    })
    setEditingAtractivoId(atractivo.id)
    setAtractivoError(null)
    setFormMode('edit')
  }

  function cancelAtractivoForm() {
    setFormMode(null)
    setEditingAtractivoId(null)
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
      if (formMode === 'edit') {
        const res = await api.put(`/departamento/atractivos/${editingAtractivoId}`, atractivoForm)
        const updatedDepartamento = res.data.data

        if (updatedDepartamento?.atractivos) {
          setDepartamento(updatedDepartamento)
        } else {
          updateAtractivos(
            atractivos.map((atractivo) =>
              atractivo.id === editingAtractivoId ? { ...atractivo, ...atractivoForm } : atractivo
            )
          )
        }
      } else {
        const res = await api.post(`/departamento/${departamento.id}/atractivos`, atractivoForm)
        setDepartamento(res.data.data)
      }

      cancelAtractivoForm()
    } catch {
      if (formMode === 'edit') {
        updateAtractivos(
          atractivos.map((atractivo) =>
            atractivo.id === editingAtractivoId ? { ...atractivo, ...atractivoForm } : atractivo
          )
        )
        cancelAtractivoForm()
        setAtractivoError('Cambio aplicado solo en pantalla: el backend no respondio al editar.')
      } else {
        updateAtractivos([
          ...atractivos,
          {
            ...atractivoForm,
            id: `temp-${atractivos.length + 1}`,
          },
        ])
        cancelAtractivoForm()
        setAtractivoError('Atractivo agregado solo en pantalla: el backend no respondio.')
      }
    } finally {
      setSavingAtractivo(false)
    }
  }

  async function handleDeleteAtractivo(atractivoId) {
    setSavingAtractivo(true)
    setAtractivoError(null)

    try {
      const res = await api.delete(`/departamento/atractivos/${atractivoId}`)
      const updatedDepartamento = res.data.data

      if (updatedDepartamento?.atractivos) {
        setDepartamento(updatedDepartamento)
      } else {
        updateAtractivos(atractivos.filter((atractivo) => atractivo.id !== atractivoId))
      }

      if (editingAtractivoId === atractivoId) {
        cancelAtractivoForm()
      }
    } catch {
      updateAtractivos(atractivos.filter((atractivo) => atractivo.id !== atractivoId))
      if (editingAtractivoId === atractivoId) {
        cancelAtractivoForm()
      }
      setAtractivoError('Atractivo eliminado solo en pantalla: el backend no respondio.')
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
            No se pudo cargar la informacion del backend. Verifica que este corriendo en{' '}
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
                    &#10003;
                  </span>
                  <div className="departamento__item-content">
                    <p className="departamento__item-texto">
                      <strong>{atractivo.nombre}, </strong>
                      {atractivo.descripcion}
                    </p>
                    <div className="departamento__item-actions">
                      <button
                        type="button"
                        className="btn btn--small btn--ghost"
                        onClick={() => startEditAtractivo(atractivo)}
                        disabled={savingAtractivo}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn--small btn--danger"
                        onClick={() => handleDeleteAtractivo(atractivo.id)}
                        disabled={savingAtractivo}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {formMode ? (
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
                    {savingAtractivo
                      ? 'Guardando...'
                      : formMode === 'edit'
                        ? 'Guardar cambios'
                        : 'Agregar'}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={cancelAtractivoForm}
                    disabled={savingAtractivo}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                {atractivoError && <p className="departamento__error">{atractivoError}</p>}
                <div className="departamento__actions">
                  <button type="button" className="btn btn--light" onClick={startAddAtractivo}>
                    Agregar atractivo
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Departamento
