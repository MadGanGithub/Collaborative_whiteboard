import React from 'react';
import Public from './components/public.tsx';
import Protected from './components/protected.tsx';
import useAuth from './hooks/useAuth.tsx';
import DrawingBoard from './components/drawingboard.tsx';
import SocketPage from "./components/socketpage.tsx"

function App() {
  // const [isLogin, token] = useAuth();
  return (
    <div>
      <DrawingBoard />
      {/* {isLogin ? <Protected token={token} /> : <Public />} */}
      {/* <SocketPage/> */}
    </div>
  );
}

export default App;
