import SolutionPortal from '@/components/SolutionPortal';
import solutionsData from '@/data/solutions.json';

export const metadata = {
  title: 'DGS Deneme Çözümleri | Tasarı Eğitim Yayınları',
  description: 'DGS deneme sınavı çözümleri. Tüm deneme kitaplarının çözümleri ücretsiz sunulmaktadır.',
};

export default function DgsDenemelerPage() {
  return <SolutionPortal data={solutionsData['dgs-denemeleri-page']} slug="dgs-denemeleri-page" />;
}
