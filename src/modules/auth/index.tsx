import React from 'react';

const Login = React.lazy(() => import('./components/LoginForm'));
const Register = React.lazy(() => import('./components/Register'));

export { Login, Register };

