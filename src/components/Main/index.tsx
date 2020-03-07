import * as React from "react";

interface MainProps {
    children?: React.ReactNode | Array<React.ReactNode>,
}

const Main = ({ children }: MainProps ) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default Main;