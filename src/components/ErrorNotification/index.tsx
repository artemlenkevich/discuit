import styles from './ErrorNotification.module.scss';

interface ErrorNotificationProps {
  name: string;
  message: string;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  name,
  message,
}: ErrorNotificationProps) => {
  return (
    <div className={styles.root}>
      <div>{name}</div>
      <div>{message}</div>
    </div>
  );
};
