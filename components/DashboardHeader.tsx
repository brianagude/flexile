interface DashboardHeaderProps {
  currentMonth: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentMonth }) => {
  return (
    <header className='bg-gray-light w-full p-4 md:p-6 lg:p-6 lg:px-16 border-b border-gray'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-bold capitalize'>{currentMonth}</h1>
        <button className='bg-black text-white text-sm font-bold capitalize px-8 py-3 rounded-full border border-black hover:bg-blue hover:border-blue transition-colors duration-250'>
          Finalize Invoice
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;