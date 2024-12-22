import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-md mx-auto pt-24 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-primary font-fraunces">
                Welcome Back to Grovly
              </h1>
              <p className="text-charcoal-light text-sm">
                Sign in to your account to continue
              </p>
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#2D3319',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    padding: '10px 15px',
                  },
                  anchor: {
                    color: '#4A5827',
                    textDecoration: 'none',
                    fontWeight: '500',
                  },
                  input: {
                    borderRadius: '8px',
                    padding: '10px 15px',
                  },
                  message: {
                    borderRadius: '6px',
                    fontSize: '14px',
                    padding: '10px',
                  },
                },
                variables: {
                  default: {
                    colors: {
                      brand: '#2D3319',
                      brandAccent: '#4A5827',
                      inputBackground: 'white',
                      inputBorder: '#E2E8F0',
                      inputBorderHover: '#CBD5E1',
                      inputBorderFocus: '#2D3319',
                    },
                  },
                },
              }}
              providers={['google']}
              redirectTo={`${window.location.origin}/dashboard`}
              view="sign_in"
            />

            <div className="text-center space-y-4">
              <Separator className="my-4" />
              <p className="text-sm text-charcoal-light">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;