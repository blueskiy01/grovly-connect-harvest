import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Provider } from '@supabase/supabase-js';

export const authConfig = {
  appearance: {
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
  },
  providers: ['google' as Provider],
};