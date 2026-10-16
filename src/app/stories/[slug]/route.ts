import { NextRequest, NextResponse } from 'next/server';
import { getStoryBySlug, renderAmpStoryHtml } from '@/lib/stories';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return new NextResponse('Historia no encontrada', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const html = renderAmpStoryHtml(story);

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
