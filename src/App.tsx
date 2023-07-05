import { useEffect, useState } from 'react';

import { subscribeAuthStateChanges } from './features/auth';
import { registerUserThunk, selectAuth } from './features/auth/store';
import { useAppDispatch, useAppSelector } from './hooks/store';

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

  useEffect(() => {
    dispatch(subscribeAuthStateChanges());
  }, [dispatch]);

  return (
    <div>
      <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input type='text' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default App;
