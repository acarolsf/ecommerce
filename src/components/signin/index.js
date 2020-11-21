import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

import './styles.scss';
import Buttons from './../forms/button';
import FormInput from '../forms/form-input';
import AuthWrapper from './../authWrapper';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }
  }, [currentUser, history]);
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
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

export default SignIn;
