import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const mockUseAuth = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
    useAuth: () => mockUseAuth(),
}));

const renderNavBar = () =>
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    );

const clickProfile = () => {
    const profileButtons = screen.getAllByRole('button', { name: 'Profil' });
    fireEvent.click(profileButtons[0]);
};

describe('NavBar Profile navigation', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('navigates to the profile page when the user is authenticated', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            isLoading: false,
            id: 'user-123',
        });

        renderNavBar();
        clickProfile();

        expect(mockNavigate).toHaveBeenCalledWith('/profile/user-123');
    });

    it('navigates to the login-required gate page when the user is not authenticated', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            id: null,
        });

        renderNavBar();
        clickProfile();

        expect(mockNavigate).toHaveBeenCalledWith('/login-required');
    });

    it('does nothing while the auth status is still loading', () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            isLoading: true,
            id: null,
        });

        renderNavBar();
        clickProfile();

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
