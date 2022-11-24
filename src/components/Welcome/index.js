import React, { useState, Fragment, useContext, useEffect } from 'react';
import Logout from '../Logout'
import Quiz from '../Quiz';
import { FirebaseContext } from '../Firebase'

const Welcome = props => {

    const firebase = useContext(FirebaseContext);

    // variable d'état ayant "null" par défaut pour indiquer que l'user n'est pas encore connecté
    const [userSession, setUserSession] = useState(null);

    // Variable d'état qui sert à enregistrer les data de l'user
    const [userData, setUserData] = useState({});

    // On vérifie que l'user s'est identifié
    useEffect(() => {
        // C'est listner qui vérifie s'il y a connexion/déconnexion 
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        if (userSession !== null){
            // On accède à l'userId de l'user
            firebase.user(userSession.uid)

            //On obtient les informations relatives à notre user
            .get()

            //Si l'user a été trouvé
            .then( doc => {
                if(doc && doc.exists){
                    const mydata = doc.data();
                    setUserData(mydata)
                }

            })
            //Sinon
            .catch( error => {
            console.log(error); 
            })
        }

        return () => {
            listener()
        };
    }, [userSession])

    /* ALTERNATIVE: const dislay = userSession ? () : ();*/

    // Si la personne n'est pas connecter
    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p className="loaderText">Loading...</p>
        </Fragment>
    ) : ( // Sinon on affiche le quizz
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                < Quiz userData={userData}/>
            </div>
        </div>
    ) 
}

export default Welcome