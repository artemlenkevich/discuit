import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Provider } from 'react-redux';

import { AppRoutes } from '@/routes';

import { Modals } from './components/modals';
import { AuthProvider } from './providers/AuthProvider';
import { store } from './store';

Modal.setAppElement('#root');

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
        <Modals />
        <Toaster />
      </AuthProvider>
    </Provider>
  );
}

export default App;
