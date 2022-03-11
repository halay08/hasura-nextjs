module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  purge: [
    './src/pages/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/containers/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        gray: '#6E6F7D',
        green: '#00A876',
      },
      gray: {
        DEFAULT: '#E8E3D9',
        dark: '#303246',
      },
      white: {
        DEFAULT: '#FFFFFF',
        blur: '#E5E5E5',
      },
      black: {
        DEFAULT: '#000000',
        100: 'rgba(0, 0, 0, 0.5)',
        200: 'rgba(0, 0, 0, 0.2)',
        300: 'rgba(0, 0, 0, 0.6)',
        400: 'rgba(0, 0, 0, 0.75)',
      },
      green: {
        DEFAULT: '#008059',
      },
      red: {
        DEFAULT: '#f44336',
      },
      yellow: {
        DEFAULT: '#BD7F02',
        100: '#FBF7F0',
      },
    },
    fontFamily: {
      body: ['Libre Franklin', 'Arial', 'sans-serif'],
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
    },
    screen: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1440,
      '3xl': 1920,
    },
    extend: {
      width: {
        fit: 'fit-content',
      },
      height: {
        fit: 'fit-content',
      },
      maxHeight: {
        '11/12': 'calc(100% * 11 / 12)',
      },
      maxWidth: {
        '1/5': '20%',
        '1/4': '25%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '4/5': '80%',
      },
      minWidth: {
        '1/5': '20%',
        '1/4': '25%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '4/5': '80%',
        40: '10rem',
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '2.125rem',
      },
      padding: {
        0.5: '0.125rem',
        12.5: '3.125rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        10: '10px',
        20: '20px',
        14: '14px',
      },
      inset: {
        18: '4.5rem',
      },
      lineHeight: {
        xs: '1.125',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
    },
  },
  plugins: [],
};
