import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { CloseButton } from '@/components/ui/CloseButton';
import { Textarea } from '@/components/ui/Textarea/indext';
import { Tile } from '@/components/ui/Tile';
import { useAppDispatch } from '@/store/hooks';
import { showWarnNotification } from '@/store/notificationsSlice';
import { addPostThunk } from '@/store/postsSlice';

import styles from './NewPostPage.module.scss';

interface PostValues {
  title: string;
  text: string;
}

const initialValues: PostValues = {
  title: '',
  text: '',
};

const validationSchema = Yup.object({
  text: Yup.string().min(20, 'Must be 10 characters or more').required('Required'),
  title: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
});

export const NewPostPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onCloseClick = () => {
    navigate('/');
  };

  const onPostSubmit = async (fields: PostValues, helpers: FormikHelpers<PostValues>) => {
    try {
      const { title, text } = await validationSchema.validate(fields);
      await dispatch(addPostThunk({ title, text })).unwrap();
      helpers.resetForm();
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        dispatch(showWarnNotification({ name: e.name, message: e.message }));
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <h1 className={styles.header}>Create a post</h1>
          <CloseButton onClick={onCloseClick} />
        </div>
        <Formik initialValues={initialValues} onSubmit={onPostSubmit}>
          <Form className={styles.postEditor}>
            <Tile>
              <div className={styles.post}>
                <Field name='title'>
                  {({ field }: FieldProps) => (
                    <Textarea
                      className={styles.postTitle}
                      rows={1}
                      placeholder='Post title goes here ...'
                      autoGrow
                      {...field}
                    />
                  )}
                </Field>
                <Field name='text'>
                  {({ field }: FieldProps) => (
                    <Textarea
                      className={styles.postContent}
                      rows={10}
                      placeholder='Post content goes here(optional)...'
                      autoGrow
                      {...field}
                    />
                  )}
                </Field>
              </div>
            </Tile>
            <div className={styles.controls}>
              <Button type='submit'>Submit</Button>
              <Button onClick={onCloseClick} variant='secondary'>
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
