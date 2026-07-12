import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './pages/MainLayout'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App