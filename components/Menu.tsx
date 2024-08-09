import Image from "next/image";
import Link from "next/link";
import Tracking from "@/components/icon-tracking";
import Help from "@/components/icon-help";

const Menu = () => {
  return (
    <section className='site-menu'>
      <div className='container'>
        <div className='logo-menu-list'>
          <Image
            src='/images/logo.svg'
            alt='flexile logo'
            className='menu-logo'
            width = {108}
            height = {36}
          />

          <button className='menu-trigger'>
            <Image
              src='/images/menu.svg'
              alt=' menu icon'
              width = {40}
              height = {40}
            />
          </button>
          <div className='link-list'>
            <button className='menu-link' disabled>
              <Image
                src='/images/invoices.svg'
                alt='invoices icon'
                width = {24}
                height = {24}
              />
              Invoices
            </button>
            <Link
              href='/'
              className='menu-link highlight'
            >
              <Tracking/>
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
            <Link
              href='/read-me'
              className='menu-link highlight'
            >
              <Help/>
              Read Me
            </Link>
          </div>
        </div>
        <div className='link-list'>
          <button className='menu-link' disabled>
            <Image
              src='/images/profile.svg'
              alt='profile icon'
              width = {24}
              height = {24}
            />
            Profile
          </button>
          <button className='menu-link' disabled>
            <Image
              src='/images/log-out.svg'
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