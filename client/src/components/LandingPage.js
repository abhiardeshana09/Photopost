import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LandingPage = () => {
    const [isRegistering, setRegisteringState] = useState(false);

    return (
        <div style={{ height: '90vh' }} className="row valign-wrapper">
            <div className="col xl3 l4 m5 s6">
                <h2 className="center-align teal-text text-lighten-1">Photopost</h2>
            </div>
            <div className="col xl3 l4 m5 s6 pull-xl3 pull-l2 pull-m1">
                {!isRegistering
                  ? <Login setRegisteringState={setRegisteringState}/>
                  : <Register/>
                }
            </div>
        </div>
    );
}

export default LandingPage;