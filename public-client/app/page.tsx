import { Heading } from '../components';
import s2Logo from '../public/images/SWL2.png';
import CustImage from '../containers/widgets/CustImage';
import LandingCreateGameCTA from '../containers/widgets/LandingCreateGameCTA';

export default function Page() {
  return (
    <div className='relative mt-12 md:mt-44 xl:max-w-5xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 text-center'>
        <div className='w-[60%] lg:w-[90%] mx-auto'>
          <CustImage
            image={{
              src: s2Logo.src,
              alt: 'Num 90'
            }}
          />
        </div>
        <div className='gap-y-2 flex flex-col max-w-xl mx-auto'>
          <h1 className='text-4xl lg:text-7xl font-bold'>
            Your virtual tambola host
          </h1>
          <p className='font-semibold'>
            Welcome to Num90 Tambola, your go-to platform for creating and
            hosting online tambola games with ease.
          </p>
          <p className='font-semibold'>
            Host a a virtual event, fundraising campaign, or simply looking for
            interactive entertainment, our interface handles it all.
          </p>
          <p className='font-semibold'>
            Enjoy the thrill of tambola from anywhere in the world with just a
            few simple steps. Let the fun begin!
          </p>
          <LandingCreateGameCTA />
        </div>
      </div>
      <span className='opacity-10 -top-8 md:-top-32 absolute text-6xl md:text-9xl lg:text-[12rem] font-bold tracking-widest text-skin-primary left-[50%] -translate-x-1/2'>
        WELCOME
      </span>
    </div>
  );
}
