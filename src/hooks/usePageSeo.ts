import { useEffect } from 'react';
import { PageSeoData, getSeoForPath, updateDocumentSeo } from '../data/seoRegistry';

/**
 * Hook to automatically synchronize title, meta description, meta keywords, canonical,
 * OpenGraph, Twitter card, and Schema JSON-LD on route/page change.
 */
export function usePageSeo(customData?: Partial<PageSeoData> & { path?: string }): void {
  useEffect(() => {
    const currentPath = customData?.path || window.location.pathname;
    const baseSeo = getSeoForPath(currentPath);

    const mergedData: PageSeoData = {
      ...baseSeo,
      ...customData,
      keywords: customData?.keywords && customData.keywords.length > 0 
        ? customData.keywords 
        : baseSeo.keywords
    };

    updateDocumentSeo(mergedData);
  }, [
    customData?.path,
    customData?.title,
    customData?.description,
    customData?.canonicalPath,
    JSON.stringify(customData?.keywords)
  ]);
}
