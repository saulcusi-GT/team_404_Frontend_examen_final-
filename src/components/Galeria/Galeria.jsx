import { useEffect, useState } from "react";
import "./Galeria.css";

function Galeria() {
  const [imagenes, setImagenes] = useState([]);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const response = await fetch("https://team-404-backend-examen-final.onrender.com/api/galeria");

        if (!response.ok) {
          throw new Error("Error al obtener la galería");
        }

        const resultado = await response.json();

        // Como tu API devuelve ApiResponse
        setImagenes(resultado.data);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    obtenerImagenes();
  }, []);

  useEffect(() => {
    if (imagenes.length === 0) return;

    const intervalo = setInterval(() => {
      siguiente();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [imagenes, actual]);

  const siguiente = () => {
    setActual((prev) => {
      const nuevo = prev + 3;
      return nuevo >= imagenes.length ? 0 : nuevo;
    });
  };

  const anterior = () => {
    setActual((prev) => {
      const nuevo = prev - 3;
      return nuevo < 0 ? Math.max(imagenes.length - 3, 0) : nuevo;
    });
  };

  if (imagenes.length === 0) return null;

  const visibles = imagenes.slice(actual, actual + 3);

  return (
    <section className="galeria">

      <div className="galeria__container">

        <h2 className="section__title">
          Potosí Patrimonial y Natural
        </h2>

        <div className="carousel">

          <button
            className="flecha izquierda"
            onClick={anterior}
          >
            &#10094;
          </button>

          <div className="contenedor-imagenes">

            {visibles.map((img) => (

              <div
                className="imagen-card"
                key={img.id}
              >

                <img
                  src={img.imagenUrl}
                  alt={img.titulo}
                />

              </div>

            ))}

          </div>

          <button
            className="flecha derecha"
            onClick={siguiente}
          >
            &#10095;
          </button>

        </div>

        <div className="indicadores">

          {Array.from({
            length: Math.ceil(imagenes.length / 3),
          }).map((_, index) => (

            <span
              key={index}
              className={
                index === Math.floor(actual / 3)
                  ? "dot activo"
                  : "dot"
              }
              onClick={() => setActual(index * 3)}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default Galeria;