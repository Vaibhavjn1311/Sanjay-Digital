import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './components/Pages/Home';
import Products from './components/Pages/Products';
import ProductDetail from './components/Pages/ProductDetail';
import Categories from './components/Pages/Categories';
import Contact from './components/Pages/Contact';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductForm from './components/Admin/ProductForm';
import CategoryManager from './components/Admin/CategoryManager';
import PrivateRoute from './components/Common/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/products/new" element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } />
            <Route path="/admin/products/:id/edit" element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } />
            <Route path="/admin/categories" element={
              <PrivateRoute>
                <CategoryManager />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
