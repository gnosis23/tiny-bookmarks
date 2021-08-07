import React, {useEffect, useState} from 'react';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';

export default function Home() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    ipcRenderer.send('fetchRepo');
    ipcRenderer.on('getRepo', (event, data) => {
      setData(data);
    });
    ipcRenderer.send('async-message');
    ipcRenderer.on('async-message-reply', (event, arg) => {
      setItems(arg);
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
        <span>{items && items.length ? 'sqlite3 ok' : 'sqlite3 fail'}</span>
      </div>
    </div>
  )
}
