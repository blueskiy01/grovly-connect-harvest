import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { authConfig } from '@/config/auth';

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
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
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
              {...authConfig}
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