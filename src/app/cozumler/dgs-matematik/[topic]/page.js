import DirectoryListing from '@/components/DirectoryListing';

export default async function DgsMatematikTopicPage({ params }) {
  const { topic } = await params;
  const initialPath = `dosyalar/cozumler/dgs-deneme-sinav-cozumleri/dgs-soru-bankasi-matematik/${topic}`;
  return <DirectoryListing initialPath={initialPath} />;
}