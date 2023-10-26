import FormAuth from 'components/FormAuth/FormAuth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'redux/userSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;

        dispatch(
          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            token: user.accessToken,
          })
        );
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <FormAuth onSubmit={handleLogin} title="Login" isRegister={false} />
    </>
  );
};

export default LoginPage;
