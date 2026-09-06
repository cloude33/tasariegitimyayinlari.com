import DirectoryListing from '@/components/DirectoryListing';

export default async function LegacyDirectoryPage({ params }) {
  const { segs } = await params;
  const initialPath = ['dosyalar', ...(segs || [])].join('/');
  return <DirectoryListing initialPath={initialPath} />;
}

export async function generateStaticParams() {
  return [];
}