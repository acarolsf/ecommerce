import React, { Component } from 'react';
import { auth } from '../../firebase/utils';
import { withRouter } from 'react-router-dom';

import './styles.scss';
import AuthWrapper from "../authWrapper";
import FormInput from '../forms/form-input';
import Buttons from '../forms/button';


const initialState = {
    email: '',
    errors: []
};

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        ...initialState,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value,
        });
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { email } = this.state;
            const config = {
                url: 'http://localhost:3000/login'
            };
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log('Password Reset');
                    this.props.history.push('/login');
                })
                .catch(() => {
                    console.log('Something went wrong');
                    const err = ["Email not found. Please try again."];
                    this.setState({
                        errors: err
                    });
                });
        } catch (err) {
            console.log(err)
        }

        this.setState({
            ...initialState
        });
    }


    render() {

        const {
            email,
            errors
          } = this.state;
      
          const configAuthWrapper = {
            headline: 'Forgot Password',
          };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return(
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <form onSubmit={this.handleFormSubmit}>

                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={this.handleChange}
                        />

                        <Buttons type="submit">Send</Buttons>
                    </form>
                </div>
            </AuthWrapper>

        );
    }
}

export default withRouter(EmailPassword);