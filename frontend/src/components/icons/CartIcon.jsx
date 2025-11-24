const CartIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
  >
    <path 
      d="M2 2h3.5l1.5 9m0 0h13l2.5-7H7m0 7L5 21h14" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="9" cy="21" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="21" r="1.5" fill="currentColor"/>
    <path 
      d="M7 11h13l-1.5 5H8.5L7 11z" 
      fill="currentColor" 
      opacity="0.2"
    />
  </svg>
);

export default CartIcon;
