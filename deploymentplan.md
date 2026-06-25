# Production Deployment Plan

This plan details the necessary modifications to prepare the FizzaStore application for deployment, with the backend hosted on **Render** and the frontend on **Vercel**.

## Proposed Changes

### Backend (Render Deployment)
We need to adjust the Node.js backend to accept cross-origin requests from the Vercel frontend, and ensure environment variables are loaded properly in a production environment.

#### [NEW] Dependency
- **`cors`**: Will install this package in the root directory to handle Cross-Origin Resource Sharing.

#### [MODIFY] `package.json`
- Add a `"start": "node backend/index.js"` script for Render to execute.

#### [MODIFY] `backend/index.js`
- Import and configure `dotenv` directly (`dotenv.config()`) to ensure Render loads environment variables properly, as Render doesn't use the `--env-file` flag natively.

#### [MODIFY] `backend/app.js`
- Import and apply the `cors` middleware. We will configure it to accept requests from a new environment variable `FRONTEND_URL` (with a fallback to localhost for development).

---

### Frontend (Vercel Deployment)
We need to ensure the Vercel-hosted frontend knows how to communicate with the Render-hosted backend, and properly handles React Router navigation.

#### [NEW] `frontend/vercel.json`
- Create this file to configure Vercel's routing rules. This ensures that when a user refreshes a page (like `/products`), Vercel correctly serves the `index.html` file instead of returning a 404 error.

#### [MODIFY] `frontend/src/constant.js`
- Update `BASE_URL` to dynamically read from `import.meta.env.VITE_API_URL || ""`. This allows us to set the Render API URL as an environment variable in the Vercel dashboard without hardcoding it.

## User Review Required

> [!IMPORTANT]
> **Environment Variables on Deployment**
> After these changes are made, you will need to set the following Environment Variables in your deployment dashboards:
> 
> **On Render (Backend):**
> - Add all your existing `.env` variables (MongoDB URI, JWT Secret, Email, API Keys).
> - Add a new variable `FRONTEND_URL` and set it to your Vercel URL once deployed.
> 
> **On Vercel (Frontend):**
> - Add a new variable `VITE_API_URL` and set it to your Render backend URL (e.g., `https://fizzastore-api.onrender.com`).

Please approve this plan so I can begin making these configurations!
