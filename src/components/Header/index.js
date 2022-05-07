import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Nav } from './styled';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const clickedButton = useSelector((state) => state.example.clickedButton);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="">
        <FaSignInAlt size={24} />
      </Link>
      {clickedButton ? 'Clicked' : 'Not clicked'}
    </Nav>
  );
}
