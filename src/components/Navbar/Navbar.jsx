import './Navbar.css'

const navLinks = [
  { label: 'Inicio', targetId: 'inicio' },
  { label: 'Historia', targetId: 'historia' },
  { label: 'Lugares', targetId: 'lugares' },
  { label: 'Gastronomia', targetId: 'gastronomia' },
  { label: 'Galeria', targetId: 'galeria' },
  { label: 'Contacto', targetId: 'contacto' },
]

function Navbar() {
  function handleNavClick(event, targetId) {
    const section = document.getElementById(targetId)

    if (!section) return

    event.preventDefault()

    const navbarHeight = event.currentTarget.closest('.navbar')?.offsetHeight || 0
    const targetTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight - 8

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    })

    window.history.pushState(null, '', `#${targetId}`)
  }

  return (
    <header className="navbar">
      <nav className="navbar__container" aria-label="Navegacion principal">
        <a className="navbar__brand" href="#inicio" onClick={(event) => handleNavClick(event, 'inicio')}>
          <span className="navbar__brand-mark" aria-hidden="true">
            <span></span>
          </span>
          <span className="navbar__brand-text">
            <strong>POTOSI</strong>
            <small>Turismo patrimonial</small>
          </span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.targetId}>
              <a href={`#${link.targetId}`} onClick={(event) => handleNavClick(event, link.targetId)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
