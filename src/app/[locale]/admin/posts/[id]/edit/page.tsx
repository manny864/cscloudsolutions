import { getAdminPostById } from '@/app/_actions/cmsActions';
import { notFound } from 'next/navigation';
import EditPostForm from './EditPostForm';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getAdminPostById(postId);

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}
