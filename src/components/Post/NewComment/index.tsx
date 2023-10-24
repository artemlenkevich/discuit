import cn from 'classnames';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea/indext';
import { useAppDispatch } from '@/hooks/store';
import { addCommentThunk, getCommentsThunk } from '@/store/commentsSlice';

import styles from './NewComment.module.scss';

interface NewCommentProps {
  postId: string;
  parentId?: string | null;
  onCancel?: () => void;
}

const validationSchema = Yup.object({
  text: Yup.string()
    .max(150, 'Must be 150 characters or less')
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
});

export const NewComment: React.FC<NewCommentProps> = ({ postId, parentId = null, onCancel }) => {
  const [isControlsOpened, openControls] = useState(false);
  const dispatch = useAppDispatch();

  const onFocus = () => {
    if (!isControlsOpened) openControls(true);
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: (values, helpers) => {
      dispatch(addCommentThunk({ postId, parentId, text: values.text }))
        .unwrap()
        .then(() => {
          helpers.resetForm();
          dispatch(getCommentsThunk({ postId }));
        });
    },
  });

  const onSubmitClick = () => {
    formik.handleSubmit();
  };

  const onCancelClick = () => {
    onCancel?.();
    openControls(false);
    formik.resetForm();
  };

  return (
    <div className={styles.root}>
      <Textarea
        id='text'
        type='text'
        onFocus={onFocus}
        className={styles.textarea}
        rows={5}
        autoGrow
        placeholder='Add a new comment'
        {...formik.getFieldProps('text')}
      />
      {isControlsOpened && (
        <div className={styles.controls}>
          <Button variant='secondary' onClick={onCancelClick}>
            Cancel
          </Button>
          <Button disabled={!(formik.isValid && formik.dirty)} onClick={onSubmitClick}>
            Add comment
          </Button>
        </div>
      )}
    </div>
  );
};
