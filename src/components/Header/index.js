import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="banner-container">
                <h1>
                    <Link to="/">
                        Marvel Quizz 
                    </Link>     
                </h1>
            </div>
        </header>
    )
}

export default Header

