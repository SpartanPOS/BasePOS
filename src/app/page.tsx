'use client';

// app/page.js
import {useRef, useEffect, useState} from 'react';
import DynamicView from './dynamicview';
import * as React from 'react';
import Lockscreen from '@/components/lockscreen';
import Navigation from './navigation';

import AuthContext, {AuthProvider} from '../components/AuthContext';

/** homepage and main view of the app
 * @return React.FC
 */

export default function Home({moduleNames}: { moduleNames: string[] }) {
  const viewList = useRef(['']);
  const curView = useRef('default');
  const {isAuthenticated, logout} = React.useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch('/api/session/refresh', {
            method: 'POST',
            credentials: 'include', // Important for sending cookies
          });

          const data = await response.json();
          if (response.ok) {
            console.log(data.message); // 'Token refreshed' or 'Token is still valid'
          } else {
            console.error('Token refresh failed:', data.message);
            logout();
            // Redirect to login or handle the error appropriately
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          logout();
          // Handle the error (e.g., redirect to login)
        }
      }
    }, 10 * 1000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <AuthProvider>
        <div>
          test
        </div>
      </AuthProvider>
      <Lockscreen />
      {/* <Navigation viewList={viewList} curView={curView} />
      <main>
        <DynamicView viewName={curView.current} />
         <Lockscreen />
      </main > */}
    </div>
  );
};
