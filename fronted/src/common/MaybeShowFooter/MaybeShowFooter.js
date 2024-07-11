import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";

const MaybeShowFooter = ({ children }) => {
    const location = useLocation();
    const [showFooter, setShowFooter] = useState(false);

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
            setShowFooter(false);
        } else {
            setShowFooter(true);
        }
    }, [location]);

    return (
        <div>
            {showFooter && children}
        </div>
    );
};

export default MaybeShowFooter;
