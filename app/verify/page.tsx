"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const VerifyPage = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                setVerified(true);
                router.push('/');
            } else {
                setVerified(false);
                setLoading(false);
            }
        } else { 
            return (
                <div>User Not SignedIn</div>
           )
        }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Email Verification Required</h1>
          <p>Please check your email and verify your account to continue.</p>
          <Button onClick={() => {
            const user = auth.currentUser;
            if (user) {
              sendEmailVerification(user);
            }
          }}>Resend Email</Button>
    </div>
  );
};

export default VerifyPage;