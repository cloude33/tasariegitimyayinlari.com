import PolicyPage from '@/components/PolicyPage';
import policies from '@/data/policies';

export const metadata = {
  title: 'Kişisel Verilerin Korunması | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları kişisel verilerin korunması kanunu aydınlatma metni.',
};

export default function KisiselVerilerinKorunmasi() {
  return <PolicyPage policy={policies['kisisel-verilerin-korunmasi']} slug="kisisel-verilerin-korunmasi" />;
}