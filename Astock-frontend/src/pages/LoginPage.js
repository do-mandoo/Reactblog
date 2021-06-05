import React from 'react';
import AuthTemplate from '../component/auth/AuthTemplate';
import LoginForm from '../component/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
