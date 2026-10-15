import { SITE, absoluteUrl } from '@/lib/seo';

export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'c8e5f2a1b9d44810b65f396417724a3e';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export interface IndexNowResponse {
  success: boolean;
  status: number;
  message: string;
  urls: string[];
}

/**
 * Notifica a los motores de búsqueda (Bing, Yandex, etc.) sobre URLs creadas o actualizadas.
 * Cumple con el estándar de la especificación IndexNow.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  if (!urls || urls.length === 0) {
    return {
      success: false,
      status: 400,
      message: 'No URLs provided',
      urls: [],
    };
  }

  // Normalizar a URLs absolutas y remover duplicados
  const formattedUrls = Array.from(
    new Set(
      urls.map((u) => {
        if (u.startsWith('http://') || u.startsWith('https://')) {
          return u;
        }
        return absoluteUrl(u.startsWith('/') ? u : `/${u}`);
      })
    )
  );

  const payload = {
    host: SITE.domain,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE.domain}/${INDEXNOW_KEY}.txt`,
    urlList: formattedUrls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // IndexNow devuelve 200 (OK) o 202 (Accepted) en caso de éxito
    const isSuccess = res.status === 200 || res.status === 202;
    const responseText = await res.text().catch(() => '');

    console.info(`[IndexNow] Submitted ${formattedUrls.length} URLs. Status: ${res.status}`);

    return {
      success: isSuccess,
      status: res.status,
      message: isSuccess ? 'URLs submitted successfully to IndexNow' : `IndexNow error: ${responseText || res.statusText}`,
      urls: formattedUrls,
    };
  } catch (error: any) {
    console.error('[IndexNow Submit Error]:', error);
    return {
      success: false,
      status: 500,
      message: error.message || 'Error submitting to IndexNow',
      urls: formattedUrls,
    };
  }
}

/**
 * Genera la lista de URLs de un post de blog para todos los idiomas y las envía a IndexNow.
 */
export async function notifyBlogPostUpdate(slug: string): Promise<IndexNowResponse> {
  const cleanSlug = slug.replace(/\.md$/, '');
  const urlsToNotify = [
    `https://${SITE.domain}/blog/${cleanSlug}`,
    `https://${SITE.domain}/en/blog/${cleanSlug}`,
    `https://${SITE.domain}/pt-BR/blog/${cleanSlug}`,
    `https://${SITE.domain}/blog`,
    `https://${SITE.domain}/sitemap.xml`,
  ];

  return submitToIndexNow(urlsToNotify);
}
