import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, [mounted]);

    const portalelement = typeof window !== 'undefined' && document.getElementById("overlays");

    return mounted ? createPortal(children, portalelement) : null;
};

export default Portal;