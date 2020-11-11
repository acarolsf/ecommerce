import React, { useState } from "react";
import { auth } from "../../firebase/utils";
import { withRouter } from "react-router-dom";

import "./styles.scss";
import AuthWrapper from "../authWrapper";
import FormInput from "../forms/form-input";
import Buttons from "../forms/button";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const resetForm = () => {
    setEmail("");
    setErrors([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log("Password Reset");
          props.history.push("/login");
        })
        .catch(() => {
          console.log("Something went wrong");
          const err = ["Email not found. Please try again."];
          setErrors(err);
        });
    } catch (err) {
      console.log(err);
    }

    resetForm();
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
