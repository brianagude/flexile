import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  return (
    <section className='site-menu'>
      <div className='container'>
        <div className='logo-menu-list'>
          <Image
            src='/images/logo.svg'
            alt='flexile logo'
            className='menu-logo'
            width = {96}
            height = {32}
          />

          <button className='menu-trigger'>
            <Image
              src='/images/menu.svg'
              alt='flexile logo'
              width = {40}
              height = {40}
            />
          </button>
          <div className='link-list'>
            <Link
              href='/invoices'
              className='menu-link'
            >
              <Image
                src='/images/invoices.svg'
                alt='invoices icon'
                width = {24}
                height = {24}
              />
              Invoices
            </Link>
            <Link
              href='/tracking'
              className='menu-link'
            >
              <Image
                src='/images/tracking.svg'
                alt='tracking icon'
                width = {24}
                height = {24}
              />
              Tracking
            </Link>
            <button className='menu-link' disabled>
              <Image
                src='/images/documents.svg'
                alt='documents icon'
                width = {24}
                height = {24}
              />
              Documents
            </button>
            <button className='menu-link' disabled>
              <Image
                src='/images/settings.svg'
                alt='settings icon'
                width = {24}
                height = {24}
              />
              Settings
            </button>
          </div>
        </div>
        <div className='link-list'>
          <button className='menu-link' disabled>
            <Image
              src='/images/settings.svg'
              alt='profile icon'
              width = {24}
              height = {24}
            />
            Profile
          </button>
          <button className='menu-link' disabled>
            <Image
              src='/images/settings.svg'
              alt='profile icon'
              width = {24}
              height = {24}
            />
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;