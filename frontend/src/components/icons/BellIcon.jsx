const BellIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
  >
    <path 
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M13.73 21a2 2 0 01-3.46 0" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="18" cy="6" r="3" fill="#ef4444" stroke="none"/>
  </svg>
);

export default BellIcon;
