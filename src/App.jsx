import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './firebase'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Planos from './pages/Planos'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import PlanoDetalhes from './pages/PlanoDetalhes'
import Checkout from './pages/Checkout'
import Conta from './pages/Conta'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
      setCarregando(false)
    })

    return () => unsubscribe()
  }, [])

  if (carregando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2eb] dark:bg-[#181411]">
        <p className="text-[#2d1f16] dark:text-white text-2xl font-bold">
          Carregando Grão Nômade...
        </p>
      </main>
    )
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          usuario={usuario}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/login" element={<Login usuario={usuario} />} />
          <Route path="/cadastro" element={<Cadastro usuario={usuario} />} />
          <Route path="/planos/:id" element={<PlanoDetalhes />} />
          <Route path="/checkout" element={<Checkout usuario={usuario} />} />
          <Route path="/conta" element={<Conta usuario={usuario} />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}