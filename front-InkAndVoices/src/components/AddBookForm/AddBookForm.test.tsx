import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddBookForm from './AddBookForm';

vi.mock('../../services/BookService', () => ({
    getTypes: vi.fn(),
    getThemes: vi.fn(),
    createBook: vi.fn(),
}));

const mockTypes = [{ id: 1, type_name: 'Roman' }];
const mockThemes = [{ id: 1, theme_name: 'Féminisme' }];

const renderForm = () =>
    render(
        <BrowserRouter>
            <AddBookForm />
        </BrowserRouter>
    );

const fillRequiredFields = () => {
    fireEvent.change(screen.getByLabelText(/Titre/), { target: { value: 'Mon Livre' } });
    fireEvent.change(screen.getByLabelText(/Autrice \/ auteur/), { target: { value: 'Autrice Test' } });
    fireEvent.change(screen.getByLabelText(/Maison d'édition/), { target: { value: 'Maison Test' } });
    fireEvent.change(screen.getByLabelText(/Description courte/), { target: { value: 'Une description.' } });
    fireEvent.change(screen.getByLabelText(/Type/), { target: { value: '1' } });
};

describe('AddBookForm Validation', () => {
    beforeEach(async () => {
        vi.clearAllMocks();
        const { getTypes, getThemes } = await import('../../services/BookService');
        vi.mocked(getTypes).mockResolvedValue(mockTypes);
        vi.mocked(getThemes).mockResolvedValue(mockThemes);
    });

    it('shows validation errors and does not call createBook when required fields are empty', async () => {
        const { createBook } = await import('../../services/BookService');
        renderForm();

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Roman' })).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Proposer ce livre/i }));

        await waitFor(() => {
            expect(screen.getByText('Le titre ne doit pas être vide.')).toBeInTheDocument();
        });
        expect(screen.getByText("Le nom de l'autrice ou de l'auteur ne doit pas être vide.")).toBeInTheDocument();
        expect(screen.getByText("La maison d'édition ne doit pas être vide.")).toBeInTheDocument();
        expect(screen.getByText('La description courte ne doit pas être vide.')).toBeInTheDocument();
        expect(screen.getByText('Choisissez un type.')).toBeInTheDocument();
        expect(createBook).not.toHaveBeenCalled();
    });
});

describe('AddBookForm Submission', () => {
    beforeEach(async () => {
        vi.clearAllMocks();
        const { getTypes, getThemes } = await import('../../services/BookService');
        vi.mocked(getTypes).mockResolvedValue(mockTypes);
        vi.mocked(getThemes).mockResolvedValue(mockThemes);
    });

    it('calls createBook with the form data and shows a confirmation message on success', async () => {
        const { createBook } = await import('../../services/BookService');
        vi.mocked(createBook).mockResolvedValueOnce({
            id: 1,
            title: 'Mon Livre',
            author: 'Autrice Test',
            short_description: 'Une description.',
            publishing_house: 'Maison Test',
            type: mockTypes[0],
            themes: [],
        } as any);

        renderForm();

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Roman' })).toBeInTheDocument();
        });

        fillRequiredFields();
        fireEvent.click(screen.getByRole('button', { name: /Proposer ce livre/i }));

        await waitFor(() => {
            expect(createBook).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Mon Livre',
                    author: 'Autrice Test',
                    publishing_house: 'Maison Test',
                    short_description: 'Une description.',
                    type_id: 1,
                    theme_ids: [],
                })
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/Merci ! Votre suggestion a bien été envoyée/)).toBeInTheDocument();
        });
    });
});
