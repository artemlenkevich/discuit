import { SelectBar } from '@/components/SelectBar';
import styles from './Home.module.scss';
import { PostWidget } from '@/components/PostWidget';

export const Home: React.FC = () => {
  return (
    <div>
      <SelectBar />
      <div className={styles.posts}>
        <PostWidget prop='5' />
      </div>
    </div>
  );
};
