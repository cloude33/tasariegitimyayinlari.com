import PolicyPage from '@/components/PolicyPage';
import policies from '@/data/policies';

export const metadata = {
  title: 'KVKK Açık Rıza Metni | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları kişisel verilerin işlenmesine yönelik KVKK açık rıza metni.',
};

export default function AcikRizaMetni() {
  return <PolicyPage policy={policies['acik-riza-metni']} slug="acik-riza-metni" />;
}