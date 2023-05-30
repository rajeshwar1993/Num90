import { Heading } from '../components';
import s2Logo from '../public/images/SWL2.png';
import CustImage from '../containers/widgets/CustImage';
import LandingCreateGameCTA from '../containers/widgets/LandingCreateGameCTA';

export default function Page() {
  return (
    <div className='mt-8 md:mt-16 max-w-lg xl:max-w-xl mx-auto text-center rounded-lg flex flex-col items-center gap-y-4'>
      <Heading>Host your virtual Tambola</Heading>
      <span className='text-base md:text-lg'>in just 5 mins</span>
      <div className='w-36 md:w-60'>
        <CustImage
          image={{
            src: s2Logo.src,
            alt: 'Num 90'
          }}
        />
      </div>
      <LandingCreateGameCTA />
      <p className='font-semibold'>
        Welcome to Num90 Tambola, your go-to platform for creating and hosting
        online tambola games with ease. Our user-friendly website allows you to
        design and host virtual tambola games in just a few simple steps.
      </p>
      <p className='font-semibold'>
        {`Whether you're organizing a virtual event, fundraising campaign, or
        simply looking for interactive entertainment, our intuitive interface
        and powerful features make it a breeze.`}
      </p>
      <p className='font-semibold'>
        Enjoy the thrill of tambola from anywhere in the world with just a few
        simple steps. Let the fun begin!
      </p>
    </div>
  );
}
