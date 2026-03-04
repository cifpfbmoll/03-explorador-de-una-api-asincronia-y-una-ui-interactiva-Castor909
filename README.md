[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/NJ448ipO)
# 03- Explorador de una API asincronia y una UI interactiva

- **Descripción del Proyecto**: Una aplicación web que permite a los usuarios buscar y explorar una API pública. Incluye una interfaz simple para ingresar consultas de búsqueda, mostrar resultados en tarjetas, y manejar estados como carga, errores o resultados vacíos. Esto es similar al cliente de Reddit que vimos en clase, pero enfocado en la API de GitHub (o lo que surja) para practicar conceptos como solicitudes HTTP y manejo de datos asíncronos.
- **Objetivo**: Ampliar el conocimiento básico de Angular, idealmente para reforzar habilidades en frontend development, API integration y gestión de estado reactivo usando signals.
- **Requisitos Técnicos**:
  - **Framework**: Angular ~20.3.0, con énfasis en módulos standalone para componentes reutilizables.
  - **Características Principales**: Utiliza signals para actualizaciones reactivas, servicios para lógica de negocio, y plantillas Angular para UI dinámica. Añade `HttpClientModule` para manejar solicitudes API.
  - **Dependencias**: Mantiene paquetes como `@angular/core` y `rxjs`; incluye `@angular/common/http` para API calls. Usa versiones compatibles con el proyecto actual para evitar conflictos.
  - **API**: GitHub API REST (e.g., `https://api.github.com/search/repositories`), que es gratuita y no requiere autenticación para consultas públicas. Las opciones son diversas: Spotify, Facebook, Instagram, TikTok, Shazam, Youtube, Codewars, etc. Como hemos visto en clase, y por aportación unánime, también podréis utilizar API de Guild Wars 2 o League of Legends.
- **Estructura del Proyecto**:
  - **Componentes**: Incluye un componente principal como `repo-list.component.ts` (similar a [subreddit-column.component.ts](/reddit-client/src/app/components/subreddit-column.component.ts:0:0-0:0)), con subcomponentes para detalles de repositorios. Añade un `search-bar.component.ts` para la entrada de usuario.
  - **Servicios**: Un `github.service.ts` (por ejemplo) que encapsula llamadas API, con métodos como `searchRepositories(query: string)` para devolver datos en formato observable.
  - **Plantillas**: Usa directivas como `@if`, `@for` y eventos para una UI interactiva, con estilos CSS para una apariencia moderna (p. ej., usando clases como `column`, `loading`).
- **Detalles de la API**: Debes usar, por ejemplo, el endpoint `GET /search/repositories` con parámetros como `q` para la consulta. Ejemplo de llamada: `this.http.get('https://api.github.com/search/repositories', { params: { q: query } })`. Enfatiza el manejo de errores HTTP (e.g., códigos 403 para límites de tasa) y la transformación de respuestas.
- **Características Adicionales**: Para enriquecer el proyecto, sugiero agregar:
  - Filtrado de repositorios (por ejemplo por lenguaje o estrellas). La mayoría de APIs que os proprongo tienen algún sistema similar.
  - Un componente para mostrar detalles de la información al hacer clic.
  - Integración con notificaciones usando signals para actualizaciones en tiempo real.
 
  # Formato de entrega:

  - Vuestra propuesta de proyecto y documentación del mismo.
  - Para la generación de la documentación está permitida el uso (pero no el abuso) de algunas IAs siempre y cuando reviséis lo que entregáis.
  - El código fuente del proyecto en este repo.
  - Algunas imágenes del funcionamiento de vuestro proyecto en local o en github pages (esto último es totalmente voluntario).
 
 # Fecha de entrega

  - El lunes 3 de noviembre a las 23:59 h.
  - Tened en cuenta la penalización establecida como es habitual.

  ---

  # Project Proposal (English)

  ## Project Title
  GitHub Explorer — Async API Search with an Interactive UI

  ## Goal
  Build a standalone Angular application that allows users to search public GitHub repositories and explore results with a clean, reactive interface.

  ## Implemented Stack
  - Angular 20 (standalone components)
  - Signals for reactive UI state
  - HttpClient for API requests
  - RxJS for async flow and error handling

  ## Implemented Features
  - Search input to query GitHub repositories.
  - API integration with `GET https://api.github.com/search/repositories`.
  - Loading state with spinner while request is in progress.
  - Error state handling (network issues, invalid query, and API rate limit errors such as HTTP 403).
  - Empty initial state and explicit “no results” state after a search.
  - Repository cards showing:
    - repository name and owner,
    - stars, forks, watchers, open issues,
    - description and topics,
    - quick actions to open the repository/owner profile.
  - Optional filters:
    - programming language,
    - minimum stars.

  ## Project Structure
  - `github-explorer/src/app/components/search-bar/*` → search + filters UI.
  - `github-explorer/src/app/components/repository-list/*` → loading/error/empty/results states.
  - `github-explorer/src/app/components/repository-card/*` → repository detail card.
  - `github-explorer/src/app/services/github.service.ts` → API calls and state signals.
  - `github-explorer/src/app/models/repository.model.ts` → typed response models.

  ## Run Locally (CachyOS / Linux)
  1. Open terminal in project root:
    - `cd github-explorer`
  2. Install dependencies:
    - `npm install`
  3. Run development server:
    - `npm start`
  4. Open browser at:
    - `http://localhost:4200`

  ## Build
  - `npm run build`

  Build validated successfully in this environment.

  ## Screenshot Checklist (for submission)
  - [ ] Home screen before searching (empty initial state).
  - [ ] Search in progress (loading spinner visible).
  - [ ] Search results list with several repository cards.
  - [ ] Filter panel open (language and minimum stars).
  - [ ] “No results” state with a query that returns nothing.
  - [ ] Error state example (rate limit or invalid query response).

  ## Deploy to GitHub Pages

  ### 1) Install deployment helper
  - `cd github-explorer`
  - `npm install --save-dev angular-cli-ghpages`

  ### 2) Build for GitHub Pages
  Replace `<REPO_NAME>` with your repository name.
  - `npm run build -- --configuration production --base-href /<REPO_NAME>/`

  ### 3) Publish to `gh-pages`
  - `npx angular-cli-ghpages --dir=dist/github-explorer/browser`

  ### 4) Enable Pages in GitHub
  - Go to repository **Settings → Pages**.
  - Set **Source** to `Deploy from a branch`.
  - Select branch `gh-pages` and folder `/ (root)`.

  ### 5) Open deployed site
  - `https://<GITHUB_USERNAME>.github.io/<REPO_NAME>/`

  ### Quick command (after first setup)
  - `cd github-explorer && npm run deploy`
