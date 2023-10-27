import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { CloseButton } from '@/components/ui/CloseButton';
import { Textarea } from '@/components/ui/Textarea/indext';
import { Tile } from '@/components/ui/Tile';
import { validationConfig } from '@/lib/validationConfig';
import { useAppDispatch } from '@/store/hooks';
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

const { postTitle, postText } = validationConfig;

const validationSchema = Yup.object({
  title: postTitle,
  text: postText,
});

export const NewPostPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onCloseClick = () => {
    navigate('/');
  };

  const onPostSubmit = ({ title, text }: PostValues, helpers: FormikHelpers<PostValues>) => {
    dispatch(addPostThunk({ title, text }))
      .unwrap()
      .then(() => {
        helpers.resetForm();
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <h1 className={styles.header}>Create a post</h1>
          <CloseButton onClick={onCloseClick} />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onPostSubmit}
        >
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
