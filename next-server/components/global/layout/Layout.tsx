import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface Props {
    children: JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    )
}


export default Layout
