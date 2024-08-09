import Link from 'next/link';

interface DashboardHeaderProps {
  currentMonth: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentMonth }) => {
  return (
    <header className='page-header'>
      <div className='container'>
        <h1>{currentMonth}</h1>
        <Link href='/invoice/final' className='btn'>
          Finalize Invoice
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;