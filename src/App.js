import './App.css';
import Home from './pages/home';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { useEffect } from 'react';

function Copyright(props) {
  useEffect(() => {
    localStorage.clear()
  }, [ ])
  
  return (
    <Typography sx={{padding:"10px"}} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target='__blank' href="https://github.com/feerny">
        Felipe Ferrer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Home Copyright={Copyright}></Home>
      </Provider>
    </div>
  );
}

export default App;
