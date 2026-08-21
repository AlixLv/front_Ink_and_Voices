import { useEffect, useState } from 'react';
import type { AddBookFormErrors, Theme, Type } from '../types/Book';
import { createBook, updateBook, getSingleBook, getThemes, getTypes, createType, createTheme } from '../services/BookService';
import { HttpError } from '../services/HttpError';

export const useAddBook = (bookId?: number) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [publishingHouse, setPublishingHouse] = useState<string>('');
    const [shortDescription, setShortDescription] = useState<string>('');
    const [publicationYear, setPublicationYear] = useState<string>('');
    const [resume, setResume] = useState<string>('');
    const [referenceLink, setReferenceLink] = useState<string>('');
    const [typeId, setTypeId] = useState<string>('');
    const [themeIds, setThemeIds] = useState<number[]>([]);

    const [types, setTypes] = useState<Type[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(true);

    const [errors, setErrors] = useState<AddBookFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [suggestionError, setSuggestionError] = useState<string | null>(null);

    // types/thèmes disponibles pour peupler le select et les checkboxes
    useEffect(() => {
        let isMounted = true;

        const fetchOptions = async () => {
            try {
                const [typesData, themesData] = await Promise.all([getTypes(), getThemes()]);
                if (isMounted) {
                    setTypes(typesData);
                    setThemes(themesData);
                }
            } catch {
                if (isMounted) {
                    setErrors({ global: 'Impossible de charger les types et thèmes.' });
                }
            } finally {
                if (isMounted) setIsLoadingOptions(false);
            }
        };

        fetchOptions();

        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (!bookId) return;
        let isMounted = true;

        getSingleBook(bookId)
            .then((book) => {
                if (!isMounted) return;
                setTitle(book.title);
                setAuthor(book.author);
                setPublishingHouse(book.publishing_house ?? '');
                setShortDescription(book.short_description);
                setPublicationYear(book.publication_year ?? '');
                setResume(book.resume ?? '');
                setReferenceLink(book.reference_link ?? '');
                setTypeId(String(book.type.id));
                setThemeIds(book.themes.map((theme) => theme.id));
            })
            .catch(() => {
                if (isMounted) {
                    setErrors({ global: 'Impossible de charger cette suggestion.' });
                }
            });

        return () => { isMounted = false; };
    }, [bookId]);

    const suggestType = async (name: string): Promise<boolean> => {
        setSuggestionError(null);
        try {
            const created = await createType(name.trim());
            setTypes((current) => [...current, created].sort((a, b) => a.type_name.localeCompare(b.type_name)));
            setTypeId(String(created.id));
            return true;
        } catch (e) {
            setSuggestionError(e instanceof HttpError ? e.message : "L'ajout a échoué, réessayez plus tard.");
            return false;
        }
    };

    const suggestTheme = async (name: string): Promise<boolean> => {
        setSuggestionError(null);
        try {
            const created = await createTheme(name.trim());
            setThemes((current) => [...current, created].sort((a, b) => a.theme_name.localeCompare(b.theme_name)));
            setThemeIds((current) => [...current, created.id]);
            return true;
        } catch (e) {
            setSuggestionError(e instanceof HttpError ? e.message : "L'ajout a échoué, réessayez plus tard.");
            return false;
        }
    };

    const toggleTheme = (id: number) => {
        setThemeIds((current) =>
            current.includes(id) ? current.filter((themeId) => themeId !== id) : [...current, id]
        );
    };

    const validateInputs = (): AddBookFormErrors => {
        const newErrors: AddBookFormErrors = {};

        if (title.trim().length === 0) {
            newErrors.title = 'Le titre ne doit pas être vide.';
        }
        if (author.trim().length === 0) {
            newErrors.author = "Le nom de l'autrice ou de l'auteur ne doit pas être vide.";
        }
        if (publishingHouse.trim().length === 0) {
            newErrors.publishing_house = "La maison d'édition ne doit pas être vide.";
        }
        if (shortDescription.trim().length === 0) {
            newErrors.short_description = 'La description courte ne doit pas être vide.';
        }
        if (typeId.length === 0) {
            newErrors.type_id = 'Choisissez un type.';
        }

        return newErrors;
    };

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setPublishingHouse('');
        setShortDescription('');
        setPublicationYear('');
        setResume('');
        setReferenceLink('');
        setTypeId('');
        setThemeIds([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsSuccess(false);

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            const input = {
                title,
                author,
                publishing_house: publishingHouse,
                short_description: shortDescription,
                publication_year: publicationYear || null,
                resume: resume || null,
                reference_link: referenceLink || null,
                type_id: Number(typeId),
                theme_ids: themeIds,
            };

            if (bookId) {
                await updateBook(bookId, input);
            } else {
                await createBook(input);
                resetForm();
            }
            setIsSuccess(true);
        } catch (error) {
            if (error instanceof HttpError) {
                setErrors({ global: error.message });
            } else {
                setErrors({ global: 'Une erreur est survenue, réessayez plus tard.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        title, setTitle,
        author, setAuthor,
        publishingHouse, setPublishingHouse,
        shortDescription, setShortDescription,
        publicationYear, setPublicationYear,
        resume, setResume,
        referenceLink, setReferenceLink,
        typeId, setTypeId,
        themeIds, toggleTheme,
        types, themes, isLoadingOptions,
        errors,
        isLoading,
        isSuccess,
        handleSubmit,
        suggestType,
        suggestTheme,
        suggestionError,
        isEditing: Boolean(bookId),
    };
};
