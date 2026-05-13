'use client';

import dynamic from 'next/dynamic';

const InvitationExperience = dynamic(() => import('../Invitation/InvitationExperience'), {
  ssr: false,
});

export default function WeddingApp() {
  return (
    <div className="wedding-app-shell min-h-screen">
      <InvitationExperience />
    </div>
  );
}
