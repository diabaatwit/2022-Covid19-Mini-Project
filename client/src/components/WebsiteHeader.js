import React, { Component } from 'react'
import './css/header.css'

class Header extends Component {
    render() {
        return (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <h1 className='title'>COVID-19 Reporting App</h1>
                        </div>
                    </div>
                    <nav>
                        <li><span><a href="/" class="button">Main</a></span></li>
                        <li><span><a href="/admin" class="button">Admin</a></span></li>
                    </nav>
                </div>
            </header>
        )

    }
}

export default Header;