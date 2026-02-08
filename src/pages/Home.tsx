import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import About from '../components/About';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Timeline />
      <About />
      <Clients />
      <Testimonials />
    </div>
  );
}
