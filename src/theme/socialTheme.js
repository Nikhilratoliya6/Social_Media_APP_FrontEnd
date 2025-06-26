const socialTheme = {
  colors: {
    primary: {
      main: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      main: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    background: {
      main: 'hsl(var(--background))',
      card: 'hsl(var(--card))',
      muted: 'hsl(var(--muted))',
    },
    text: {
      primary: 'hsl(var(--foreground))',
      secondary: 'hsl(var(--muted-foreground))',
      card: 'hsl(var(--card-foreground))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
  typography: {
    fontFamily: {
      body: ['Inter', '-apple-system', 'system-ui', 'sans-serif'].join(','),
      heading: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'].join(','),
    },
  },
  spacing: {
    base: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    base: 'all 0.2s ease-in-out',
    smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
};

export default socialTheme;