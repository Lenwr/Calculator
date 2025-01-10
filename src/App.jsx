/* eslint-disable */
import './App.css'
import {useState} from "react";
import touches from "./constants/boutons.js";
import {evaluate} from "mathjs";
import {useSpring,animated} from "react-spring";

function App() {
    const [display , setDisplay] = useState("");
    const [result, setResult] = useState("");
    const styles = {
        numberStyle: 'hover:bg-opacity-60 m-2 flex w-16 text-2xl text-white h-16 items-center justify-center bg-white bg-opacity-20 rounded-full',
        equal:'hover:bg-opacity-60 m-2 flex w-36 text-2xl text-white h-16 items-center justify-end px-8 bg-white bg-opacity-20 rounded-full'
    }

    const handle = (item) => {
        setDisplay((prev) => prev + item);
    };
    const calculResult = () => {
        try {
            setResult(evaluate(display));
            setInitiateAnimation(true)
        } catch (err) {
            setResult("Error");
        }
    };
    const clearDisplay = () => {
        setDisplay("");
        setResult("");
        setInitiateAnimation(false)
    };
    const toggleSign = () => {
        if (display) {
            if (display.startsWith("-")) {
                setDisplay(display.substring(1)); // Supprime le signe négatif
            } else {
                setDisplay("-" + display); // Ajoute le signe négatif
            }
        }
    };
    const [initiateAnimation , setInitiateAnimation] = useState(false);

 function Number({n}){
     const {number}= useSpring({
         from: {number : 0 },
         number : n,
         delay: 50,
         config:{mass:1, tension:20 , friction:10}
     });
     return <animated.div>{number.to((n)=>n.toFixed(0))}</animated.div>
 }

    return (
      <div
          className="w-min-screen flex flex-col justify-end items-center  min-h-screen bg-gradient-to-r from-red-400 to-indigo-500 py-4">
          <h1 className="text-5xl justify-self-start h-[30vh]  font-bold text-white">
              {
                  initiateAnimation ? <div className="flex flex-col justify-center items-center">
                          <Number className="shadow-3xl" n={result}/>
                          <img className=" shadow-2xl animate w-32 mt-4 h-32 rounded-2xl"
                               src="https://media.tenor.com/oqn2PBhWVxAAAAAM/xmen-professor-x.gif" alt=""/>

                      </div> :
                      <div className="flex flex-col justify-center items-center">
                         <p className="shadow-3xl">...</p>
                          <img className=" shadow-2xl animate w-32 h-32 mt-4 rounded-2xl"
                               src="https://media.tenor.com/oqn2PBhWVxAAAAAM/xmen-professor-x.gif" alt=""/>

                      </div>}
          </h1>
          <h1 className=" w-[70%] overflow-x-scroll mb-4 text-white text-4xl  mx-2 flex justify-end">{display || "0"}</h1>
          <div
              className="container mb-10 h-2/3  flex flex-row flex-wrap bg-black p-2 bg-opacity-40 mx-2 w-[90%] rounded-3xl">
              <button className={styles.numberStyle} onClick={clearDisplay}>AC</button>
              <button className={styles.numberStyle} onClick={toggleSign}>val</button>
              <button className={styles.numberStyle}  onClick={() => handle(touches.touchePercentage)}>{touches.touchePercentage}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.toucheDivision)}>{touches.toucheDivision}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche7)}>{touches.touche7}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche8)}>{touches.touche8}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche9)}>{touches.touche9}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.toucheMultiple)}>{touches.toucheMultiple}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche4)}>{touches.touche4}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche5)}>{touches.touche5}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche6)}>{touches.touche6}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.toucheMinus)}>{touches.toucheMinus}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche1)}>{touches.touche1}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche2)}>{touches.touche2}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche3)}>{touches.touche3}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touchePlus)}>{touches.touchePlus}</button>
              <button className={styles.numberStyle} onClick={() => handle(touches.touche0)}>{touches.touche0}</button>
              <button className={styles.numberStyle}
                      onClick={() => handle(touches.toucheVirgule)}>{touches.toucheVirgule}</button>
              <button className={styles.equal}
                      onClick={calculResult}>{touches.toucheEqual}</button>

          </div>

      </div>
  )
}

export default App


