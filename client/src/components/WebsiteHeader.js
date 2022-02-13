import React, { Component } from 'react'
import './header.css'

class Header extends Component {
    render() {
        return (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <img src="https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0" alt="React Logo" />
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