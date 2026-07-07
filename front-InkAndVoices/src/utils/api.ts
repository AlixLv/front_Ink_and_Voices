const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8032';

export default async function getRessource<T>(
  endpoint: string,
  errorMsg: string = 'API Error'
): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, { method: 'GET' });
    
    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`${errorMsg}:`, error);
    throw error;
  }
}


// comment gérer les petits cas d'erreur individuels? on devrait pouvoir gérer si un livre n'existe pas,
// si c'est une erreur serveur... quelles autres erreurs on peut avoir?

// et on maitrise pas bien ce code. Au niveau pédagogique, ce serait mieux de coder nous-même les appels API