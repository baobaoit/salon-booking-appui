/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#7357FF",
        "primary": "#007faa",
        "blue": "#6E4CF8",
        "gradient": "linear-gradient(90deg, #6B15D3 0%, #6E4CF8 100.31%)",
        "light-purple": "#9E85E7",
        "s-light-purple": "#AF7DE7",
        "support-purple": "#F1E8FD",
        "dark-purple": "#6D2996",
        "dark-action": "#3D6AC4",
        "dark-warning": "#A66930",
        "neutral-bg": "#F9F9FF",
        "green": "#3FB483",
        "sy-light": "#4D87FA",
        "sy-light-alert": "#F55858",
        "sy-dark-alert": "#BA4343",
        "n-100": "#EEF0F6",
        "n-150": "#E2E4EB",
        "n-200": "#B1B7BE",
        "n-300": "#D6D7DD",
        "n-400": "#A6A8B4",
        "n-500": "#6A6C7D",
        "n-600": "#767888",
        "n-800": "#393F52",
        "n-bg2": "#EFEFF5",

        "p-25": "#F9F8FF",
        "p-50": "#F1EEFF",
        "p-75": "#E2DCFF",
        "p-100": "#C6BBFF",
        "p-200": "#BCAFFF",
        "p-300": "#A797FF",
        "p-400": "#8B75FF",
        "p-500": "#7357FF",
        "p-600": "#6347F4",
        "p-700": "#553ADE",
        "p-800": "#3C28A4",
        "p-900": "#21194D",

        "g-25": "#F8F8F8",
        "g-50": "#F3F3F4",
        "g-75": "#ECECED",
        "g-100": "#E2E2E4",
        "g-200": "#D9D8DC",
        "g-300": "#C6C5CA",
        "g-400": "#B3B1B8",
        "g-500": "#8D8A95",
        "g-600": "#676472",
        "g-700": "#4F4B5C",
        "g-800": "#2E293D",
        "g-900": "#110C22",

        "info-25": "#F5FAFF",
        "info-50": "#E9F4FF",
        "info-75": "#C2E2FF",
        "info-100": "#A0D2FF",
        "info-200": "#71BBFF",
        "info-300": "#45A6FF",
        "info-400": "#1C92FF",
        "info-500": "#0084FF",
        "info-600": "#0076E2",
        "info-700": "#0057A7",
        "info-800": "#0C355A",
        "info-900": "#0D1C2B",

        "success-25": "#F3FDF8",
        "success-50": "#E2FCF0",
        "success-75": "#C6F1DD",
        "success-100": "#A6E9C8",
        "success-200": "#6FDAA6",
        "success-300": "#4DCC8F",
        "success-400": "#28C07A",
        "success-500": "#0BAA60",
        "success-600": "#0A9C55",
        "success-700": "#0C7844",
        "success-800": "#104B2F",
        "success-900": "#0D1F11",

        "warning-25": "#FFFAED",
        "warning-50": "#FFF5DB",
        "warning-75": "#FFECBA",
        "warning-100": "#FFDD86",
        "warning-200": "#FFCB45",
        "warning-300": "#FDBA0F",
        "warning-400": "#F2AA09",
        "warning-500": "#E09400",
        "warning-600": "#D07D00",
        "warning-700": "#B55E0F",
        "warning-800": "#5C3111",
        "warning-900": "#27170B",

        "error-25": "#FFF9F9",
        "error-50": "#FFF1F1",
        "error-75": "#FFE0E0",
        "error-100": "#FFC7C7",
        "error-200": "#FFA7A7",
        "error-300": "#FF8080",
        "error-400": "#F95E5E",
        "error-500": "#F03D3D",
        "error-600": "#CF2A2A",
        "error-700": "#A41F1F",
        "error-800": "#591A1A",
        "error-900": "#271111",
      },
      backgroundColor: theme => ({
        "surface-white": "#FFFFFF",
        "surface-low": theme('colors.g-25'),
        "surface-med": theme('colors.g-50'),
        "surface-high": theme('colors.g-75'),
        "surface-primary": theme('colors.p-500'),
        "surface-primary-accent-1": theme('colors.p-50'),
        "surface-primary-accent-2": theme('colors.p-75'),
        "surface-info": theme('colors.info-500'),
        "surface-info-accent-base": theme('colors.info-25'),
        "surface-info-accent-1": theme('colors.info-50'),
        "surface-info-accent-2": theme('colors.info-75'),
        "surface-success": theme('colors.success-500'),
        "surface-success-light": theme('colors.success-300'),
        "surface-success-accent-1": theme('colors.success-50'),
        "surface-success-accent-2": theme('colors.success-75'),
        "surface-warning": theme('colors.warning-500'),
        "surface-warning-accent-1": theme('colors.warning-50'),
        "surface-warning-accent-2": theme('colors.warning-75'),
        "surface-error": theme('colors.error-500'),
        "surface-error-accent-1": theme('colors.error-50'),
        "surface-error-accent-2": theme('colors.error-75'),
        "surface-error-accent-base": theme('colors.error-25'),
        "surface-disabled-low": theme('colors.g-75'),
        "surface-disabled-med": theme('colors.g-100'),
        "outlines-med": theme('colors.g-75'),
        "surface-primary-accent-base": theme('colors.p-25'),
        "outlines-info-med": theme('colors.info-100'),
        "primary-p-400": theme('colors.p-400'),
        "primary-p-50": theme('colors.p-50'),
        "system-error-300": theme('colors.error-300'),
        "system-success-300": theme('colors.success-300'),
        "system-warning-100": theme('colors.warning-100'),
      }),
      textColor: theme => ({
        "low-em": theme('colors.g-400'),
        "med-em": theme('colors.g-600'),
        "high-em": theme('colors.g-900'),
        "white-100": theme('colors.white'),
        "disabled": theme('colors.g-200'),
        "primary": theme('colors.primary'),
        "primary-bold": theme('colors.p-800'),
        "primary-accent-1": theme('colors.p-50'),
        "primary-accent-2": theme('colors.p-75'),
        "info": theme('colors.info-500'),
        "info-accent-base": theme('colors.info-25'),
        "info-accent-1": theme('colors.info-50'),
        "info-accent-2": theme('colors.info-75'),
        "info-bold": theme('colors.info-700'),
        "success": theme('colors.success-500'),
        "success-accent-1": theme('colors.success-50'),
        "success-accent-2": theme('colors.success-75'),
        "warning": theme('colors.warning-500'),
        "warning-accent-1": theme('colors.warning-50'),
        "warning-accent-2": theme('colors.warning-75'),
        "error": theme('colors.error-500'),
        "error-accent-1": theme('colors.error-50'),
        "error-accent-2": theme('colors.error-75'),
        "icon-high-em": theme('colors.g-700'),
      }),
      fontSize: {
        "heading-1": ['64px', {
          lineHeight: '72px',
          fontWeight: 400
        }],
        "heading-1-medium": ['64px', {
          lineHeight: '72px',
          fontWeight: 500
        }],
        "heading-1-bold": ['64px', {
          lineHeight: '72px',
          fontWeight: 700
        }],
        "heading-2": ['52px', {
          lineHeight: '64px',
          fontWeight: 400
        }],
        "heading-2-medium": ['52px', {
          lineHeight: '64px',
          fontWeight: 500
        }],
        "heading-2-bold": ['52px', {
          lineHeight: '64px',
          fontWeight: 700
        }],
        "heading-3": ['44px', {
          lineHeight: '64px',
          fontWeight: 400
        }],
        "heading-3-medium": ['44px', {
          lineHeight: '64px',
          fontWeight: 500
        }],
        "heading-3-bold": ['44px', {
          lineHeight: '64px',
          fontWeight: 700
        }],
        "heading-4": ['32px', {
          lineHeight: '40px',
          fontWeight: 400
        }],
        "heading-4-medium": ['32px', {
          lineHeight: '40px',
          fontWeight: 500
        }],
        "heading-4-bold": ['32px', {
          lineHeight: '40px',
          fontWeight: 700
        }],
        "heading-5": ['28px', {
          lineHeight: '40px',
          fontWeight: 400
        }],
        "heading-5-medium": ['28px', {
          lineHeight: '40px',
          fontWeight: 500
        }],
        "heading-5-bold": ['28px', {
          lineHeight: '40px',
          fontWeight: 700
        }],
        "heading-5-semi-bold": ['28px', {
          lineHeight: '40px',
          fontWeight: 600
        }],
        "heading-6": ['22px', {
          lineHeight: '32px',
          fontWeight: 400
        }],
        "heading-6-medium": ['22px', {
          lineHeight: '32px',
          fontWeight: 500
        }],
        "heading-6-bold": ['22px', {
          lineHeight: '32px',
          fontWeight: 700
        }],
        "heading-6-semi-bold": ['22px', {
          lineHeight: '32px',
          fontWeight: 600
        }],
        "title": ['18px', {
          lineHeight: '24px',
          fontWeight: 400
        }],
        "title-medium": ['18px', {
          lineHeight: '24px',
          fontWeight: 500
        }],
        "title-bold": ['18px', {
          lineHeight: '24px',
          fontWeight: 700
        }],
        "standard": ['16px', {
          lineHeight: '24px',
          fontWeight: 400
        }],
        "standard-medium": ['16px', {
          lineHeight: '24px',
          fontWeight: 500
        }],
        "title-semi-bold": ['18px', {
          lineHeight: '24px',
          fontWeight: 600
        }],
        "standard-semi-bold": ['16px', {
          lineHeight: '24px',
          fontWeight: 600
        }],
        "body-semi-bold": ['14px', {
          lineHeight: '24px',
          fontWeight: 600
        }],
        "sub-semi-bold": ['12px', {
          lineHeight: '24px',
          fontWeight: 600
        }],
        "tiny-semi-bold": ['10px', {
          lineHeight: '24px',
          fontWeight: 600
        }],
        "standard-bold": ['16px', {
          lineHeight: '24px',
          fontWeight: 700
        }],
        "body": ['14px', {
          lineHeight: '24px',
          fontWeight: 400
        }],
        "body-medium": ['14px', {
          lineHeight: '24px',
          fontWeight: 500
        }],
        "body-bold": ['14px', {
          lineHeight: '24px',
          fontWeight: 700
        }],
        "sub": ['12px', {
          lineHeight: '16px',
          fontWeight: 400
        }],
        "sub-medium": ['12px', {
          lineHeight: '16px',
          fontWeight: 500
        }],
        "sub-bold": ['12px', {
          lineHeight: '16px',
          fontWeight: 700
        }],
        "tiny": ['10px', {
          lineHeight: '16px',
          fontWeight: 400
        }],
        "tiny-medium": ['10px', {
          lineHeight: '16px',
          fontWeight: 500
        }],
        "tiny-bold": ['10px', {
          lineHeight: '16px',
          fontWeight: 700
        }],
      },
      borderColor: theme => ({
        "outline-low": theme('colors.g-50'),
        "outline-med": theme('colors.g-75'),
        "outline-high": theme('colors.g-200'),
        "outline-extreme": theme('colors.p-300'),
        "outline-primary": theme('colors.p-500'),
        "outline-primary-low": theme('colors.p-75'),
        "outline-primary-med": theme('colors.p-100'),
        "outline-primary-high": theme('colors.p-300'),
        "outline-success": theme('colors.success-500'),
        "outline-success-low": theme('colors.success-75'),
        "outline-success-med": theme('colors.success-200'),
        "outline-success-high": theme('colors.success-300'),
        "outline-error": theme('colors.error-500'),
        "outline-error-low": theme('colors.error-75'),
        "outline-error-med": theme('colors.error-200'),
        "outline-error-high": theme('colors.error-300'),
        "outline-error-extreme": theme('colors.error-400'),
        "outline-info": theme('colors.info-500'),
        "outline-info-low": theme('colors.info-75'),
        "outline-info-med": theme('colors.info-100'),
        "outline-warning": theme('colors.warning-500'),
        "outline-warning-low": theme('colors.warning-75'),
      }),
      boxShadow: {
        "l-small": "0px 4px 16px rgba(79, 117, 140, 0.24)",
        "l-large": "0px 4px 32px rgba(79, 117, 140, 0.24)",
        "d-small": "0px 4px 32px rgba(79, 117, 140, 0.24)",
        "d-large": "0px 4px 32px rgba(79, 117, 140, 0.24)",
        "header-payment": "0px_6px_16px_-6px_rgba(17, 12, 34, 0.1)",
        "e-01": "0px 1px 2px -1px rgba(17, 12, 34, 0.08)",
        "e-02": "0px 2px 4px -2px rgba(17, 12, 34, 0.12)",
        "e-03": "0px 6px 16px -6px rgba(17, 12, 34, 0.1)",
        "e-04": "0px 16px 20px -8px rgba(17, 12, 34, 0.1)",
        "e-05": "0px 16px 20px -8px rgba(17, 12, 34, 0.1)",
        "e-06": "0px 32px 32px -12px rgba(17, 12, 34, 0.12)",
        "button-pressed-primary": "0px 2px 4px rgba(17, 12, 34, 0.12), 0px 0px 0px 4px #E2DCFF",
        "button-pressed-gay": "0px 2px 4px rgba(17, 12, 34, 0.12), 0px 0px 0px 4px #ECECED",
        "big-shadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    },
  },
  plugins: [
  ],
  variants: {
    lineClamp: ['responsive', 'hover']
  },
  screens: {
    'sm': {'min': '640px', 'max': '767px'},
    // => @media (min-width: 640px and max-width: 767px) { ... }

    'md': {'min': '768px', 'max': '1023px'},
    // => @media (min-width: 768px and max-width: 1023px) { ... }

    'lg': {'min': '1024px', 'max': '1279px'},
    // => @media (min-width: 1024px and max-width: 1279px) { ... }

    'xl': {'min': '1280px', 'max': '1535px'},
    // => @media (min-width: 1280px and max-width: 1535px) { ... }

    '2xl': {'min': '1536px'},
    // => @media (min-width: 1536px) { ... }
  },
}
