import React, { Component } from 'react'
import './css/header.css'
import { FiHome, FiSettings } from 'react-icons/fi'

class Header extends Component {
    render() {
        return (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <a href="/">
                                <h1 className='title'>
                                    <FiHome size={26}/>&nbsp;
                                    COVID-19 Reporting App
                                </h1>
                            </a>
                        </div>
                    </div>
                    <nav>
                        <span>
                            <a id="settings-icon" href="/admin">
                                <FiSettings size={26}/>
                            </a>
                        </span>
                    </nav>
                </div>
            </header>
        )

    }
}

export default Header;