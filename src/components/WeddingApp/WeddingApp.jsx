'use client';

import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

let invitationExperiencePromise;

function loadInvitationExperience() {
  invitationExperiencePromise ??= import('../Invitation/InvitationExperience');
  return invitationExperiencePromise;
}

const InvitationExperience = lazy(loadInvitationExperience);

export default function WeddingApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;
    let frameId;

    const preloadInvitation = () => {
      void loadInvitationExperience();
    };

    const schedulePreload = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(preloadInvitation, { timeout: 1400 });
        return;
      }

      timeoutId = window.setTimeout(preloadInvitation, 500);
    };

    frameId = window.requestAnimationFrame(schedulePreload);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        {loaded && <InvitationExperience />}
      </Suspense>

      <Loader onComplete={handleLoaderComplete} />
    </div>
  );
}
