interface DashboardHeaderProps {
  currentMonth: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentMonth }) => {
  return (
    <header className='page-header'>
      <div className='container'>
        <h1>{currentMonth}</h1>
        <button className='btn'>
          Finalize Invoice
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;