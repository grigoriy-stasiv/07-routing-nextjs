
import NotesClient from '../../Notes.client';

type FilterPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilterPage({
  params,
}: FilterPageProps) {
  const { slug } = await params;
  const tag = slug[0] ?? 'all';

  return <NotesClient tag={tag} />;
}