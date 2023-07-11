import { useState } from 'react';

import { registerUserThunk, selectAuth } from './features/auth/store';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { Layout } from './components';

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  console.log(auth);

  const onSubmit = () => {
    dispatch(registerUserThunk({ email, password, username }));
  };

  return (
    <Layout>
      <div>
        <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type='text' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </Layout>
  );
}

export default App;
