import React, { useContext, useState, useEffect } from "react";

const FavoritesContext = React.createContext()

export function useFavorites() {
    return useContext(FavoritesContext);
}

export function FavoritesProvider( { children } ) {
    // try to retreive favorites from local storage
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    // store the favorites on local storage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    // add or remove a user from favorites list
    function applyFavorite(user) {
        // get an array from the state variable tou use the 'includes' method, and avoid changing the state directly
        let array =  Object.values(favorites)

        if (array.includes(user)) { // remove user from favorites
            array = array.filter(item => item !== user);
        } else {                    // add user to favorites
            array.push(user)
        }
        setFavorites(array)
    }

    const clearFavorites = () => {
        setFavorites([])
        localStorage.setItem('favorites', null);
    }

    // exported values/ methods, accessible to all children
    const value = {
        favorites,
        applyFavorite,
        clearFavorites
    }

    return (
        <FavoritesContext.Provider value ={value}>
            {children}
        </FavoritesContext.Provider>
    )
}