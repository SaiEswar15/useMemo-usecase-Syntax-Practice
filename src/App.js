import "./styles.css";
import { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [num, setnum] = useState(0);
  // const [facto, setFacto] = useState(0);
  function handler() {
    setCount(count + 1);
  }

  function numberHandler() {
    setnum(num + 1);
    // setFacto(fact(num))
  }

  function fact(num) {
    let value = 1;
    for (let i = 1; i <= num; i++) {
      value = value * i;
    }
    console.log("factorial is rendered");
    return value;
  }

  let factorial = useMemo(() => {
    return fact(num);
  }, [num]);
  return (
    <div className="App">
      <h1>counter app</h1>
      <h1>{count}</h1>
      <h1>{num}</h1>
      <h1>factorial : {factorial}</h1>
      <button onClick={handler}>increment</button>
      <button onClick={numberHandler}>number change</button>
    </div>
  );
}
