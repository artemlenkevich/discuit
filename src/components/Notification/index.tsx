import styles from './Notification.module.scss';

interface NotificationProps {
  name: string;
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ name, message }: NotificationProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.name}>{name}</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
