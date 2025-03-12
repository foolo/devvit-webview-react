import { useEffect, useState } from 'react';
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';

import { v4 as uuidv4 } from 'uuid';

export const HomePage = ({ postId }: { postId: string }) => {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a user ID when the component mounts
    setUserId(uuidv4());
  }, []);

  if (!userId) return null;

  // Create the SelfApp configuration
  const selfApp = new SelfAppBuilder({
    appName: 'My Application',
    scope: 'my-application-scope',
    endpoint: 'https://myapp.com/api/verify',
    userId,
    disclosures: {
      // Request passport information
      name: true,
      nationality: true,
      date_of_birth: true,

      // Set verification rules
      minimumAge: 18,
      excludedCountries: ['IRN', 'PRK', 'RUS'],
      ofac: true,
    },
  }).build();

  return (
    <div className="verification-container">
      <h1>Verify Your Identity</h1>
      <p>Scan this QR code with the Self app to verify your identity</p>

      <SelfQRcodeWrapper
        selfApp={selfApp}
        onSuccess={() => {
          // Handle successful verification
          console.log('Verification successful!');
          // Redirect or update UI
        }}
        size={350}
      />

      <p className="text-sm text-gray-500">User ID: {userId.substring(0, 8)}...</p>
    </div>
  );
};
