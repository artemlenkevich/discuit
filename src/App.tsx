import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Provider } from 'react-redux';

import { Modals } from '@/components/modals';
import { Loader } from '@/components/ui/Loader';
import { AuthProvider } from '@/providers/AuthProvider';
import { AppRoutes } from '@/routes';
import { store } from '@/store';

import styles from './App.module.scss';
Modal.setAppElement('#root');

const loader = (
  <div className={styles.loader}>
    <Loader size='lg' />
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <AuthProvider loader={loader}>
        <AppRoutes />
        <Modals />
        <Toaster />
      </AuthProvider>
    </Provider>
  );
}

export default App;
