import { useState } from 'react';
import { useAddBook } from '../../hooks/useAddBook';
import '../Auth/AuthForm/AuthForm.css';
import styles from './AddBookForm.module.css';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function AddBookForm({ bookId }: { bookId?: number }) {
    const {
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
        isEditing,
    } = useAddBook(bookId);

    const [newTypeName, setNewTypeName] = useState<string>('');
    const [newThemeName, setNewThemeName] = useState<string>('');
    const [showTypeInput, setShowTypeInput] = useState<boolean>(false);
    const [showThemeInput, setShowThemeInput] = useState<boolean>(false);

    const handleSuggestType = async () => {
        if (newTypeName.trim() === '') return;
        const created = await suggestType(newTypeName);
        if (created) {
            setNewTypeName('');
            setShowTypeInput(false);
        }
    };

    const handleSuggestTheme = async () => {
        if (newThemeName.trim() === '') return;
        const created = await suggestTheme(newThemeName);
        if (created) {
            setNewThemeName('');
            setShowThemeInput(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.confirmation} role="status">
                {isEditing
                    ? 'Votre suggestion a bien été mise à jour.'
                    : 'Merci ! Votre suggestion a bien été envoyée et est en attente de validation.'}
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <p className={styles.requiredLegend}>
                    <span aria-hidden="true">*</span> Champs obligatoires
                </p>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        <span className={styles.labelText}>Titre <span className={styles.requiredMark} aria-hidden="true">*</span></span>
                        <input
                            className="auth-form-field"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            disabled={isLoading}
                            required
                            aria-invalid={!!errors.title}
                            aria-describedby={errors.title ? 'title-error' : undefined}
                        />
                    </label>
                    {errors.title && <output id="title-error" role="alert" className="auth-form-error">{errors.title}</output>}
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        <span className={styles.labelText}>Autrice / auteur <span className={styles.requiredMark} aria-hidden="true">*</span></span>
                        <input
                            className="auth-form-field"
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            disabled={isLoading}
                            required
                            aria-invalid={!!errors.author}
                            aria-describedby={errors.author ? 'author-error' : undefined}
                        />
                    </label>
                    {errors.author && <output id="author-error" role="alert" className="auth-form-error">{errors.author}</output>}
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        <span className={styles.labelText}>Maison d'édition <span className={styles.requiredMark} aria-hidden="true">*</span></span>
                        <input
                            className="auth-form-field"
                            type="text"
                            value={publishingHouse}
                            onChange={e => setPublishingHouse(e.target.value)}
                            disabled={isLoading}
                            required
                            aria-invalid={!!errors.publishing_house}
                            aria-describedby={errors.publishing_house ? 'publishing-house-error' : undefined}
                        />
                    </label>
                    {errors.publishing_house && <output id="publishing-house-error" role="alert" className="auth-form-error">{errors.publishing_house}</output>}
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Année de publication
                        <input
                            className="auth-form-field"
                            type="text"
                            value={publicationYear}
                            onChange={e => setPublicationYear(e.target.value)}
                            disabled={isLoading}
                        />
                    </label>
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        <span className={styles.labelText}>Description courte <span className={styles.requiredMark} aria-hidden="true">*</span></span>
                        <textarea
                            className="auth-form-field"
                            value={shortDescription}
                            onChange={e => setShortDescription(e.target.value)}
                            disabled={isLoading}
                            required
                            aria-invalid={!!errors.short_description}
                            aria-describedby={errors.short_description ? 'short-description-error' : undefined}
                        />
                    </label>
                    {errors.short_description && <output id="short-description-error" role="alert" className="auth-form-error">{errors.short_description}</output>}
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Résumé
                        <textarea
                            className="auth-form-field"
                            value={resume}
                            onChange={e => setResume(e.target.value)}
                            disabled={isLoading}
                        />
                    </label>
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        Lien de référence
                        <input
                            className="auth-form-field"
                            type="text"
                            value={referenceLink}
                            onChange={e => setReferenceLink(e.target.value)}
                            disabled={isLoading}
                        />
                    </label>
                </div>

                <div className="auth-form-field-group">
                    <label className="auth-form-label">
                        <span className={styles.labelText}>Genre <span className={styles.requiredMark} aria-hidden="true">*</span></span>
                        <select
                            className="auth-form-field"
                            value={typeId}
                            onChange={e => setTypeId(e.target.value)}
                            disabled={isLoading || isLoadingOptions}
                            required
                            aria-invalid={!!errors.type_id}
                            aria-describedby={errors.type_id ? 'type-error' : undefined}
                        >
                            <option value="">Sélectionner un genre</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.id}>{type.type_name}</option>
                            ))}
                        </select>
                    </label>
                    {errors.type_id && <output id="type-error" role="alert" className="auth-form-error">{errors.type_id}</output>}
                    {!showTypeInput && (
                        <button
                            type="button"
                            className={styles.suggestOptionButton}
                            onClick={() => setShowTypeInput(true)}
                        >
                            + Proposer un genre
                        </button>
                    )}
                    {showTypeInput && (
                        <div className={styles.suggestOptionRow}>
                            <label className="auth-form-label">
                                Nouveau genre
                                <input
                                    className="auth-form-field"
                                    type="text"
                                    value={newTypeName}
                                    onChange={(e) => setNewTypeName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </label>
                            <button
                                type="button"
                                className={styles.suggestOptionButton}
                                onClick={handleSuggestType}
                                disabled={isLoading || newTypeName.trim() === ''}
                            >
                                Ajouter ce genre
                            </button>
                        </div>
                    )}
                </div>

                <div className={`auth-form-field-group ${styles.themeFieldGroup}`}>
                    <span className="auth-form-label">Thèmes</span>
                    <div className={styles.themeCheckboxes}>
                        {themes.map((theme) => (
                            <label key={theme.id} className={styles.themeCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={themeIds.includes(theme.id)}
                                    onChange={() => toggleTheme(theme.id)}
                                    disabled={isLoading || isLoadingOptions}
                                />
                                {theme.theme_name}
                            </label>
                        ))}
                    </div>
                    {!showThemeInput && (
                        <button
                            type="button"
                            className={styles.suggestOptionButton}
                            onClick={() => setShowThemeInput(true)}
                        >
                            + Proposer un thème
                        </button>
                    )}
                    {showThemeInput && (
                        <div className={styles.suggestOptionRow}>
                            <label className="auth-form-label">
                                Nouveau thème
                                <input
                                    className="auth-form-field"
                                    type="text"
                                    value={newThemeName}
                                    onChange={(e) => setNewThemeName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </label>
                            <button
                                type="button"
                                className={styles.suggestOptionButton}
                                onClick={handleSuggestTheme}
                                disabled={isLoading || newThemeName.trim() === ''}
                            >
                                Ajouter ce thème
                            </button>
                        </div>
                    )}
                </div>

                {suggestionError && <output role="alert" className="auth-form-error">{suggestionError}</output>}
                {errors.global && <output role="alert" className="auth-form-error">{errors.global}</output>}
                <div className="submit-button-container">
                    <SubmitButton
                        text={isLoading ? 'Envoi en cours...' : isEditing ? 'Enregistrer les modifications' : 'Proposer ce livre'}
                        type="submit"
                        disabled={isLoading || isLoadingOptions}
                    />
                </div>
            </form>
        </div>
    );
}
