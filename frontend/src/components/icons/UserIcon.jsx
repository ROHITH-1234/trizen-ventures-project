const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
  >
    <circle cx="12" cy="8" r="5" strokeWidth="2"/>
    <path 
      d="M3 21c0-4.418 4.029-8 9-8s9 3.582 9 8" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.3"/>
  </svg>
);

export default UserIcon;
