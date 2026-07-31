import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar/NavBar';
import './App.css'

function App() {
 return (
  <Suspense fallback= {<p>Chargement..</p>}>
    {useRoutes(routes)}
    <NavBar />
  </Suspense>
);
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
