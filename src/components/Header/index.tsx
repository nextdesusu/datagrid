import * as React from "react";

import "./Header.css";

interface HeaderProps {
    children: string,
}

const Header = ({ children }: HeaderProps ) => {
    return (
        <header>
            <h1 className="main-header">{children}</h1>
        </header>
    )
}

export default Header;