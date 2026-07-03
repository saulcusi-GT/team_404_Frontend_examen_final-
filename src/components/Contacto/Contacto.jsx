import './Contacto.css'

function Contacto() {
  const contactItems = [
    {
      icon: 'M',
      title: 'Email',
      text: 'info@potositurismo.bo',
      href: 'mailto:info@potositurismo.bo',
    },
    {
      icon: 'T',
      title: 'Telefono',
      text: '+591 2 622 3456',
      href: 'tel:+59126223456',
    },
    {
      icon: 'F',
      title: 'Fax',
      text: '+591 2 622 1933',
    },
    {
      icon: 'D',
      title: 'Direccion',
      text: 'Plaza 10 de Noviembre, Centro Historico, Potosi',
    },
  ]

  const socialLinks = [
    { label: 'Facebook', icon: 'F', href: 'https://www.facebook.com/' },
    { label: 'YouTube', icon: 'Y', href: 'https://www.youtube.com/' },
    { label: 'Pagina Web', icon: 'W', href: 'https://www.potosi.bo/' },
    { label: 'Instagram', icon: 'I', href: 'https://www.instagram.com/' },
    { label: 'Telefono', icon: 'T', href: 'tel:+59126223456' },
  ]

  return (
    <section className="section contacto" id="contacto">
      <div className="section__container contacto__container">
        <div className="contacto__panel">
          <div className="contacto__institution">
            <h2 className="contacto__title">CONTACTOS</h2>
            <p>Gobierno Autonomo Municipal de Potosi</p>
            <p>Direccion Municipal de Turismo</p>
            <p>Informacion turistica y promocion patrimonial</p>
          </div>

          <div className="contacto__details" aria-label="Datos de contacto">
            {contactItems.map((item) => (
              <article className="contacto__item" key={item.title}>
                <span className="contacto__icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  {item.href ? (
                    <a href={item.href}>{item.text}</a>
                  ) : (
                    <p>{item.text}</p>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="contacto__social" aria-label="Redes sociales">
            <div className="contacto__social-links">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">{link.icon}</span>
                  <strong>{link.label}</strong>
                  <small>Potosi Turismo</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
