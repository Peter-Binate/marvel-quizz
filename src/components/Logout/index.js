import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../Firebase'

const Logout = () => {

    // Permet d'accéder à Firebase
    const firebase = useContext(FirebaseContext);

    // Permet de savoir d'attribuer la valeur false si l'user n'a pas encore cliqué sur le bouton de déconnexion 
    const [checked, setChecked] = useState(false);

    //Si l'user clique sur le bouton de déconnexion
    const handleChange = event => {
        setChecked(event.target.checked);
    }

    //On déconnecte l'user
    useEffect(() => {
        if (checked){
            firebase.signoutUser();
        }
    }, [checked, firebase]);

    return (
        <div>
            <div className="logoutContainer">
                <label className="switch">
                    <input onChange={handleChange} type="checkbox" checked={checked} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default Logout
