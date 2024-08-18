import Image from "next/image";
import Link from "next/link";
import Tracking from "@/components/icon-tracking";
import Help from "@/components/icon-help";

const Menu = () => {
  return (
    <section className='bg-black sticky top-0 left-0 w-full p-4 lg:w-56 lg:h-screen lg:p-6 lg:flex-none'>
      <div className='flex items-center justify-between lg:flex-col lg:items-start lg:h-full'>
        <div className='flex items-center justify-between w-full lg:flex-col lg:justify-start lg:items-start lg:gap-9'>
          <Image
            src='/images/logo.svg'
            alt='flexile logo'
            className='menu-logo'
            width={108}
            height={36}
          />

          <button className='lg:hidden' disabled>
            <Image
              src='/images/menu.svg'
              alt='menu icon'
              width={40}
              height={40}
            />
          </button>
          <div className='hidden lg:flex lg:flex-col lg:gap-6'>
            <button className='flex items-center justify-start gap-4 text-gray-light text-sm font-bold capitalize' disabled>
              <Image
                src='/images/invoices.svg'
                alt='invoices icon'
                width={20}
                height={20}
              />
              Invoices
            </button>
            <Link
              href='/'
              className='flex items-center justify-start gap-4 text-white text-sm font-bold capitalize'
            >
              <Tracking/>
              Tracking
            </Link>
            <button className='flex items-center justify-start gap-4 text-gray-light text-sm font-bold capitalize' disabled>
              <Image
                src='/images/documents.svg'
                alt='documents icon'
                width={20}
                height={20}
              />
              Documents
            </button>
            <button className='flex items-center justify-start gap-4 text-gray-light text-sm font-bold capitalize' disabled>
              <Image
                src='/images/settings.svg'
                alt='settings icon'
                width={20}
                height={20}
              />
              Settings
            </button>
            <Link
              href='/read-me'
              className='flex items-center justify-start gap-4 text-white text-sm font-bold capitalize'
            >
              <Help/>
              Read Me
            </Link>
          </div>
        </div>
        <div className='hidden lg:flex lg:flex-col lg:gap-6'>
          <button className='flex items-center justify-start gap-4 text-gray-light text-sm font-bold capitalize' disabled>
            <Image
              src='/images/profile.svg'
              alt='profile icon'
              width={20}
              height={20}
            />
            Profile
          </button>
          <button className='flex items-center justify-start gap-4 text-gray-light text-sm font-bold capitalize' disabled>
            <Image
              src='/images/log-out.svg'
              alt='profile icon'
              width={20}
              height={20}
            />
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;