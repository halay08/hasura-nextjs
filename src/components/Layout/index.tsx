import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContent from '@/components/PageContent';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <div>
      <Header />
      <PageContent>{children}</PageContent>
      <Footer />
    </div>
  );
}
