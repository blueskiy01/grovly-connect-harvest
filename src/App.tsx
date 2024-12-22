import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Profile from '@/pages/Profile';
import PublicProfileView from '@/components/profile/PublicProfileView';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Browse from '@/pages/Browse';
import HowItWorks from '@/pages/HowItWorks';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Settings from '@/pages/Settings';
import ListingForm from '@/pages/ListingForm';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id/public" element={<PublicProfileView />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/listings/new" element={<ListingForm />} />
        <Route path="/listings/:id/edit" element={<ListingForm />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;