import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-content">
                <h2>Delicious food, delivered to your door</h2>
                <p>
                    Craving something amazing? Explore a wide variety of cuisines and
                    get your favorite meals delivered hot, fresh, and right on time.
                </p>
                <button>Explore Menu</button>
            </div>
        </div>
    )
}

export default Header