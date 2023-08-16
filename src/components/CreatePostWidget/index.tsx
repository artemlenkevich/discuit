import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { Tile } from '@/components/ui/Tile';

import styles from './CreatePostWidget.module.scss';

export const CreatePostWidget: React.FC = () => {
  return (
    <Tile className={styles.root}>
      <h3 className={styles.title}>Join the discussion</h3>
      <p className={styles.text}>
        Discuit is a place where 2987 people get together to find cool stuff and discuss things.
      </p>
      <Link to='new'>
        <Button fullWidth>Create post</Button>
      </Link>
    </Tile>
  );
};
