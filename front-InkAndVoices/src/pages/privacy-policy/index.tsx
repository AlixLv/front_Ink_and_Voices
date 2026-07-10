import { useNavigate } from 'react-router-dom'
import styles from './privacy-policy.module.css'

const emailLink = (
  
    <a href="mailto:inkandvoices264@gmail.com"
    aria-label="Envoyer un email à Ink and Voices"
    className={styles.link}
  >
    inkandvoices264@gmail.com
  </a>
)

const sections = [
  {
    title: 'Responsable du traitement',
    content: (
      <p className={styles.sectionContent}>
        Ce projet est développé et géré par Ink&Voices. Pour toute question relative à vos données
        personnelles, vous pouvez nous contacter à l'adresse suivante : {emailLink}
      </p>
    ),
  },
  {
    title: 'Données collectées',
    content: (
      <p className={styles.sectionContent}>
        Nous collectons certaines de vos données afin de vous permettre de vous identifier, notamment
        votre adresse e-mail et votre pseudo. Nous utilisons également un cookie de session,
        nécessaire au bon fonctionnement du site (il permet de vous garder connecté·e). Ce cookie ne
        sert à aucun autre usage (pas de suivi publicitaire ni de profilage).
      </p>
    ),
  },
  {
    title: 'Base légale du traitement',
    content: (
      <p className={styles.sectionContent}>
        Ces données sont collectées sur la base de l'exécution du service que vous demandez (la
        création et l'utilisation de votre compte). Sans ces données, il n'est pas possible de vous
        fournir un accès au service.
      </p>
    ),
  },
  {
    title: 'Utilisation des données',
    content: (
      <p className={styles.sectionContent}>
        Ces données ne sont utilisées que dans un but d'authentification et ne sont en aucun cas
        consultées ou utilisées à d'autres fins.
      </p>
    ),
  },
  {
    title: 'Partage des données',
    content: (
      <p className={styles.sectionContent}>
        Vos données sont hébergées en France / dans l'Union européenne et ne sont partagées avec
        aucun tiers en dehors des outils techniques nécessaires au fonctionnement du service
        (hébergeur, base de données).
      </p>
    ),
  },
  {
    title: 'Durée de conservation',
    content: (
      <p className={styles.sectionContent}>
        Vos données sont conservées tant que votre compte est actif. Elles sont supprimées dès que
        vous en faites la demande.
      </p>
    ),
  },
  {
    title: 'Protection des données',
    content: (
      <p className={styles.sectionContent}>
        Vos données sont stockées dans une base de données privée et les informations sensibles
        telles que le mot de passe sont chiffrées et donc illisibles par nos équipes.
      </p>
    ),
  },
  {
    title: 'Vos droits',
    content: (
      <ul className={styles.rightsList} aria-label="Liste de vos droits">
        {[
          { label: "Droit d'accès", desc: 'consulter les données que nous détenons sur vous' },
          { label: 'Droit de rectification', desc: 'corriger des données inexactes' },
          { label: "Droit à l'effacement", desc: 'demander la suppression de vos données' },
          { label: "Droit d'opposition", desc: 'vous opposer au traitement de vos données' },
        ].map(({ label, desc }) => (
          <li key={label} className={styles.rightsItem}>
            <span className={styles.rightsLabel}>{label}</span> : {desc}
          </li>
        ))}
        <li className={styles.rightsItem} style={{ marginTop: '8px' }}>
          Vous pouvez exercer ces droits à tout moment, sans justification, en nous contactant
          à {emailLink}
        </li>
      </ul>
    ),
  },
  {
    title: 'Modifications de cette politique',
    content: (
      <p className={styles.sectionContent}>
        Cette politique de confidentialité peut être mise à jour. La date de dernière modification
        est indiquée en haut de ce document.
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <button
            onClick={() => navigate(-1)}
            aria-label="Retour à la page précédente"
            className={styles.backButton}
          >
            <BackIcon />
          </button>
          <h1 className={styles.pageTitle}>Politique de confidentialité</h1>
        </div>

        <main className={styles.content}>
          <p className={styles.date}>
            <time dateTime="2026-07-10">Dernière mise à jour : 10 juillet 2026</time>
          </p>

          {sections.map((section) => (
            <section key={section.title} aria-labelledby={section.title} className={styles.section}>
              <h2 id={section.title} className={styles.sectionTitle}>
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </main>

        <div className={styles.footer}>
          <button onClick={() => navigate(-1)} className={styles.returnButton}>
            Retour
          </button>
        </div>

      </div>
    </div>
  )
}

const BackIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
)