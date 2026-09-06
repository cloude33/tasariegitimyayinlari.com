import PolicyPage from '@/components/PolicyPage';
import policies from '@/data/policies';

export const metadata = {
  title: 'Ticari Elektronik İleti | Tasarı Eğitim Yayınları',
  description: 'Tasarı Eğitim Yayınları ticari elektronik ileti onay metni.',
};

export default function TicariElektronikIleti() {
  return <PolicyPage policy={policies['ticari-elektronik-ileti']} slug="ticari-elektronik-ileti" />;
}