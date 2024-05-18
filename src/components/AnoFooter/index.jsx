import React, { useState, useEffect } from "react";

const AnoFooter = () => {
    const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

    useEffect(() => {
        setAnoAtual(new Date().getFullYear());
    }, []);

    return (       
        <span id="anoAtual">{anoAtual}</span>        
    );
}

export default AnoFooter;
