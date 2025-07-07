import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				loteraa: {
					purple: '#7142F6',
					darkPurple: '#1A1F2C',
					blue: '#3182F4',
					teal: '#0CCCBC',
					black: '#0B0B15',
					gray: '#2C3248'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'move-background': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'blob-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'jump-fade-in': {
					'0%': { opacity: '0', transform: 'translateY(40px) scale(0.9)' },
					'50%': { transform: 'translateY(-5px) scale(1.05)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'glitch-fade-in': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(30px) scale(0.95)',
						textShadow: '0 0 0 transparent'
					},
					'10%': { 
						opacity: '0.1', 
						transform: 'translateY(25px) scale(0.96) skewX(-2deg)',
						textShadow: '2px 0 0 rgba(113, 66, 246, 0.8), -2px 0 0 rgba(12, 204, 188, 0.8)'
					},
					'20%': { 
						opacity: '0.3', 
						transform: 'translateY(20px) scale(0.97) skewX(1deg)',
						textShadow: '-1px 0 0 rgba(113, 66, 246, 0.6), 1px 0 0 rgba(12, 204, 188, 0.6)'
					},
					'30%': { 
						opacity: '0.5', 
						transform: 'translateY(15px) scale(0.98)',
						textShadow: '0 0 5px rgba(113, 66, 246, 0.5)'
					},
					'50%': { 
						opacity: '0.7', 
						transform: 'translateY(10px) scale(0.99) skewX(-0.5deg)',
						textShadow: '1px 0 0 rgba(113, 66, 246, 0.4), -1px 0 0 rgba(12, 204, 188, 0.4)'
					},
					'80%': { 
						opacity: '0.9', 
						transform: 'translateY(5px) scale(1) skewX(0.2deg)',
						textShadow: '0 0 8px rgba(113, 66, 246, 0.3)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0) scale(1)',
						textShadow: '0 0 10px rgba(113, 66, 246, 0.2)'
					}
				},
				'bounce-ar': {
					'0%, 20%, 50%, 80%, 100%': { 
						transform: 'translateY(0) scale(1)',
						animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
					},
					'40%': { 
						transform: 'translateY(-20px) scale(1.1)',
						animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
					},
					'60%': { 
						transform: 'translateY(-10px) scale(1.05)',
						animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 5s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'move-background': 'move-background 10s ease infinite',
				'blob-rotate': 'blob-rotate 20s linear infinite',
				'fade-in': 'fade-in 2s ease-out',
				'jump-fade-in': 'jump-fade-in 2s ease-out',
				'bounce-ar': 'bounce-ar 2s infinite',
				'glitch-fade-in': 'glitch-fade-in 3s ease-out'
			},
			animationDelay: {
				'100': '0.1s',
				'200': '0.2s',
				'300': '0.3s',
				'400': '0.4s',
				'500': '0.5s',
				'600': '0.6s',
				'700': '0.7s',
				'800': '0.8s',
				'900': '0.9s',
				'1000': '1s',
				'1100': '1.1s',
				'1200': '1.2s',
				'1500': '1.5s',
				'2000': '2s',
				'2500': '2.5s',
				'3000': '3s'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: { addUtilities: any }) {
			const newUtilities = {
				'.animation-delay-100': { animationDelay: '0.1s' },
				'.animation-delay-200': { animationDelay: '0.2s' },
				'.animation-delay-300': { animationDelay: '0.3s' },
				'.animation-delay-400': { animationDelay: '0.4s' },
				'.animation-delay-500': { animationDelay: '0.5s' },
				'.animation-delay-600': { animationDelay: '0.6s' },
				'.animation-delay-700': { animationDelay: '0.7s' },
				'.animation-delay-800': { animationDelay: '0.8s' },
				'.animation-delay-900': { animationDelay: '0.9s' },
				'.animation-delay-1000': { animationDelay: '1s' },
				'.animation-delay-1100': { animationDelay: '1.1s' },
				'.animation-delay-1200': { animationDelay: '1.2s' },
				'.animation-delay-1500': { animationDelay: '1.5s' },
				'.animation-delay-2000': { animationDelay: '2s' },
				'.animation-delay-2500': { animationDelay: '2.5s' },
				'.animation-delay-3000': { animationDelay: '3s' },
				'.glowing-text': {
					textShadow: '0 0 10px rgba(113, 66, 246, 0.5), 0 0 20px rgba(113, 66, 246, 0.3), 0 0 30px rgba(113, 66, 246, 0.2)',
					color: '#ffffff'
				},
				'.glowing-text-enhanced': {
					textShadow: '0 0 15px rgba(113, 66, 246, 0.7), 0 0 25px rgba(113, 66, 246, 0.5), 0 0 35px rgba(113, 66, 246, 0.3), 0 0 45px rgba(12, 204, 188, 0.2)',
					color: '#ffffff'
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
