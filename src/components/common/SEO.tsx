import React, { useEffect } from 'react';
import { COMPANY_INFO } from '../../data/companyData';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article' | 'product';
  isFieldSure?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = '/',
  type = 'website',
  isFieldSure = false,
}) => {
  const fullTitle = title
    ? `${title} | ${COMPANY_INFO.name}`
    : `${COMPANY_INFO.name} | Software Development & Enterprise Technology`;

  const metaDescription =
    description ||
    'Savrdh Technologies is a software development company building websites, web applications, Android & iOS apps, custom enterprise systems, and FieldSure™ SaaS.';

  useEffect(() => {
    // Document title
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metaDescription);

    // OpenGraph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', fullTitle);
    setMetaTag('og:description', metaDescription);
    setMetaTag('og:type', type);
    setMetaTag('og:site_name', COMPANY_INFO.name);
    setMetaTag('og:url', window.location.origin + path);

    // Structured Data JSON-LD
    const orgSchemaId = 'savrdh-org-schema';
    let scriptTag = document.getElementById(orgSchemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = orgSchemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const orgData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      legalName: COMPANY_INFO.legalName,
      url: window.location.origin,
      telephone: '+91' + COMPANY_INFO.phone,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91' + COMPANY_INFO.phone,
          contactType: 'sales and customer support',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
      ],
      description: COMPANY_INFO.description,
      knowsAbout: [
        'Software Development',
        'Web Application Development',
        'Android App Development',
        'iOS App Development',
        'Enterprise SaaS',
        'Field Workforce Management',
      ],
    };

    const fieldSureData = isFieldSure
      ? {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'FieldSure™',
          operatingSystem: 'Android, iOS, Web',
          applicationCategory: 'BusinessApplication',
          description:
            'FieldSure™ helps organisations manage field employees through verified attendance, live operational visibility, geofenced tasks, field evidence, expenses and performance reporting.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
            description: 'Custom Enterprise Subscription & Live Demo',
          },
          provider: {
            '@type': 'Organization',
            name: COMPANY_INFO.name,
          },
        }
      : null;

    scriptTag.textContent = JSON.stringify(fieldSureData ? [orgData, fieldSureData] : orgData);
  }, [fullTitle, metaDescription, path, type, isFieldSure]);

  return null;
};
