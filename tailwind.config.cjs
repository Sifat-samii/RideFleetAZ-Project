module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#F3F4F6',
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#2D3748',
          800: '#1F2937',
          900: '#111827',
          950: '#03050B'
        },
        primary: {
          50: '#F7F8FA',
          100: '#DDE2E9',
          300: '#AFBAC6',
          400: '#96A2AF',
          500: '#788492',
          600: '#5E6976',
          700: '#48515C',
          800: '#333A43'
        },
        accent: {
          400: '#A9B2BE',
          500: '#89939F',
          600: '#69727D'
        }
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem'
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem'
      },
      boxShadow: {
        'glow': '0 0 40px rgba(142, 154, 168, 0.24)',
        'card': '0 10px 40px rgba(0,0,0,0.3)',
        'card-lg': '0 20px 60px rgba(0,0,0,0.4)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system']
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1F2937 0%, #111827 50%, #03050B 100%)',
        'gradient-blue': 'linear-gradient(135deg, #c8d0d9 0%, #7d8896 52%, #434b55 100%)'
      }
    }
  },
  plugins: []
}
