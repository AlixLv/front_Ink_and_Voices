import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AddBook from './add-book';

const mockUseAuth = vi.fn();
vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => mockUseAuth(),
}));

vi.mock('../components/AddBookForm/AddBookForm', () => ({
    default: () => <div>AddBookForm stub</div>,
}));

vi.mock('../components/BackButton/BackButton', () => ({
    default: () => <div>BackButton stub</div>,
}));

const renderAddBookPage = () =>
    render(
        <MemoryRouter initialEntries={['/add-book']}>
            <Routes>
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/login-required" element={<div>Login Required Page</div>} />
            </Routes>
        </MemoryRouter>
    );

describe('AddBook page auth gate', () => {
    it('redirects to /login-required when not authenticated', async () => {
        mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: false });

        renderAddBookPage();

        await waitFor(() => {
            expect(screen.getByText('Login Required Page')).toBeInTheDocument();
        });
        expect(screen.queryByText('AddBookForm stub')).not.toBeInTheDocument();
    });

    it('renders nothing while auth status is still loading', () => {
        mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: true });

        const { container } = renderAddBookPage();

        expect(container).toBeEmptyDOMElement();
        expect(screen.queryByText('Login Required Page')).not.toBeInTheDocument();
        expect(screen.queryByText('AddBookForm stub')).not.toBeInTheDocument();
    });

    it('renders the form when authenticated', () => {
        mockUseAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });

        renderAddBookPage();

        expect(screen.getByText('AddBookForm stub')).toBeInTheDocument();
        expect(screen.getByText('BackButton stub')).toBeInTheDocument();
    });
});
