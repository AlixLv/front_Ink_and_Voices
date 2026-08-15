import { useAddBook } from '../../hooks/useAddBook';
import '../Auth/AuthForm/AuthForm.css';
import styles from './AddBookForm.module.css';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function AddBookForm() {
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
    } = useAddBook();

    if (isSuccess) {
        return (
            <div className={styles.confirmation} role="status">
                Merci ! Votre suggestion a bien été envoyée et est en attente de validation.
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
                    <button
                        type="button"
                        className={styles.suggestThemeButton}
                        disabled
                        aria-disabled="true"
                        title="Cette fonctionnalité n'est pas encore disponible"
                    >
                        + Proposer un thème <span className={styles.comingSoon}>(bientôt disponible)</span>
                    </button>
                </div>

                {errors.global && <output role="alert" className="auth-form-error">{errors.global}</output>}
                <div className="submit-button-container">
                    <SubmitButton
                        text={isLoading ? 'Envoi en cours...' : 'Proposer ce livre'}
                        type="submit"
                        disabled={isLoading || isLoadingOptions}
                    />
                </div>
            </form>
        </div>
    );
}
