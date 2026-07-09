import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';

// mocks
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('../../services/AuthService', () => ({
    signUpUser: vi.fn(),
}));

//helper pour créer un formulaire
const setupForm = () => {
    const { container } = render(
        <BrowserRouter>
            <SignUpForm />
        </BrowserRouter>
    );
    return {
        usernameInput: container.querySelector('input[type="text"]') as HTMLInputElement,
        emailInput: container.querySelector('input[type="email"]') as HTMLInputElement,
        passwordInput: container.querySelector('input[type="password"]') as HTMLInputElement,
        confirmPasswordInput: container.querySelectorAll('input[type="password"]')[1] as HTMLInputElement,
        submitButton: screen.getByRole('button', { name: /Valider/i })// changer pour le vrai composant
    };
};



describe('SignUpForm Component', () => {
    it('should render SignUpForm component', () => {
        render(
            <BrowserRouter>
                <SignUpForm />
            </BrowserRouter>
        );
        expect(screen.getByText("Nom d'utilisateurice")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Mot de passe")).toBeInTheDocument();
        expect(screen.getByText("Confirmer le mot de passe")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Valider/i })).toBeInTheDocument(); // changer pour le vrai composant
    });
    it('should render SignUpForm component with correct input types', () => {
        const { container } = render(
            <BrowserRouter>
                <SignUpForm />
            </BrowserRouter>
        );
        expect(container.querySelector('input[type="text"]')).toBeInTheDocument();
        expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
        expect(container.querySelectorAll('input[type="password"]')[0]).toBeInTheDocument();
        expect(container.querySelectorAll('input[type="password"]')[1]).toBeInTheDocument();
    });
});

describe('SignUpForm Validation', () => {
    it('should display error message when no field is filled', async () => {
        const { emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Le nom d'utilisateurice ne doit pas être vide.")).toBeInTheDocument();
        });
    });

    it('should display error message when no username is filled', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Le nom d'utilisateurice ne doit pas être vide.")).toBeInTheDocument();
        });
    });

    it('should display error message when username is too short', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'name' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Le nom d'utilisateurice doit contenir au moins 8 caractères.")).toBeInTheDocument();
        });
    });

    it('should display error message when no email is filled', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("L'email ne doit pas être vide.")).toBeInTheDocument();
        });
    });

    it('should display error message when email is invalid', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("L'adresse email n'est pas valide.")).toBeInTheDocument();
        });
    });

    it('should display error message when no password is filled', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Le mot de passe ne doit pas être vide.")).toBeInTheDocument();
        });
    });

    it('should display error message when password is too short', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Le mot de passe doit contenir au moins 8 caractères.")).toBeInTheDocument();
        });
    });

    it('should display error message when passwords do not match', async () => {
        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'testuser123' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Les mots de passe ne correspondent pas.")).toBeInTheDocument();
        });
    });
});

describe('SignUpForm Redirection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should redirect to login on successful signup', async () => {
        const { signUpUser } = await import('../../services/AuthService');
        vi.mocked(signUpUser).mockResolvedValueOnce({
            status: 201,
            data: { username: 'testuser123', email: 'test@example.com' }
        });

        const { usernameInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setupForm();
        
        fireEvent.change(usernameInput, { target: { value: 'testuser123' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });
});

// vérifier que les datas s'envoient bien 

