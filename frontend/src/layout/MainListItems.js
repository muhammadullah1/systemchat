import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, Divider, Tooltip } from '@mui/material';
import { Home as HomeIcon, Dashboard as DashboardIcon, Person as PersonIcon } from '@mui/icons-material';
import BallotIcon from '@mui/icons-material/Ballot';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import FactoryIcon from '@mui/icons-material/Factory';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link, useLocation } from 'react-router-dom';
import user from '../assets/images/user.png';

const iconTextStyle = { color: '#0c3d17'};
const selectedStyle = { backgroundColor: '#0c3d17', color: '#fff' };

const ListItemLink = ({ to, icon, primary, tooltip, drawerOpen }) => {
  const pathname = useLocation().pathname;

  const renderIcon = () => {
    if (!drawerOpen) {
      return (
        <Tooltip title={primary} placement="right">
          <ListItemIcon style={pathname === to ? { ...iconTextStyle, ...selectedStyle } : iconTextStyle}>
            {icon}
          </ListItemIcon>
        </Tooltip>
      );
    } else {
      return (
        <ListItemIcon style={pathname === to ? { ...iconTextStyle, ...selectedStyle } : iconTextStyle}>
          {icon}
        </ListItemIcon>
      );
    }
  };

  return (
    <ListItem
      button
      component={Link}
      to={to}
      style={pathname === to ? selectedStyle : {}}
      className={pathname === to ? 'selected' : ''}
    >
      {renderIcon()}
      <ListItemText primary={primary} style={pathname === to ? { ...iconTextStyle, ...selectedStyle } : iconTextStyle} />
    </ListItem>
  );
};

// Componente de sublista
const SubListItems = () => {
  return (
    <>
      <ListItemLink to="/production-orders" icon={<ReceiptIcon />} primary="Ordens" />
      <ListItemLink to="/production-instructions" icon={<QuizIcon />} primary="Instruções" />
    </>
  );
};

const MainListItems = ({ drawerOpen }) => {
  const [openProduction, setOpenProduction] = useState(false);

  const toggleProduction = () => {
    setOpenProduction(!openProduction);
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {drawerOpen && (
        <>
          <img src={user} alt="user" style={{ height: '120px' }} />
          <p style={{ marginBottom: '20px', marginTop: '5px', color: '#0c3d17' }}>Admin</p>
          <Divider style={{ marginBottom: '20px' }} />
        </>
      )}
      <div>
        <ListItemLink to="/dashboard" icon={<DashboardIcon />} primary="Dashboard" drawerOpen={drawerOpen} />
        <ListItemLink to="/products" icon={<BallotIcon />} primary="Produtos" drawerOpen={drawerOpen} />
        <ListItemLink to="/groups" icon={<AutoAwesomeMotionIcon />} primary="Grupos" drawerOpen={drawerOpen} />
        <ListItem button onClick={toggleProduction}>
          <ListItemIcon style={iconTextStyle}>
            <FactoryIcon />
          </ListItemIcon>
          <ListItemText primary="Produção" style={iconTextStyle} />
          {openProduction ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProduction} timeout="auto" unmountOnExit>
          <SubListItems />
        </Collapse>
        <Divider style={{ margin: '20px 0' }}>ADM</Divider>
        <ListItemLink to="/users" icon={<PersonIcon />} primary="Usuários" drawerOpen={drawerOpen} />
      </div>
    </div>
  );
};

export default MainListItems;
