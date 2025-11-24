const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
  >
    <circle cx="11" cy="11" r="8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="11" cy="11" r="4" fill="currentColor" opacity="0.2"/>
  </svg>
);

export default SearchIcon;
