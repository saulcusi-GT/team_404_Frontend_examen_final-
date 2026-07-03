import './Footer.css'

function Footer() {
  const quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Historia', href: '#historia' },
    { label: 'Lugares', href: '#lugares' },
    { label: 'Gastronomia', href: '#gastronomia' },
    { label: 'Contacto', href: '#contacto' },
  ]

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
  ]

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h2>Potosi Turismo</h2>
          <p>Landing turistica cultural de la Villa Imperial de Potosi, Bolivia.</p>
        </div>

        <nav className="footer__nav" aria-label="Enlaces rapidos">
          <h3>Enlaces rapidos</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <h3>Redes sociales</h3>
          <div>
            {socialLinks.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>Copyright 2026 Potosi Turismo. Todos los derechos reservados.</p>
          <p>Desarrollado por Team 404.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
