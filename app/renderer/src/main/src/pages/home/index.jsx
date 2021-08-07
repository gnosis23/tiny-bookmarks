import React, {useEffect, useState} from 'react';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';

export default function Home() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    ipcRenderer.send('fetchRepo');
    ipcRenderer.on('getRepo', (event, data) => {
      setData(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <section>{count}</section>
        <button onClick={() => setCount(x => x + 1)}>Add 1</button>
      </header>
      <div className={styles.list}>
        {data.map(item => (
          <div key={item.id} className={styles.repo}>{item.name}</div>
        ))}
      </div>
    </div>
  )
}
