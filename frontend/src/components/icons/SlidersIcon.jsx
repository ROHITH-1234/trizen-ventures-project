const SlidersIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
  >
    <line x1="4" y1="21" x2="4" y2="14" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4" y1="10" x2="4" y2="3" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="21" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="8" x2="12" y2="3" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="21" x2="20" y2="16" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="12" x2="20" y2="3" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="4" cy="12" r="2" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="10" r="2" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
    <circle cx="20" cy="14" r="2" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default SlidersIcon;
