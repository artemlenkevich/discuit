import { Provider } from 'react-redux';

import { AppRoutes } from '@/routes';

import { AuthProvider } from './providers/AuthProvider';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
