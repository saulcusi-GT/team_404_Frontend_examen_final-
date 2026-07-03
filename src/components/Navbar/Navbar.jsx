import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__container" aria-label="Navegacion principal">
        <a className="navbar__brand" href="#inicio">
          <span className="navbar__brand-mark" aria-hidden="true">
            <span></span>
          </span>
          <span className="navbar__brand-text">
            <strong>POTOSI</strong>
            <small>Turismo patrimonial</small>
          </span>
        </a>

        <ul className="navbar__links">
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#historia">Historia</a>
          </li>
          <li>
            <a href="#lugares">Lugares</a>
          </li>
          <li>
            <a href="#gastronomia">Gastronomia</a>
          </li>
          <li>
            <a href="#galeria">Galeria</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
