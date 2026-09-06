import PolicyPage from '@/components/PolicyPage';
import policies from '@/data/policies';

export const metadata = {
  title: 'Gizlilik Politikası | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları gizlilik politikası.',
};

export default function GizlilikPolitikasi() {
  return <PolicyPage policy={policies['gizlilik-politikasi']} slug="gizlilik-politikasi" />;
}