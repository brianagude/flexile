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
    <div className='stats'>
      <div className='stat'>
        <h3>{totalMonthTime > 0 ? formatTime(totalMonthTime) : '0h 0m'}</h3>
        <p>So far this month</p>
      </div>
      <div className='stat'>
        <h3>{totalMonthTime > 0 ? calculateAmountToBill(totalMonthTime, hourlyRate) : '$0'}</h3>
        <p>Amount to bill</p>
      </div>
    </div>
  );
};

export default Stats;