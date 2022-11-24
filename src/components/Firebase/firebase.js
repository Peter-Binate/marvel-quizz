import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyADeoYXv-VkbcBnObFTP16bv-Tli8689jI",
    authDomain: "marvel-quiz-9e853.firebaseapp.com",
    projectId: "marvel-quiz-9e853",
    storageBucket: "marvel-quiz-9e853.appspot.com",
    messagingSenderId: "524414162658",
    appId: "1:524414162658:web:671b27266fded2f25230bb"
  };

class Firebase{
    // On initialise l'application 
    constructor() {
        app.initializeApp(config);
        // Permet d'accéder aux différetes méthodes de l'API Firebase
        this.auth = app.auth();
        //On invoque firestore
        this.db = app.firestore()
    }

    // Inscription
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // Connexion
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    /* Déconnexion
       Ici pas besoin de paramètre car la personne est déjà connecter */ 
    signoutUser = () => this.auth.signOut();

    //Récupérer le mot de passe 
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    // firestore
    user = uid => this.db.doc(`users/${uid}`); //on enregistre l’userId dans une base de donnée à l’aide d’une référence

}

export default Firebase;
