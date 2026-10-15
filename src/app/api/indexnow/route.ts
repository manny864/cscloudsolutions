import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow, notifyBlogPostUpdate, INDEXNOW_KEY, INDEXNOW_ENDPOINT } from '@/lib/indexnow';
import { SITE } from '@/lib/seo';

export async function GET() {
  return NextResponse.json({
    status: 'active',
    protocol: 'IndexNow',
    host: SITE.domain,
    endpoint: INDEXNOW_ENDPOINT,
    keyLocation: `https://${SITE.domain}/${INDEXNOW_KEY}.txt`,
    documentation: 'https://www.indexnow.org/documentation',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { urls, slug } = body;

    if (slug && typeof slug === 'string') {
      const result = await notifyBlogPostUpdate(slug);
      return NextResponse.json(result, { status: result.success ? 200 : 502 });
    }

    if (Array.isArray(urls) && urls.length > 0) {
      const result = await submitToIndexNow(urls);
      return NextResponse.json(result, { status: result.success ? 200 : 502 });
    }

    return NextResponse.json(
      {
        error: 'Petición inválida. Debe enviar "slug" (string) o "urls" (array de URLs).',
      },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'Error interno en endpoint IndexNow',
        details: err.message,
      },
      { status: 500 }
    );
  }
}
