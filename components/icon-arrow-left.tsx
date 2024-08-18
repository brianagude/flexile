interface ArrowLeftProps {
  onClick?: () => void;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ onClick }) => {
  return (
    <div className='btn-icon'>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path 
          d="M19 12H5M5 12L12 19M5 12L12 5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ArrowLeft;