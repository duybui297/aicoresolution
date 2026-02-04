import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to update document title and meta description based on current language
 */
export function useDocumentMeta() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Update document title
        document.title = t('meta.title');

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('meta.description'));
        }

        // Update Open Graph meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', t('meta.title'));
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', t('meta.description'));
        }

        // Update Twitter meta tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', t('meta.title'));
        }

        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', t('meta.description'));
        }
    }, [t, i18n.language]); // Re-run when language changes
}
