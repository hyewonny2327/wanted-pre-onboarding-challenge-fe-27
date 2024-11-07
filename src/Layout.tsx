import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import styles from './styles/layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout__container}>
      <header className={styles.layout__header}>
        <Header />
      </header>
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <footer className={styles.layout__footer}>
        <div>footer</div>
      </footer>
    </div>
  );
}
