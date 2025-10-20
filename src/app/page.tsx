
import { HomeAbout } from '@/components/home-about';
import { HomeFeed } from '@/components/home-feed';
import { HomeHero } from '@/components/home-hero';
import { HomeServices } from '@/components/home-services';
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
      <HomeFeed />
      <Separator className="my-12 md:my-24" />
      <HomeAbout />
    </>
  );
}
