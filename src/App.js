import './App.css';
import Home from './pages/home';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
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
      <Home Copyright={Copyright}></Home>
    </div>
  );
}

export default App;
