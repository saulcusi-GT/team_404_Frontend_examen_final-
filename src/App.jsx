import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Historia from './components/Historia/Historia'
import Lugares from './components/Lugares/Lugares'
import Gastronomia from './components/Gastronomia/Gastronomia'
import Galeria from './components/Galeria/Galeria'
import Contacto from './components/Contacto/Contacto'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Historia />
        <Lugares />
        <Gastronomia />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
