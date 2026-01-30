import React from 'react';

type StructuredDataType = 'HowTo' | 'Quotation' | 'WebSite';

interface StructuredDataProps {
    type: StructuredDataType;
    data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
    let schema = {};

    if (type === 'HowTo') {
        schema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": data.name,
            "description": data.description,
            "step": data.steps.map((step: any, index: number) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.name,
                "text": step.text,
                "url": typeof window !== 'undefined' ? window.location.href : undefined
            }))
        };
    } else if (type === 'Quotation') {
        schema = {
            "@context": "https://schema.org",
            "@type": "Quotation",
            "creator": {
                "@type": "Person",
                "name": data.author
            },
            "text": data.text
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
