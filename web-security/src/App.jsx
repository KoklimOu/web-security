import './App.css'
import KLBook from './pages/KLBook/KLBook';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/klbook/:id' element={<KLBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
