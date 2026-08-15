import { useEffect, useState } from 'react';
import type { AddBookFormErrors, Theme, Type } from '../types/Book';
import { createBook, getThemes, getTypes } from '../services/BookService';
import { HttpError } from '../services/HttpError';

export const useAddBook = () => {
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
                    setErrors({ global: 'Impossible de charger les genres et thèmes.' });
                }
            } finally {
                if (isMounted) setIsLoadingOptions(false);
            }
        };

        fetchOptions();

        return () => { isMounted = false; };
    }, []);

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
            newErrors.type_id = 'Choisissez un genre.';
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
            await createBook({
                title,
                author,
                publishing_house: publishingHouse,
                short_description: shortDescription,
                publication_year: publicationYear || null,
                resume: resume || null,
                reference_link: referenceLink || null,
                type_id: Number(typeId),
                theme_ids: themeIds,
            });

            resetForm();
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
    };
};
