import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  keyframes: {
			hover: {
			  '0%': { transform: 'translateZ(10px)' },
			  '100%': { transform: 'translateZ(20px)' },
			},
			turnaround: {
			  '0%': {
				transform: 'perspective(500px) rotateY(30deg) rotateZ(-5deg) rotateX(15deg)',
			  },
			  '33%': {
				transform: 'perspective(500px) rotateY(10deg) rotateZ(-5deg) rotateX(-15deg)',
			  },
			  '67%': {
				transform: 'perspective(500px) rotateY(0deg) rotateZ(0deg) rotateX(0deg)',
			  },
			  '100%': {
				transform: 'perspective(500px) rotateY(30deg) rotateZ(-5deg) rotateX(15deg)',
			  },
			},
		  },
		  turnaroundOpposite: {
			'0%': {
			  transform: 'perspective(500px) rotateY(0deg)', // Start at front
			},
			'25%': {
			  transform: 'perspective(500px) rotateY(-15deg)', // Tilt left (opposite direction)
			},
			'50%': {
			  transform: 'perspective(500px) rotateY(0deg)', // Back to front
			},
			'75%': {
			  transform: 'perspective(500px) rotateY(15deg)', // Tilt right (opposite direction)
			},
			'100%': {
			  transform: 'perspective(500px) rotateY(0deg)', // Back to front
			},
		  },	
		  animation: {
			hover: 'hover 2s alternate infinite',
			turnaround: 'turnaround 20s infinite',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
