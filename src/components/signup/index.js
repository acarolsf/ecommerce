import React, { useEffect, useState } from "react";
import FormInput from "../forms/form-input";
import Button from "./../../components/forms/button";

import "./styles.scss";
import AuthWrapper from "../authWrapper";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "../../redux/user/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const Signup = props => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    console.log('verifica');
    if (currentUser) {
      console.log("verificou");
      resetForm();
      history.push('/');
    }
    console.log('deu erro');
  }, [history, currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  const handleFormSubmit = async (event) => {
    console.log('Clica')
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
  };

    const configAuthWrapper = {
      headline: 'Registration',
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
          <div className="formWrap">
            
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}

            <form onSubmit={handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                handleChange={e => setDisplayName(e.target.value)}
              />

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={e => setEmail(e.target.value)}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={e => setPassword(e.target.value)}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                handleChange={e => setConfirmPassword(e.target.value)}
              />

              <Button type="submit">Register</Button>
            </form>
          </div>
        </AuthWrapper>
    );
}

export default Signup;
