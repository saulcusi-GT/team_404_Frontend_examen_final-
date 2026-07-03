# Team404 Turismo Frontend

Proyecto base para una landing page de turismo construida con React + Vite.

## Stack

- React
- Vite
- CSS puro por componente
- Axios preparado para consumir un backend Spring Boot

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Estructura

Cada seccion tiene su propia carpeta dentro de `src/components`.

```text
src/
  assets/
    icons/
    images/
    videos/
  components/
    Navbar/
    Hero/
    Historia/
    Lugares/
    Gastronomia/
    Galeria/
    Contacto/
    Footer/
  constants/
  hooks/
  services/
    api.js
  utils/
```

## Regla de trabajo

Cada integrante debe modificar solo los archivos de su seccion:

- `NombreComponente.jsx`
- `NombreComponente.css`

No deberia ser necesario modificar `App.jsx`, `main.jsx`, servicios ni configuracion general.

## Variables de entorno

```env
VITE_API_URL=
```
