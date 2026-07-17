// Le sous-chemin "/vitest" enregistre les matchers ET augmente les types de
// Vitest (expect(...).toBeInTheDocument, etc). Sans "/vitest", les matchers
// marchent à l'exécution mais tsc ne les connaît pas.
import '@testing-library/jest-dom/vitest';