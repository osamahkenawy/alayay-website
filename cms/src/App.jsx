import { useState, useEffect } from 'react'
import { LanguageProvider } from './i18n'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('cms_token'))

  useEffect(() => {
    if (token) localStorage.setItem('cms_token', token)
    else localStorage.removeItem('cms_token')
  }, [token])

  return (
    <LanguageProvider>
      {!token
        ? <Login onLogin={setToken} />
        : <Dashboard token={token} onLogout={() => setToken(null)} />}
    </LanguageProvider>
  )
}
