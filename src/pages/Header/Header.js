import React from 'react'
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './header.css'
import { useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory();
    const handleHomeClick = event => {
        history.push(`/`)
    }
    const handleSearchClick = event => {
        history.push(`/results`)
    }

    return (
        <div className="header">
            <button onClick={handleSearchClick}><FontAwesomeIcon className="iconFa" icon={faSearch} size="2x" /></button>
            <button onClick={handleHomeClick}><FontAwesomeIcon className="iconFa" icon={faHome} size="2x" /></button>
        </div>
    )
}

export default Header
