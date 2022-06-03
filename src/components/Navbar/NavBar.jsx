import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

export default function NavBar() {
    const linkNames = [
        "Home", "Upload Note", "About Us", "Resources"
    ]

    const links = linkNames.map(name => {
        return <Link to={"/" + name.replace(/\s/g, '')}>{name}</Link>
    })

    return(
        <div className="navbar">
            <div className="logo">
                <div className="logo-text">The NoteBank</div>
            </div>
            <div className="links">
                {links}
            </div>
            <div className="user">
                <i className="fa-regular fa-circle-user"></i>
            </div>
        </div>
    )
}