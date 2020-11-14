import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import "./styles.scss";
import AuthWrapper from "../authWrapper";
import FormInput from "../forms/form-input";
import Buttons from "../forms/button";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAuthFormms, resetPassword } from "../../redux/user/user.actions";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const EmailPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (resetPasswordSuccess) {
      resetForm();
      dispatch(resetAllAuthFormms());
      props.history.push('/login');
    }
  }, [dispatch, props.history, resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  const resetForm = () => {
    setEmail("");
    setErrors([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(resetPassword({ email }));
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

export default withRouter(EmailPassword);
