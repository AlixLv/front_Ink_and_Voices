import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

// mocks
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('../../../../contexts/AuthContext', () => ({
    useAuth: () => ({
        login: vi.fn(),
    }),
}));

vi.mock('../../../../services/AuthService', () => ({
    loginUser: vi.fn(),
}));

const setupForm = () => {
    const { container } = render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
    );
    return {
        emailInput: container.querySelector('input[type="email"]') as HTMLInputElement,
        passwordInput: container.querySelector('input[type="password"]') as HTMLInputElement,
        submitButton: screen.getByRole('button', { name: /Valider/i })
    };
};

describe('LoginForm Component', () => {
    it('should render LoginForm component with email and password fields', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Mot de passe')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Valider/i })).toBeInTheDocument();
    });
});

describe('LoginForm Validation', () => {
    it('should display error when email is empty', async () => {
        const { emailInput, passwordInput, submitButton } = setupForm();
        
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("L'email ne doit pas être vide.")).toBeInTheDocument();
        });
    });

    it('should display error when email is invalid', async () => {
        const { emailInput, passwordInput, submitButton } = setupForm();
        
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("L'adresse email n'est pas valide.")).toBeInTheDocument();
        });
    });

    it('should display error when password is too short', async () => {
        const { emailInput, passwordInput, submitButton } = setupForm();
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText("Le mot de passe doit contenir au moins 8 caractères.")).toBeInTheDocument();
        });
    });
});

describe('LoginForm Redirection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should redirect to home on successful login', async () => {
        const { loginUser } = await import('../../../../services/AuthService');
        vi.mocked(loginUser).mockResolvedValueOnce({
            status: 200,
            data: { email: 'test@example.com', username: 'testuser' }
        });

        const { emailInput, passwordInput, submitButton } = setupForm();
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});