# useMemo-usecase-Syntax-Practice
Created with CodeSandbox

# useMemo() hook

**Why do we use `useMemo()` ?**

We use the hook to increase the overall performance of the application.

**What is the problem we are having so that we can use the useMemo hook ?**

let us consider a counter app with increment button.

```java
import "./styles.css";
import {useState} from "react";

export default function App() {
  const [count, setCount ] = useState(0);

  function handler()
  {
    setCount(count+1)
  }
  return (
    <div className="App">
      <h1>counter app</h1>
      <h1>{count}</h1>
      <button onClick = {handler}>increment</button>
    </div>
  );
}
```

in this case when ever the increment button is clicked the count state is changed and the entire component is re-rendered.

Now consider the situation where another state called number is present.

```java
import "./styles.css";
import {useState} from "react";

export default function App() {
  const [count, setCount ] = useState(0);
  const [num,setnum]= useState(5);

  function handler()
  {
    setCount(count+1)
  }

  function numberHandler()
  {
    setnum(num+2);
  }
  return (
    <div className="App">
      <h1>counter app</h1>
      <h1>{count}</h1>
      <h1>{num}</h1>
      <button onClick = {handler}>increment</button>
      <button onClick = {numberHandler}>number change</button>
    </div>
  );
}
```

now in this case when we click on the increment button it changes the count state and it re-renders the whole component so the num component also re-renders.

By this, it is unnecisarrily rerendering the unchanged states 

here we can consider it as a small issue because there is only one state rerendering even if there is no use. But consider a situation if the number is executing a complex function.

consider the num is executing a complex factorial function.

```java
import "./styles.css";
import {useState} from "react";

export default function App() {
  const [count, setCount ] = useState(0);
  const [num,setnum]= useState(0);
  // const [facto, setFacto] = useState(0);
  function handler()
  {
    setCount(count+1)
  }

  function numberHandler()
  {
    setnum(num+1);
    // setFacto(fact(num))
  }

  function fact(num)
  {
    let value = 1;
    for (let i =1;i<=num;i++)
    {
      value = value*i;
    }
    console.log("factorial is rendered")
    return value;
  }

  const factorial = fact(num);
  return (
    <div className="App">
      <h1>counter app</h1>
      <h1>{count}</h1>
      <h1>{num}</h1>
      <h1>{factorial}</h1>
      <button onClick = {handler}>increment</button>
      <button onClick = {numberHandler}>number change</button>
    </div>
  );
}
```

now when ever the increment is clicked without use the factorial is rendered once.

because of increment is clicked the num state also rerenders and again factorial is rerendered.

it is also considered as the small issue.

what if there are 100 numbers factorial and rerendering for every state.

It is a problem.

**What we need now ?**

We want only the changed state to rerender not anyother.

For this purpose we use the useMemo hook.

```java
import "./styles.css";
import {useState, useMemo} from "react";

export default function App() {
  const [count, setCount ] = useState(0);
  const [num,setnum]= useState(0);
  // const [facto, setFacto] = useState(0);
  function handler()
  {
    setCount(count+1)
  }

  function numberHandler()
  {
    setnum(num+1);
    // setFacto(fact(num))
  }

  function fact(num)
  {
    let value = 1;
    for (let i =1;i<=num;i++)
    {
      value = value*i;
    }
    console.log("factorial is rendered")
    return value;
  }

  let factorial = useMemo(()=>{
    return fact(num)
  },[num]);
  return (
    <div className="App">
      <h1>counter app</h1>
      <h1>{count}</h1>
      <h1>{num}</h1>
      <h1>factorial : {factorial}</h1>
      <button onClick = {handler}>increment</button>
      <button onClick = {numberHandler}>number change</button>
    </div>
  );
}
```

You can check the working at :

**codeSandBoxLink :**

[https://codesandbox.io/s/use-memo-nydmjf?file=/src/App.js](https://codesandbox.io/s/use-memo-nydmjf?file=/src/App.js)

**Reference :**

[https://www.youtube.com/watch?v=W49b9J6Szx0&list=PLWnZ0qt0PImVaDkDbF96dnRGO0_lXVLKf&index=54](https://www.youtube.com/watch?v=W49b9J6Szx0&list=PLWnZ0qt0PImVaDkDbF96dnRGO0_lXVLKf&index=54)

**Steps to be followed :**

**Step 1 :**

```java
import {useMemo} from "react"
```

**step 2  :**

```java
useMemo(()=>{
	//the complex code you want to run 
},[])
```

This may be similar to useEffect hook but you have to remember that 

useEffect - executes after the render is done for the first time and according to the dependency it renders next time.

useMemo - executes before the render only so they are not similar.

both take dependencies whether to execute the next time or not is the common thing.
