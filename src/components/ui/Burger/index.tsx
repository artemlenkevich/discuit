import styles from './Burger.module.scss';

interface BurgerProps {
  onClick?: () => void;
}

export const Burger: React.FC<BurgerProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.burger}>
      <div className={styles.burgerLine}></div>
      <div className={styles.burgerLine}></div>
      <div className={styles.burgerLine}></div>
    </button>
  );
};
