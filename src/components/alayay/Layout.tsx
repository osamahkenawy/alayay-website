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
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, description, ogImage, canonical, type, children }) => (
  <>
    <Seo title={title} description={description} image={ogImage} canonical={canonical} type={type} />
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  </>
);

export default Layout;
