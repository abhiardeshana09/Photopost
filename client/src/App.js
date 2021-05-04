import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
    const [isLoading, setLoadingState] = useState(true);

    // Enforce logged-in status
    useEffect(() => {
        axios.get('http://localhost:5000/users/login')
            .then(res => {
                if (!res.data.isLoggedIn && window.location.pathname !== "/landing") {
                    window.location = "/landing";
                } else if (window.location.pathname === "/") {
                    window.location = "/posts";
                } else {
                    setLoadingState(false);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        !isLoading &&
            <Router>
                <Switch>
                    <Route path="/landing">
                        <LandingPage/>
                    </Route>
                    <Route path="/posts">
                        <Navbar/>
                        <PostList/>
                    </Route>
                    <Route path="/add">
                        <Navbar/>
                        <CreatePost/>
                    </Route>
                </Switch>
            </Router>
    );
}

export default App;