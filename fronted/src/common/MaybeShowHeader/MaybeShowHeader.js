import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";

const MaybeShowHeader = ({ children }) => {
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        console.log(location.pathname);
        if (
            location.pathname === "/iniciar-sesion" || 
            location.pathname === "/registrarse" || 
            location.pathname === "/" ||
            location.pathname === "/pago-desplegable" ||
            location.pathname === "/pantalla-venta" ||
            location.pathname === "/configuraciones" ||
            location.pathname === "/imagenes/get" 
                ) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [location]);

    return (
        <div>
            {showHeader && children}
        </div>
    );
};

export default MaybeShowHeader;
