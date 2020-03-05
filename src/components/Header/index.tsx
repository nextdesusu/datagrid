import * as React from "react";

interface HeaderProps {
    children: string,
}

const Header = ({ children }: HeaderProps ) => {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    )
}

export default Header;