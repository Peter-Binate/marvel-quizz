import React, { useRef, useEffect, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {

    //On ne veut pas que les boutons inscription et connexion soit visible avant 3s 
    const [btn, setBtn] = useState(false);
    
    //Permet d'avoir accès à la class: welcomePage
    const refWolverine = useRef(null); 

    // On veut que la fonction qui fait s'exécute seulement au momment du montage et pas après
    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true)
        }, 1000);

    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    }

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    const clearImg = () => {
        if (refWolverine.current.classList.contains("leftImg")){
            refWolverine.current.classList.remove("leftImg")
        } else if(refWolverine.current.classList.contains("rightImg")){
            refWolverine.current.classList.remove("rightImg")
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg} >
                <Link className="btn-welcome" to="/signup">Inscription</Link>
            </div>

            <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg} >
                <Link className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
    )
    
    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    )
}

export default Landing
