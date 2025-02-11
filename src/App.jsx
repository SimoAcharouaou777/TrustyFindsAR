import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import Home from './Pages/Home'
import Products from './Pages/Products'
import { Contact } from './Pages/Contact'
import ProductDetails from './Pages/ProductDetails'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}