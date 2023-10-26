import React from 'react';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import FormAuth from 'components/FormAuth/FormAuth';
import { setUser } from 'redux/userSlice';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = ({ email, password, name }) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
          // photoURL: 'https://example.com/jane-q-user/profile.jpg',
        })
          .then(() => {
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
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <FormAuth onSubmit={handleRegister} title="Register" isRegister={true} />
    </>
  );
};

export default RegisterPage;
