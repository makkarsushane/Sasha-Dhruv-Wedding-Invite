import { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Loader from './components/Loader/Loader';
import InvitationExperience from './components/Invitation/InvitationExperience';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Loader onComplete={handleLoaderComplete} />

      {loaded && <InvitationExperience />}
    </div>
  );
}
