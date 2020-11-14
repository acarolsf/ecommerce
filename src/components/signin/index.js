import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './styles.scss';
import Buttons from './../forms/button';
import FormInput from '../forms/form-input';
import AuthWrapper from './../authWrapper';

import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signInWithGoogle, resetAllAuthFormms } from '../../redux/user/user.actions';

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
});

const SignIn = props => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthFormms());
      props.history.push('/');
    }
  }, [dispatch, props.history, signInSuccess]);
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInUser(email, password));    
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  }

    const configAuthWrapper = {
      headline: 'Login',
    };

    return (
      <AuthWrapper {...configAuthWrapper}>

          <div className="formWrap">
            <form onSubmit={handleSubmit}>

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

              <Buttons type="submit">
                Login
              </Buttons>
              <div className="socialSignIn">
                <div className="row">
                  <Buttons onClick={handleGoogleSignIn}>
                    SignIn with Google
                  </Buttons>
                </div>
              </div>

              <div className="links">
                <Link to='/recovery'>Forgot Password</Link>
              </div>
            </form>
          </div>
        </AuthWrapper>
    );
}

export default withRouter(SignIn);
