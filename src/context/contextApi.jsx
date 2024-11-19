import { createContext, useEffect, useState } from "react";


export const VisibilityContext = createContext(false);

export const VisibilityProvider = (props) => {
    const [visible, setVisible] = useState(false);
    return (
        <VisibilityContext.Provider value={{ visible, setVisible }}>
            {props.children}
        </VisibilityContext.Provider>
    )
}

// location click

export const LocationContext = createContext({});
export const LocationProvider = (props) => {
    const [locationSelect, setLocationSelect] = useState({ lat: 22.5743545, lng: 88.3628734 })
    return (
        <LocationContext.Provider value={{ locationSelect, setLocationSelect }}>
            {props.children}
        </LocationContext.Provider>
    )
}

// Cart context

export const CartContext = createContext({});

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    function getDataFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(data)
    }
    useEffect(() => {
        getDataFromLocalStorage();
    }, [])
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

