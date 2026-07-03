import { useEffect, useState } from 'react'

/**
 * Hook genérico para consumir la API.
 * @param {() => Promise<any>} fetcher función que devuelve una promesa (ej: api.get(...).then(r => r.data))
 * @param {Array} deps dependencias para volver a ejecutar el fetch
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reinicio intencional al reejecutar el fetch
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((err) => {
        if (active) setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error, setData }
}
