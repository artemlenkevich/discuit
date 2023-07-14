import { Button } from '@/components/ui/Button';
import { Tile } from '@/components/ui/Tile';

import styles from './SelectBar.module.scss';

export const SelectBar: React.FC = () => {
  return (
    <Tile className={styles.selectBar}>
      <div className={styles.name}>Posts</div>
      <ul className={styles.options}>
        <li className={styles.option}>
          <Button fullWidth variant='text' underline>
            Hot
          </Button>
        </li>
      </ul>
    </Tile>
  );
};
