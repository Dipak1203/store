import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './scenes/dashboard/index';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';
import Wada from './pages/wada/index';
import Category from './pages/category/index';
import Branch from './pages/branch/index';
import Product from './scenes/products/index';
import ProductForm from './forms/product/ProductForm';
import Users from './scenes/users/index';
import UserForm from './forms/users/Users';
import WadaUpdate from './forms/wada/index';
import CategoryUpdate from './forms/category/CategoryForm';
import BranchUpdate from './forms/branch/BranchUpdate';
import Login from './pages/authencation/Login';
import UpdateUsers from './forms/users/UpdateUsers';
import UpdateProduct from './forms/product/UpdateProduct';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true');

    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole || '');
  }, []);

  const isAuthorized = (requiredRole) => {
    if (requiredRole === 'users') {
      return userRole === 'users';
    }
    return userRole === 'super_admin' || userRole === requiredRole;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            {isAuthorized('users') && (
              <Route path="/product" element={<Product />} />
            )}
            {isAuthorized('super_admin') && (
              <>
                <Route path="/wada" element={<Wada />} />
                <Route path="/wada/update/:id" element={<WadaUpdate />} />
                <Route path="/category/update/:id" element={<CategoryUpdate />} />
                <Route path="/branch/update/:id" element={<BranchUpdate />} />
                <Route path="/category" element={<Category />} />
                <Route path="/branch" element={<Branch />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/edit/:id" element={<UpdateUsers />} />
                <Route path="/product" element={<Product />} /> 
                <Route path="/product/edit/:id" element={<UpdateProduct />} /> 
                <Route path="/product/create" element={<ProductForm />} />
                <Route path="/users/create" element={<UserForm />} />
                <Route path="/product/create" element={<ProductForm />} />
              </>
            )}
            <Route path="/*" element={<NotFound />} />
          </>
        )}
      </Routes>
      {isLoggedIn && <Sidebar />}
    </Router>
  );
};

const LoginWrapper = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogin = async (userRole) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userRole);

    setIsLoggedIn(true);
    setUserRole(userRole);

    navigate('/dashboard', { replace: true });
  };

  return <Login onLogin={handleLogin} />;
};

export default App;
