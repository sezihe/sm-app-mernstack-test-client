import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import '../../css/SignUp.css';

import SignUpForm from './SignUpForm';
import ErrorAlert from './ErrorAlert';

import GlobalContext from '../../store/GlobalContext';

const SignUp = () => {
    const { state } = useContext(GlobalContext);
    return (
        <div className="signup-main">
            { state._id ? <Redirect to="/confirm" /> : <ErrorAlert /> }
            <div className="columns">
                <div className="column is-three-fifths">
                    <div className="signup-title">
                        <h1 className="title" style={{ color: 'white', fontSize: '40px', fontStyle: 'bold' }}>New here?</h1>
                        <p style={{ color: '#b2bec3' }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                            </p>
                    </div>
                </div>
                <SignUpForm />
            </div>

        </div>
    );
}

export default SignUp;