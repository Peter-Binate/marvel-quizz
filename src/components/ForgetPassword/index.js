import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/';

const ForgetPassword = props => {

    // On accède à l'objet Firebase
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    
    // Si l'input email est vide disabled est True et le bouton du formulaire est désactiver
    const disabled = email === "";

    //Pour envoyé à l'user un message en cas de succès de l'envois
    const [success, setSuccess] = useState(null);

    //On affiche un message d'erreur en cas de mauvais email
    const [error, setError] = useState(null);

    const handleSubmit = event => {

        // On empêche de recharger la page
        event.preventDefault();

        //On envoie un mail pour que l'user puisse récupérer son mdp
        firebase.passwordReset(email)

        // Si l'adresse email se trouve bien dans notre API firebase
        .then(() => {
            // Si l'user a échouer 1 fois et qu'il recommence on enlève le msg d'erreur
            setError(null);
            
            // On informe l'user qu'un mail lui a été envoyé
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe.`);
            
            // Va se déclenché au bout de 5 sec
            setTimeout(() => {
                props.history.push('/login')
            }, 5000)
        })
        //Sinon
        .catch(error => {
            // On indique l'erreur
            setError(error);

            //On vide le formulaire au cas où l'user veut recommencer
            setEmail("");
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        
                        { 
                            success && <span 
                                style={{ 
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={event => setEmail(event.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ForgetPassword
