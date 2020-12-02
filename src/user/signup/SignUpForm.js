import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../css/SignUp.css';
import validate from '../../validator/index';

import GlobalContext from '../../store/GlobalContext';

const SignUpForm = () => {

    const [verified, setVerified] = useState({ name: false, email: false, password: false });
    const [userData, setUserData] = useState({ name: "", email: "", password: "", });
    const [inputValidation, setInputValidation] = useState([{ inputClass: "input is-primary", helperText: "Full Name: eg. John Doe", helperClass: "help is-warning" }, { inputClass: "input is-primary", helperText: "Enter a valid email", helperClass: "help is-warning", rightIcon: "fas fa-check" }, { inputClass: "input is-primary", helperText: "Password must be atleast 6 digits long", helperClass: "help is-warning" }])
    const [btnDisabled, setBtnDisabled] = useState(true);

    const { state, signup } = useContext(GlobalContext);

    const isFirstRun = useRef(true);

    // monitoring userData for changes!
    useEffect(() => {
        if (isFirstRun.current) return;

        validate("name", userData.name).then(result => {
            setInputValidation(inputValidation => [{ inputClass: "input is-primary", helperText: "", helperClass: "help is-success" }, { ...inputValidation[1] }, { ...inputValidation[2] }])
            setVerified(verified => ({ ...verified, name: true }));
        }).catch(error => {
            setInputValidation(inputValidation => [{ inputClass: "input is-danger", helperText: error.errorMessage, helperClass: "help is-danger" }, { ...inputValidation[1] }, { ...inputValidation[2] }])
            setVerified(verified => ({ ...verified, name: false }));
        });

    }, [userData.name]);

    useEffect(() => {
        if (isFirstRun.current) return;

        validate("email", userData.email).then(result => {
            setInputValidation(inputValidation => [{ ...inputValidation[0] }, { inputClass: "input is-primary", helperText: "", helperClass: "help is-success", rightIcon: "fas fa-check" }, { ...inputValidation[2] }])
            setVerified(verified => ({ ...verified, email: true }));
        }).catch(error => {
            setInputValidation(inputValidation => [{ ...inputValidation[0] }, { inputClass: "input is-danger", helperText: error.errorMessage, helperClass: "help is-danger", rightIcon: "fas fa-exclamation-triangle" }, { ...inputValidation[2] }])
            setVerified(verified => ({ ...verified, email: false }));
        });

    }, [userData.email]);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        validate("password", userData.password).then(result => {
            setInputValidation(inputValidation => [{ ...inputValidation[0] }, { ...inputValidation[1] }, { inputClass: "input is-primary", helperText: "", helperClass: "help is-warning" }])
            setVerified(verified => ({ ...verified, password: true }));
        }).catch(error => {
            setInputValidation(inputValidation => [{ ...inputValidation[0] }, { ...inputValidation[1] }, { inputClass: "input is-danger", helperText: error.errorMessage, helperClass: "help is-danger" }])
            setVerified(verified => ({ ...verified, password: false }));
        });

    }, [userData.password]);

    // methods
    const signUp = (event) => {
        event.preventDefault();
        // console.log("clickeddddd");
        if(verified.name && verified.email && verified.password) {
            // console.log(state);
            signup(userData);
        }
    }

    return (
        <div className="signup-form box column">
            <div style={{ padding: 30 + "px" }}>

                <div className="each-field">
                    <label className="label">Full Name</label>
                    <div>
                        <input
                            value={userData.name}
                            onChange={event => {
                                setUserData({ ...userData, name: event.target.value });
                            }}
                            type="text"
                            className={inputValidation[0].inputClass}
                            placeholder="John Doe" />
                    </div>
                    <p className={inputValidation[0].helperClass}>{inputValidation[0].helperText}</p>
                </div>

                <div className="each-field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            value={userData.email}
                            onChange={event => {
                                //console.log(userData.name);
                                setUserData({ ...userData, email: event.target.value })
                            }}
                            type="email"
                            className={inputValidation[1].inputClass}
                            placeholder="example@domain.com" />

                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>

                        <span className="icon is-small is-right">
                            <i className={inputValidation[1].rightIcon}></i>
                        </span>
                    </div>
                    <p className={inputValidation[1].helperClass}>{inputValidation[1].helperText}</p>
                </div>

                <div className="each-field">
                    <label className="label">Password</label>
                    <div>
                        <input
                            value={userData.password}
                            onChange={event => {
                                setUserData({ ...userData, password: event.target.value })
                            }}
                            type="password"
                            className={inputValidation[2].inputClass} />
                    </div>
                    <p className={inputValidation[2].helperClass}>{inputValidation[2].helperText}</p>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" onClick={() => setBtnDisabled(!btnDisabled)} style={{ marginRight: 10 + "px", marginBottom: 25 + "px" }} />
                                            I agree to the <a href="www.textspro.com">terms and conditions</a>
                        </label>
                    </div>
                </div>

                <button onClick={event => signUp(event)} disabled={btnDisabled} className="button signup-btn is-primary is-rounded">Sign up</button>
            </div>
        </div>
    )
}

export default SignUpForm;
