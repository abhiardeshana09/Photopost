import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Navbar = () => {
    const onLogout = () => {
        axios.post('http://localhost:5000/users/logout')
            .then(res => {
                console.log(res.data);
                window.location = "/landing";
            })
            .catch(err => console.log(err));
    }

    return (
        <nav>
            <div className="nav-wrapper teal lighten-1">
                <Link to="/posts" className="brand-logo center">Photopost</Link>
                <ul id="nav-mobile" className="left">
                    <li><Link to="/add"><i className="material-icons left">add</i>Create Post</Link></li>
                </ul>
                <ul id="nav-mobile" className="right">
                    <li><a onClick={onLogout}><i className="material-icons right">exit_to_app</i>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;