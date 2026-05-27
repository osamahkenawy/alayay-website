import Layout from 'components/ana/Layout';
import Hero from 'components/ana/sections/Hero';
import About from 'components/ana/sections/About';
import Signature from 'components/ana/sections/Signature';
import Zodiac from 'components/ana/sections/Zodiac';
import Gifts from 'components/ana/sections/Gifts';
import OrderCTA from 'components/ana/sections/OrderCTA';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Signature />
      <Zodiac />
      <Gifts />
      <OrderCTA />
    </Layout>
  );
}
