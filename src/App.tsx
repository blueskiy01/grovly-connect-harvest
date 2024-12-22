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
import ListingDetails from '@/pages/ListingDetails';
import Messages from '@/pages/Messages';
import UserInteractions from '@/pages/UserInteractions';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id/public" element={<PublicProfileView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/listings/new" element={<ListingForm />} />
          <Route path="/listings/:id/edit" element={<ListingForm />} />
          <Route path="/looking-for/new" element={<ListingForm />} />
          <Route path="/looking-for/:id" element={<ListingDetails />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/interactions/:type" element={<UserInteractions />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;