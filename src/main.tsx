import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: `${import.meta.env.VITE_COGNITO_AUTHORITY}`,
  client_id: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`,
  redirect_uri: "http://localhost:5173/",
   post_logout_redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "phone openid email",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
