import { BrowserRouter } from 'react-router-dom'; 
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { AuthProvider } from './contexts/AuthContext';
import './App.css'

function App() {
 return useRoutes(routes);
}

function Root() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Root;
