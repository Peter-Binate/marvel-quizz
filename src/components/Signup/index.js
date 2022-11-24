import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const Signup = (props) => {

    const firebase = useContext(FirebaseContext);

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    // Constante qui permet d'afficher l'objet data
    const [loginData, setLoginData] = useState(data);
    /*Alternative (les 2 synthaxe sont pareils)
    const loginData = data */ 
    
    const [error, setError] = useState('');

    //On veut capturer les chaînes de caractères inscritent par l'user
    const handleChange = event => {
        setLoginData({...loginData, [event.target.id]: event.target.value})
         /*[event.target.id] = l'input qui est en train d'être changer
          event.target.value = la nouvelle valeur inscrite par l'user dans l'input*/
    }

    // Si on appuie sur Inscription
    const handleSubmit = event => {
        //On empêche le rechargement de la page après validation du formulaire
        event.preventDefault();

        // On fait un destructuring pour pouvoir écrire simplement signupUser(email, password): 
        const { email, password, pseudo } = loginData;

        // On appel firebase
        firebase.signupUser(email, password)
        
        // On classe les données de l'user dans un doc qui se nommera users/...
        .then( authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })

        //Si l'inscription est un succès
        .then(() => {
            //On vide le formulaire
            setLoginData({...data});

            //On redirige vers le quiz 
            props.history.push('/welcome');
        })

        //Si l'inscription est un échec
        .catch(error => {
            setError(error);
            
            //On vide le formulaire
            setLoginData({...data});
        })
    }

    //On crée un destructuring ce qui va nous éviter d'écrire loginData.etc (ex: loginData.pseudo loginData.email) 
    const {pseudo, email, password, confirmPassword } = loginData;

    // Si tous les inputs ne sont pas vides et que confirmPassword == password on active le bouton: inscription sinon on le désactive 
    const btn = pseudo === '' || email === '' || password === '' || confirmPassword !== password ? <button disabled>Inscription</button> : <button>Inscription</button>;
    
    // gestion des erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                
                {/* div gauche contenant l'image de Ironman*/}
                <div className="formBoxLeftSignup"></div>

                {/* div droite contenant le formulaire*/}
                <div className="formBoxRight">
                    <div className="formContent">
                    {errorMsg}

                    <h2>Inscription</h2>    
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} type="text" value={pseudo} id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} type="text" value={email} id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} type="text" value={password} id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} type="text" value={confirmPassword} id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            {/* bouton inscription*/}
                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup