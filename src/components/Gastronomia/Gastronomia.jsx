import './Gastronomia.css'

import kalapurka from '../../assets/gastronomia/kalapurka.jpg'
import kallu from '../../assets/gastronomia/kallu.jpg'
import Chicharron from '../../assets/gastronomia/Chicharron.jpg'

const platos = [
  {
    id: 1,
    nombre: "Kalapurka",
    descripcion:
      "Sopa tradicional potosina preparada con carne, maíz, papa y servida sobre una piedra caliente.",
    imagen:
      kalapurka,
  },
  {
    id: 2,
    nombre: "K'allu",
    descripcion:
      "Plato típico elaborado con carne, papa, queso fresco, habas y mote.",
    imagen:
      kallu,
  },
  {
    id: 3,
    nombre: "Chicharrón",
    descripcion:
      "Carne de cerdo frita acompañada de mote, papa y llajua tradicional.",
    imagen:
      Chicharron,
  }
]

function Gastronomia() {
  return (
    <section className="section gastronomia" id="gastronomia">
      <div className="section__container">

        <h2 className="section__title">
          Gastronomía Típica
        </h2>

        <p className="gastronomia__texto">
          Descubre algunos de los platos más representativos de la gastronomía boliviana y potosina.
        </p>

        <div className="gastronomia__cards">

          {platos.map((plato) => (
            <div className="gastronomia__card" key={plato.id}>

              <img
                src={plato.imagen}
                alt={plato.nombre}
                className="gastronomia__img"
              />

              <div className="gastronomia__contenido">
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Gastronomia