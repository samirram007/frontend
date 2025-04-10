import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import CookieConsent from './components/CookieConsent .tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeContextProvider } from './core/contexts/ThemeContextProvider.tsx'
import './index.css'
import AuthContextProvider from './modules/auth/contexts/AuthContextProvider.tsx'
import { queryClient } from './services/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">

          <Toaster position="top-right" richColors />
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
    <CookieConsent />
  </StrictMode>,
)
