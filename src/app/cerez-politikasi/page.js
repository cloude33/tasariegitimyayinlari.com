import PolicyPage from '@/components/PolicyPage';
import policies from '@/data/policies';

export const metadata = {
  title: 'Çerez Politikası | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları çerez politikası.',
};

export default function CerezPolitikasi() {
  return <PolicyPage policy={policies['cerez-politikasi']} slug="cerez-politikasi" />;
}