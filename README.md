# Ayuda para mi Web

Sitio web de contenidos sobre desarrollo web, SEO, herramientas y experimentos.

## Stack técnico

- **Node.js + Express** para servir vistas EJS y rutas.
- **EJS** para plantillas de páginas.
- **Assets estáticos** en `public/`.
- **Build estático** para despliegue tipo GitHub Pages mediante `scripts/build-pages.js`.

## Scripts

- `npm start`: arranca el servidor en modo Node.
- `npm run start:static`: arranca el servidor en modo estático.
- `npm run build:pages`: genera la versión estática en `dist/`.
- `npm run build:static`: build estático alternativo.

## Resolución de conflictos (GitHub)

Si GitHub no te deja resolver conflictos desde la UI, hazlo en local:

1. Trae los últimos cambios de la rama destino (por ejemplo `main`):
   - `git fetch origin`
2. Cambia a tu rama de trabajo:
   - `git checkout <tu-rama>`
3. Rebase recomendado (historial limpio):
   - `git rebase origin/main`
4. Si hay conflictos, resuélvelos en archivos, añade cambios y continúa:
   - `git add <archivo>`
   - `git rebase --continue`
5. Repite hasta terminar el rebase y ejecuta comprobaciones:
   - `npm run build:pages`
6. Sube la rama actualizada:
   - `git push --force-with-lease`

Si prefieres merge en vez de rebase:
- `git merge origin/main`
- resolver conflictos + `git add .` + `git commit`
- `git push`

## Estructura principal

- `index.js`: servidor y routing principal.
- `routes.js`: definición central de rutas.
- `views/`: plantillas EJS (páginas, artículos, parciales, autores).
- `public/`: CSS, JS, imágenes y fuentes.
- `scripts/`: utilidades de build.

## Autor

**Sucender**
- Web: <https://www.ayudaparamiweb.com/>
- Email: <mailto:sucender@gmail.com>
- X/Twitter: <https://twitter.com/ayudaparamiweb>
- GitHub: <https://github.com/ayudaparamiweb>

## Estado actual

El proyecto incluye:
- Rejillas de listado de artículos en dos columnas.
- Página de tags (`/tags`) y navegación por etiquetas.
- Página de autor con listado de artículos.
- Sistema de consentimiento de cookies para analíticas.
