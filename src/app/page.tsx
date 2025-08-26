
import { HomeAbout } from '@/components/home-about';
import { HomeHero } from '@/components/home-hero';
import { HomeServices } from '@/components/home-services';
import { HomeTestimonials } from '@/components/home-testimonials';
import { MarbleTypes } from '@/components/marble-types';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <Separator className="my-12 md:my-24" />
      <MarbleTypes />
      <Separator className="my-12 md:my-24" />
      <HomeAbout />
      <Separator className="my-12 md:my-24" />
      <HomeTestimonials />
    </>
  );
}
