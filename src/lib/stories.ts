import { WebStory } from '@/types/story';
import { storiesData } from '@/content/stories';

export function getAllStories(): WebStory[] {
  return storiesData;
}

export function getStoryBySlug(slug: string): WebStory | undefined {
  return storiesData.find((story) => story.slug === slug);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderAmpStoryHtml(story: WebStory): string {
  const canonicalUrl = `https://cscloudsolutions.com.ar/stories/${story.slug}`;
  const publisherLogo = story.publisherLogo || 'https://cscloudsolutions.com.ar/images/Logo_CSCloudSolutions.png';
  const authorLinkedIn = story.authorLinkedIn || 'https://linkedin.com/in/manuel-enrique-chavez-manzano/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: story.title,
    description: story.excerpt,
    image: [story.posterPortrait],
    datePublished: story.publishedTime,
    dateModified: story.modifiedTime,
    author: [
      {
        '@type': 'Person',
        name: story.author,
        jobTitle: story.authorJobTitle || 'Cloud & FinOps Specialist',
        url: story.authorUrl || 'https://cscloudsolutions.com.ar',
        sameAs: [authorLinkedIn],
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: story.publisherName || 'CSCloudSolutions',
      url: 'https://cscloudsolutions.com.ar',
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
  };

  const pagesHtml = story.pages
    .map((page, index) => {
      const isCover = index === 0;
      const headingTag = isCover ? 'h1' : 'h2';

      const bulletsHtml = page.bullets && page.bullets.length > 0
        ? `<ul class="bullet-list">
            ${page.bullets.map((b) => `<li><span class="bullet-dot">✓</span><span>${escapeHtml(b)}</span></li>`).join('\n')}
           </ul>`
        : '';

      const highlightHtml = page.highlight
        ? `<div class="highlight-pill">${escapeHtml(page.highlight)}</div>`
        : '';

      const outlinkHtml = page.ctaUrl && page.ctaText
        ? `<amp-story-page-outlink layout="nodisplay">
             <a href="${escapeHtml(page.ctaUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(page.ctaText)}</a>
           </amp-story-page-outlink>`
        : '';

      return `
      <!-- Página ${index + 1}: ${escapeHtml(page.id)} -->
      <amp-story-page id="${escapeHtml(page.id)}">
        <amp-story-grid-layer template="fill" class="bg-layer bg-${page.bgGradient || 'navy'}"></amp-story-grid-layer>
        
        <amp-story-grid-layer template="vertical" class="card-content">
          ${page.badge ? `<div class="badge-wrapper"><span class="badge">${escapeHtml(page.badge)}</span></div>` : ''}
          <${headingTag} class="page-title">${escapeHtml(page.title)}</${headingTag}>
          ${highlightHtml}
          <p class="page-desc">${escapeHtml(page.description)}</p>
          ${bulletsHtml}
        </amp-story-grid-layer>

        ${outlinkHtml}
      </amp-story-page>`;
    })
    .join('\n');

  return `<!doctype html>
<html ⚡ lang="es">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(story.title)} | CSCloudSolutions</title>
    <link rel="canonical" href="${canonicalUrl}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="description" content="${escapeHtml(story.excerpt)}">
    
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
    <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>

    <script type="application/ld+json">
      ${JSON.stringify(jsonLd)}
    </script>

    <style amp-custom>
      amp-story {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #FFFFFF;
      }
      
      .bg-layer {
        width: 100%;
        height: 100%;
      }
      .bg-navy {
        background: linear-gradient(145deg, #070D15 0%, #0E1A2B 55%, #16273F 100%);
      }
      .bg-dark {
        background: radial-gradient(circle at top right, #1F3A5F 0%, #0E1A2B 60%, #070D15 100%);
      }
      .bg-slate {
        background: linear-gradient(180deg, #16273F 0%, #0A121E 100%);
      }
      .bg-cyan {
        background: linear-gradient(135deg, #070D15 0%, #004F8A 60%, #00AEEF 100%);
      }

      .card-content {
        padding: 40px 24px 60px 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
      }

      .badge-wrapper {
        margin-bottom: 16px;
      }
      .badge {
        display: inline-block;
        padding: 6px 14px;
        border-radius: 9999px;
        background-color: rgba(0, 174, 239, 0.18);
        border: 1px solid rgba(0, 174, 239, 0.4);
        color: #38BDF8;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .page-title {
        font-size: 26px;
        font-weight: 800;
        line-height: 1.25;
        color: #FFFFFF;
        margin: 0 0 16px 0;
        letter-spacing: -0.02em;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5);
      }

      .highlight-pill {
        display: inline-block;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(8px);
        border-left: 3px solid #00AEEF;
        padding: 10px 14px;
        margin-bottom: 16px;
        color: #E2E8F0;
        font-size: 14px;
        font-weight: 600;
        border-radius: 0 8px 8px 0;
      }

      .page-desc {
        font-size: 16px;
        line-height: 1.55;
        color: #CBD5E1;
        margin: 0 0 20px 0;
      }

      .bullet-list {
        list-style: none;
        padding: 0;
        margin: 0 0 20px 0;
      }
      .bullet-list li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 12px;
        font-size: 14px;
        color: #F1F5F9;
        line-height: 1.45;
      }
      .bullet-dot {
        color: #00AEEF;
        font-weight: bold;
        flex-shrink: 0;
      }
    </style>
  </head>
  <body>
    <amp-story standalone
        title="${escapeHtml(story.title)}"
        publisher="${escapeHtml(story.publisherName || 'CSCloudSolutions')}"
        publisher-logo-src="${publisherLogo}"
        poster-portrait-src="${story.posterPortrait}">
      ${pagesHtml}
    </amp-story>
  </body>
</html>`;
}
