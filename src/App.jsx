import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import Home from './Pages/Home'
import Products from './Pages/Products'
import CategoryPage from "./CategoryPage.jsx";
import { Contact } from './Pages/Contact'
import ProductDetails from './Pages/ProductDetails'
import Gaming from './Pages/Gaming.jsx'

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
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/gaming" element={<Gaming />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}