import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Define where you want to navigate
    navigate('/'); // Example: navigate to the home page
  };

  return (
    <div className="shadow-2xl">
      <button onClick={handleLogoClick}>Logo</button>
    </div>
  );
}
