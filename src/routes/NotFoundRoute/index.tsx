import styles from './NotFoundRoute.module.scss';

export const NotFoundRoute: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>404 Page not found</h1>
    </div>
  );
};
