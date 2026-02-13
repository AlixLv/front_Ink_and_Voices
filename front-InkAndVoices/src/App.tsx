import { BrowserRouter } from 'react-router-dom'; 
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import './App.css'

function App() {
 return useRoutes(routes);
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
