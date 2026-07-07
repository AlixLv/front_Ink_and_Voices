import { BrowserRouter } from 'react-router-dom'; 
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';  // ← Ajouter ici
import routes from '~react-pages';
import './App.css'

function App() {
 return useRoutes(routes);
}

function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Root;
