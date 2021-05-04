import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Login = ({ setRegisteringState }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        const user = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                if (res.data.loginSuccessful) {
                    window.location = '/posts';
                } else {
                    setErrorMessage('Invalid username/password, please try again');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="card-panel grey lighten-4">
            <div className="center-align">
                <h5><b>Login</b></h5>
            </div>
            <form className="section" onSubmit={onSubmit}>
                <div className="input-field">
                    <input id="username" type="text" value={username} onChange={onChangeUsername}/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                    <input id="password" type="password" value={password} onChange={onChangePassword}/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="row center-align">
                    <p className="red-text">{errorMessage}</p>
                    <button type="submit" className="col s6 offset-s3 btn waves-effect waves-light">Login</button>
                </div>
            </form>
            <div className="row center-align">
                <p>Don't have an account?</p>
                <button className="col s6 offset-s3 btn-small waves-effect waves-light" onClick={() => setRegisteringState(true)}>Register Here</button>
            </div>
        </div>
    );
}

export default Login;