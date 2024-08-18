interface StatsProps {
  totalMonthTime: number;
  hourlyRate: number;
}

const Stats: React.FC<StatsProps> = ({ totalMonthTime, hourlyRate }) => {
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateAmountToBill = (timeInSeconds: number, rate: number): string => {
    const amount = (timeInSeconds / 3600) * rate;
    return `$${amount.toFixed(2)}`;
  };

  return (
  <div className='flex flex-col gap-4 h-full'>
    <div className='flex-1 border border-gray rounded-2xl p-4 md:p-6 flex flex-col gap-0.5 items-center justify-center'>
      <h3 className='font-bold text-2xl leading-none capitalize'>
        {totalMonthTime > 0 ? formatTime(totalMonthTime) : '0h 0m'}
      </h3>
      <p className='text-gray text-xs font-bold leading-none mt-1'>So far this month</p>
    </div>
    <div className='flex-1 border border-gray rounded-2xl p-4 md:p-6 flex flex-col gap-0.5 items-center justify-center'>
      <h3 className='font-bold text-2xl leading-none capitalize'>
        {totalMonthTime > 0 ? calculateAmountToBill(totalMonthTime, hourlyRate) : '$0'}
      </h3>
      <p className='text-gray text-xs font-bold leading-none mt-1'>Amount to bill</p>
    </div>
  </div>
);
};

export default Stats;