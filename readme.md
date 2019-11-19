## 简介

Stook，也许，这是世界上最简单的 React 状态管理库，它会彻底颠覆你写 React 代码的方式。

## 核心

```jsx
const [state, setter] = useStore(key, initialState);
```

## 基本用法

下面是一个经典的 Counter 组件，展示了 `Stook` 的最基本用法:

```jsx
import React from "react";
import { useStore } from "stook";

function Counter() {
  const [count, setCount] = useStore("COUNTER", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

`Stook` 最核心的 Api 就是 `useStore`，也许你发现了，它和 `useState` 非常像，事实上，除了 `useStore` 多了一个参数以外，其他用法一模一样。

## 跨组件通信

```jsx
import React from "react";
import { useStore } from "stook";

function Counter() {
  const [count, setCount] = useStore("COUNTER", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

function Display() {
  const [count] = useStore("COUNTER");
  return (
    <div>
      <p>{count}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <Display />
    </div>
  );
}
```

## 自定 Hooks

```jsx
import React from "react";
import { useStore } from "stook";

function useCounter() {
  const [count, setCount] = useStore("COUNTER", 0);
  const decrease = () => setCount(count - 1);
  const increase = () => setCount(count + 1);
  return { count, increase, decrease };
}

function Display() {
  const { count } = useCounter();
  return <div>{count}</div>;
}

function Increase() {
  const { increase } = useCounter();
  return <buttun onClick={increase}>+</buttun>;
}

function Decrease() {
  const { decrease } = useCounter();
  return <buttun onClick={decrease}>-</buttun>;
}

export default function App() {
  return (
    <div>
      <Decrease />
      <Display />
      <Increase />
    </div>
  );
}
```

上面三个子组件，都用到了 useCounter，它们实现了状态共享。

## TODO

wip.....