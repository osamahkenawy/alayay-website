import Layout from 'components/alayay/Layout';
import Hero from 'components/alayay/sections/Hero';
import Services from 'components/alayay/sections/Services';
import AMC from 'components/alayay/sections/AMC';
import HowItWorks from 'components/alayay/sections/HowItWorks';
import WhyUs from 'components/alayay/sections/WhyUs';
import Projects from 'components/alayay/sections/Projects';
import Testimonials from 'components/alayay/sections/Testimonials';
import Contact from 'components/alayay/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <AMC />
      <HowItWorks />
      <WhyUs />
      <Projects />
      <Testimonials />
      <Contact />
    </Layout>
  );
}
