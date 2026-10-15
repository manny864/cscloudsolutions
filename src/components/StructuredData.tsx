import React from 'react';

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonString = JSON.stringify(data).replace(/<\/script>/g, '<\\/script>');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
