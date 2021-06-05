import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/user';
import Header from './Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
