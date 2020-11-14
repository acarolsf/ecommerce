import React, { useEffect, useState } from "react";
import FormInput from "../forms/form-input";
import Button from "./../../components/forms/button";

import "./styles.scss";
import AuthWrapper from "../authWrapper";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAuthFormms, signUpUser } from "../../redux/user/user.actions";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
});

const Signup = props => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAllAuthFormms());
      props.history.push('/');
    }
  }, [dispatch, props.history, signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUpUser({
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

export default withRouter(Signup);
