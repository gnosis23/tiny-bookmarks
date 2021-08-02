import React, { useState } from 'react';
import styles from './index.module.scss';

export default function Home(props) {
  const [count, setCount] = useState(1);
  return (
    <div className={styles.container}>
      <section>{count}</section>
      <button onClick={() => setCount(x => x + 1)}>Add 1</button>
    </div>
  )
}