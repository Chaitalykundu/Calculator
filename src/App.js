import React, { useState } from "react";
import "./App.css";
import NumberToWordConverter from "./convertNumtoWord.js";

function App() {
  const [result, setResult] = useState("");

  const inputHandler = (value) => {
    if (value === "=") {
      try {
        const finalResult = evaluateExpression(result);
        setResult(finalResult);
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "DEL") {
      setResult("");
    } else if (value === "CE") {
      setResult(result.slice(0, -1));
    } else if (value === "%") {
      try {
        const finalResult = evaluateExpression(`(${result}) / 100`);
        setResult(finalResult);
      } catch (error) {
        setResult("Error");
      }
    } else {
      if (isOperator(value) && isOperator(result.slice(-1))) {
        // If the last character is already an operator, replace it with the new one
        setResult(result.slice(0, -1) + value);
      } else if (isOperator(result) && !isOperator(value)) {
        setResult(value);
      } else {
        if(result.length<=8)
          setResult(result + value);
      }
    }
  };

  const evaluateExpression = (expr) => {
    const lastChar = expr.slice(-1);
    if (isOperator(lastChar)) {
      // Remove the last character if it's an operator
      expr = expr.slice(0, -1);
    }
    // Use Function constructor for calculation to avoid using eval
    const finalResult = new Function(`return ${expr}`)();
    if (!isFinite(finalResult)) {
      throw Error("Invalid expression");
    }
    return finalResult.toString();
  };

  const handleChange=(e) =>{
    const input = e.target.value;
    if(input.length<=8 && !isNaN(input))
      setResult(input);
  }

  const isOperator = (char) => {
    return ["+", "-", "*", "/"].includes(char);
  };

  return (
    <div className="wrapper">
      <h1 className="header">Calculator</h1>
      <input type="text" name="screen" placeholder="0" id="screen" value={result} onChange={handleChange} />

      <div id="button-box">
        <div className="row row1">
        {["DEL","CE","%","/"].map((num)=>(
          <button className="button" onClick={() => inputHandler(num)} key={num}>
            {NumberToWordConverter(num)}
          </button>
        ))}
          {/* <button className="button" onClick={() => inputHandler("DEL")}>
            DEL
          </button>
          <button className="button" onClick={() => inputHandler("CE")}>
            CE
          </button>
          <button className="button" onClick={() => inputHandler("%")}>
            %
          </button>
          <button className="button" onClick={() => inputHandler("/")}>
            /
          </button> */}
        </div>

        <div className="row row2">
        {["7","8","9","*"].map((num)=>(
          <button className="button" onClick={() => inputHandler(num)} key={num}>
            {NumberToWordConverter(num)}
          </button>
        ))}
          {/* <button className="button" onClick={() => inputHandler("7")}>
            {toWords.convert(7)}
          </button>
          <button className="button" onClick={() => inputHandler("8")}>
            {toWords.convert(8)}
          </button>
          <button className="button" onClick={() => inputHandler("9")}>
            {toWords.convert(9)}
          </button>
          <button className="button" onClick={() => inputHandler("*")}>
            *
          </button> */}
        </div>

        <div className="row row3">
        {["4","5","6","-"].map((num)=>(
          <button className="button" onClick={() => inputHandler(num)} key={num}>
            {NumberToWordConverter(num)}
          </button>
        ))}
          {/* <button className="button" onClick={() => inputHandler("4")}>
            {toWords.convert(4)}
          </button>
          <button className="button" onClick={() => inputHandler("5")}>
            {toWords.convert(5)}
          </button>
          <button className="button" onClick={() => inputHandler("6")}>
            {toWords.convert(6)}
          </button>
          <button className="button" onClick={() => inputHandler("-")}>
            -
          </button> */}
        </div>

        <div className="row row4">
        {["1","2","3","+"].map((num)=>(
          <button className="button" onClick={() => inputHandler(num)} key={num}>
            {NumberToWordConverter(num)}
          </button>
        ))}
          {/* <button className="button" onClick={() => inputHandler("1")}>
            {toWords.convert(1)}
          </button>
          <button className="button" onClick={() => inputHandler("2")}>
            {toWords.convert(2)}
          </button>
          <button className="button" onClick={() => inputHandler("3")}>
            {toWords.convert(3)}
          </button>
          <button className="button" onClick={() => inputHandler("+")}>
            +
          </button> */}
        </div>

        <div className="row row5">
        {["00","0",".","="].map((num)=>(
          <button className="button" onClick={() => inputHandler(num)} key={num}>
            {NumberToWordConverter(num)}
          </button>
        ))}
          {/* <button className="button" onClick={() => inputHandler("00")}>
            00
          </button>
          <button className="button" onClick={() => inputHandler("0")}>
            {toWords.convert(0)}
          </button>
          <button className="button" onClick={() => inputHandler(".")}>
            .
          </button>
          <button className="button" onClick={() => inputHandler("=")}>
            =
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;

// function App() {
//   const [result, setResult] = useState("0");

//   const inputHandler = (value)=>{
//     if(value === '='){
//       try{
//         setResult(eval(result).toString());
//       }
//       catch(error){
//         setResult("Error");
//       }
//     }
//     else if(value === 'DEL'){
//         setResult("");
//     }
//     else if(value === 'CE'){
//       setResult(result.slice(0,-1));
//     }
//     else if(value === '%'){
//       setResult(result % value);
//     }
//     else{
//       setResult(result+value)
//     }
//   };

//   return (
//     <div className="wrapper">
//       <h1 className="header">Calculator</h1>
//       <input type="text" placeholder="0" id="screen" value={result} readOnly/>

//       <div id="button-box">
//         <div className="row">
//           <button className="button" onClick={() =>inputHandler('DEL')}>DEL</button>
//           <button className="button" onClick={() =>inputHandler('CE')}>CE</button>
//           <button className="button" onClick={() =>inputHandler('%')}>%</button>
//           <button className="button" onClick={() =>inputHandler('/')}>/</button>
//         </div>

//         <div className="row">
//           <button className="button" onClick={() =>inputHandler('7')}>7</button>
//           <button className="button" onClick={() =>inputHandler('8')}>8</button>
//           <button className="button" onClick={() =>inputHandler('9')}>9</button>
//           <button className="button" onClick={() =>inputHandler('*')}>*</button>
//         </div>

//         <div className="row">
//           <button className="button" onClick={() =>inputHandler('4')}>4</button>
//           <button className="button" onClick={() =>inputHandler('5')}>5</button>
//           <button className="button" onClick={() =>inputHandler('6')}>6</button>
//           <button className="button" onClick={() =>inputHandler('-')}>-</button>
//         </div>

//         <div className="row">
//           <button className="button" onClick={() =>inputHandler('1')}>1</button>
//           <button className="button" onClick={() =>inputHandler('2')}>2</button>
//           <button className="button" onClick={() =>inputHandler('3')}>3</button>
//           <button className="button" onClick={() =>inputHandler('+')}>+</button>
//         </div>

//         <div className="row">
//         <button className="button" onClick={() =>inputHandler('00')}>00</button>
//         <button className="button" onClick={() =>inputHandler('0')}>0</button>
//         <button className="button" onClick={() =>inputHandler('.')}>.</button>
//         <button className="button" onClick={() =>inputHandler('=')}>=</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
