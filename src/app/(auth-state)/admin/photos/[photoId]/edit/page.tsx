import { redirect } from 'next/navigation';
import { getPhotoCached } from '@/cache';
import { PATH_ADMIN } from '@/site/paths';
import PhotoEditPageClient from '@/photo/PhotoEditPageClient';

export const runtime = 'edge';

export default async function PhotoEditPage({
  params: { photoId },
}: {
  params: { photoId: string }
}) {
  const photo = await getPhotoCached(photoId);

  if (!photo) { redirect(PATH_ADMIN); }

  return (
    <PhotoEditPageClient {...{ photo }} />
  );
};
