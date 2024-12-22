import { BrowserRouter } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import './App.css';
import Navigation from '@/components/Navigation';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Messages from '@/pages/Messages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <Toaster />
        <SonnerToaster />
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
