import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { CloseButton } from '@/components/ui/CloseButton';
import { Textarea } from '@/components/ui/Textarea/indext';
import { Tile } from '@/components/ui/Tile';

import styles from './NewPost.module.scss';

export const NewPost: React.FC = () => {
  const navigate = useNavigate();

  const onCloseClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <h1 className={styles.header}>Create a post</h1>
          <CloseButton onClick={onCloseClick} />
        </div>
        <div className={styles.postEditor}>
          <Tile>
            <div className={styles.post}>
              <Textarea
                className={styles.postTitle}
                rows={1}
                placeholder='Post title goes here ...'
                autoGrow
              />
              <Textarea
                className={styles.postContent}
                rows={10}
                placeholder='Post content goes here(optional)...'
                autoGrow
              />
            </div>
          </Tile>
          <div className={styles.controls}>
            <Button>Submit</Button>
            <Button variant='secondary'>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
