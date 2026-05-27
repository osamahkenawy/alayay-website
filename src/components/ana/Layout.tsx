import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Seo from './Seo';

type Props = {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
  title,
  description,
  ogImage,
  canonical,
  type,
  noIndex,
  children,
}) => (
  <>
    <Seo
      title={title}
      description={description}
      image={ogImage}
      canonical={canonical}
      type={type}
      noIndex={noIndex}
    />
    <div className="bg-ana-ink text-ana-cream min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </>
);

export default Layout;
