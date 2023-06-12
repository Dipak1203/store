import { NavLink, useNavigate } from 'react-router-dom'
import './style.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
// import {useState} from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
// import CategoryIcon from '@mui/icons-material/Category';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload(false);
  };
  const isAuthorized = (requiredRole) => {
    // Replace this with your authorization logic based on the user's role
    const userRole = localStorage.getItem('userRole');
    return userRole === requiredRole;
  };

  return (
    <div className="sidebar">
      
      <h1 className=''>
        <NavLink to="/">SobizPress</NavLink>
      </h1>
      <ul className="sideBar__content">
        <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <DashboardIcon />
          <NavLink to="/dashboard">ड्यासबोर्ड</NavLink>
        </li>
        {isAuthorized('users') && (
          <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ProductionQuantityLimitsIcon />
            <NavLink to="/product">उत्पादन</NavLink>
          </li>
        )}
        {isAuthorized('super_admin') && (
          <>
            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <NavLink to="/wada">वडा</NavLink>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <NavLink to="/category">प्रकार</NavLink>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <NavLink to="/branch">साखा</NavLink>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <GroupAddIcon />
              <NavLink to="/users">प्रयोगकर्ता</NavLink>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <GroupAddIcon />
              <NavLink to="/product">सर समान</NavLink>
            </li>
            {/* <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PostAddIcon />
              <NavLink to="/post">पोस्ट</NavLink>
            </li> */}
          </>
        )}
        {/* <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <RemoveRedEyeIcon />
          <NavLink to="/review">Review</NavLink>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <SettingsIcon />
          <NavLink to="/setting">सेटिङ</NavLink>
        </li> */}
        <li style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <LogoutIcon />
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
