function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height'
      },

      colors: {
        accent: withOpacity('--accent'),
        'accent-soft': withOpacity('--accent-soft')
      },

      fontFamily: {
        'sans-serif': ['Roboto']
      },

      textColor: {
        skin: {
          primary: withOpacity('--text'),
          accent: withOpacity('--accent'),
          inverted: withOpacity('--text-inverted'),
          error: withOpacity('--error')
        }
      },
      backgroundColor: {
        skin: {
          primary: withOpacity('--primary'),
          accent: withOpacity('--accent'),
          error: withOpacity('--error'),
          base: withOpacity('--bg-base')
        }
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity('--color-fill')
        }
      },
      borderColor: {
        skin: {
          primary: withOpacity('--primary'),
          accent: withOpacity('--accent'),
          error: withOpacity('--error')
        }
      }
    }
  },
  plugins: []
};
