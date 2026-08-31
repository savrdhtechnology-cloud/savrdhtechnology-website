import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { FieldSureSection } from '../components/home/FieldSureSection';
import { ClientJourneySection } from '../components/home/ClientJourneySection';
import { PricingPreviewSection } from '../components/home/PricingPreviewSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';

import { ProductShowcase } from '../components/home/ProductShowcase';
import { WorkSection } from '../components/home/WorkSection';
import { ClientsSection } from '../components/home/ClientsSection';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';
import { CTASection } from '../components/home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="Savrdh Technologies | Enterprise Software, Cloud, Mobile & SaaS"
        description="Savrdh Technologies is a software development and enterprise technology company engineering websites, web applications, Android & iOS apps, custom software, and FieldSure™ SaaS."
        path="/"
        type="website"
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Services Section */}
      <ServicesSection />

      {/* 3. Flagship Product Section (FieldSure™) */}
      <FieldSureSection />

      {/* 4. Technology Capabilities Section */}
      <TechnologySection />

      {/* 5. Animated Client Journey & How We Work Section */}
      <ClientJourneySection />

      {/* 6. Pricing Packages & Direct Online Booking Section */}
      <PricingPreviewSection />

      {/* 7. Why Choose Us Section */}
      <WhyChooseUsSection />


      {/* 7. Product Showcase */}
      <ProductShowcase />

      {/* 8. Our Clients & Delivered Projects Section */}
      <ClientsSection />

      {/* 9. Our Work & Case Studies Section */}
      <WorkSection />

      {/* 10. About Section */}
      <AboutSection />

      {/* 11. Contact Section */}
      <ContactSection />

      {/* 12. Final CTA Banner */}
      <CTASection />
    </div>
  );
};

