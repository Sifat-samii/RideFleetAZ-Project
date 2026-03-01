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
          50: '#E8F4F8',
          100: '#B8D6E8',
          300: '#4BA3D1',
          400: '#2A8FC4',
          500: '#0F7BBF',
          600: '#0A5FA0',
          700: '#064F88',
          800: '#033D6A'
        },
        accent: {
          400: '#10B981',
          500: '#059669',
          600: '#047857'
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
        'glow': '0 0 40px rgba(15, 123, 191, 0.3)',
        'card': '0 10px 40px rgba(0,0,0,0.3)',
        'card-lg': '0 20px 60px rgba(0,0,0,0.4)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system']
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1F2937 0%, #111827 50%, #03050B 100%)',
        'gradient-blue': 'linear-gradient(135deg, #0F7BBF 0%, #064F88 100%)'
      }
    }
  },
  plugins: []
}
