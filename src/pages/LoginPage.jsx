import FormAuth from 'components/FormAuth/FormAuth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'redux/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            token: user.accessToken,
          })
        );

        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <h1>Login</h1>
      <FormAuth onSubmit={handleLogin} />
    </>
  );
};

export default LoginPage;
