import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPasswordStart, resetUserState } from "../../redux/user/user.actions";

import "./styles.scss";
import AuthWrapper from "../authWrapper";
import FormInput from "../forms/form-input";
import Buttons from "../forms/button";


const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
});

const EmailPassword = (props) => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push('/login');
    }
  }, [dispatch, history, resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  // const resetForm = () => {
  //   setEmail("");
  //   setErrors([]);
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };
  const configAuthWrapper = {
    headline: "Forgot Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Buttons type="submit">Send</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
