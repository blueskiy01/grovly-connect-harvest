import React from 'react';
import { createRoot } from 'react-dom/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Could not find root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SessionContextProvider 
      supabaseClient={supabase}
      initialSession={null}
    >
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);