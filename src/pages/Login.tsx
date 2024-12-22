import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <div className="max-w-md mx-auto pt-24 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary font-fraunces">Welcome Back</h1>
            <p className="text-charcoal-light">Sign in to your account</p>
          </div>

          <Auth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2D3319',
                    brandAccent: '#4A5827',
                  },
                },
              },
            }}
            providers={['google']}
            view="sign_in"
            redirectTo={`${window.location.origin}/dashboard`}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal-light">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;