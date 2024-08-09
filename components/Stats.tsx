interface StatsProps {
  totalMonthTime: number;
  hourlyRate: number;
}

const Stats: React.FC<StatsProps> = ({ totalMonthTime, hourlyRate }) => {
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
  };

  const calculateAmountToBill = (timeInSeconds: number, rate: number): string => {
    const amount = (timeInSeconds / 3600) * rate;
    return amount.toFixed(2); // Round to 2 decimal points
  };

  return (
    <div className='stats'>
      <div className='stat'>
        <h3>{formatTime(totalMonthTime)}</h3>
        <p>So far this month</p>
      </div>
      <div className='stat'>
        <h3>${calculateAmountToBill(totalMonthTime, hourlyRate)}</h3>
        <p>Amount to bill</p>
      </div>
    </div>
  );
};

export default Stats;