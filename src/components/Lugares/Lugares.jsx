import { useEffect, useState } from "react";
import "./Lugares.css";

function Lugares() {
  const [lugares, setLugares] = useState([]);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const cargarLugares = async () => {
      try {
        const response = await fetch(
          "https://team-404-backend-examen-final.onrender.com/api/lugares"
        );

        const resultado = await response.json();

        setLugares(resultado.data);
      } catch (error) {
        console.error("Error cargando lugares:", error);
      }
    };

    cargarLugares();
  }, []);

  useEffect(() => {
    if (lugares.length === 0) return;

    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % lugares.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [lugares]);

  const siguiente = () => {
    setActual((prev) => (prev + 1) % lugares.length);
  };

  const anterior = () => {
    setActual((prev) =>
      prev === 0 ? lugares.length - 1 : prev - 1
    );
  };

  if (lugares.length === 0) {
    return (
      <section className="lugares">
        <div className="lugares__container">
          <h2 className="section__title">
            Lugares Turísticos
          </h2>
          <p style={{ textAlign: "center" }}>
            No existen lugares registrados.
          </p>
        </div>
      </section>
    );
  }

  const lugar = lugares[actual];

  return (
    <section className="lugares">
      <div className="lugares__container">

        <h2 className="section__title">
          Lugares Turísticos
        </h2>

        <div className="carousel">

          <button
            className="flecha izquierda"
            onClick={anterior}
          >
            &#10094;
          </button>

          <div className="lugar-card">

            <div className="estrellas">
              ★★★★★
            </div>

            <p className="descripcion">
              "{lugar.descripcion}"
            </p>

            <h3>{lugar.nombre}</h3>

            <span>{lugar.ubicacion}</span>

          </div>

          <button
            className="flecha derecha"
            onClick={siguiente}
          >
            &#10095;
          </button>

        </div>

        <div className="indicadores">

          {lugares.map((_, index) => (
            <span
              key={index}
              className={
                index === actual
                  ? "dot activo"
                  : "dot"
              }
              onClick={() => setActual(index)}
            ></span>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Lugares;