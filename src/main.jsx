import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Providers/AuthProvider.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
   <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
   </AuthProvider>

    </QueryClientProvider>
   
  </StrictMode>,
)
