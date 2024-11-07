import { NavLink } from 'react-router-dom';
import styles from '../../styles/layout.module.scss';
export default function Header() {
  const menuItems = [
    { id: 1, name: '로그인', link: '/auth' },
    { id: 2, name: 'TODO', link: '/todo' },
  ];
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>TO-DO</div>
      <div className={styles.header__menubar}>
        {menuItems.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.link}
            className={({ isActive }) =>
              isActive
                ? `${styles.header__menubar__item} ${styles.header__menubar__item__active}`
                : styles.header__menubar__item
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </div>
      <div className={styles.header__profile}>
        <div>프로필</div>
      </div>
    </div>
  );
}
