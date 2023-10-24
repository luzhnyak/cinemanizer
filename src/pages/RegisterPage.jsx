import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import FormAuth from 'components/FormAuth/FormAuth';
import { setUser } from 'redux/userSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = ({ email, password }) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
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
      <h1>Register</h1>
      <FormAuth onSubmit={handleRegister} />
    </>
  );
};

export default RegisterPage;
