const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const { parseColor } = require("tailwindcss/lib/util/color");
const primaryColors = require("@left4code/tw-starter/dist/js/colors");

/** Converts HEX color to RGB */
const toRGB = (value) => {
  return parseColor(value).color.join(" ");
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,vue}"],
  darkMode: 'class',
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: primaryColors.gray['300']
    }),
    extend: {
      backgroundColor: {
        primary: {
          50: '#f6fafd',
          100: '#e7f6fd',
          200: '#c4e6fb',
          300: '#9ecefa',
          400: '#68a4fa',
          500: '#3877f9',
          600: '#2653f3',
          700: '#2241db',
          800: '#1d40ac',
          900: '#172983'
        }
      },
      colors: {
        ...primaryColors,
        primary: {
          0: "rgb(var(--color-primary) / <alpha-value>)",
          1: "#1C3FAA",
          2: "#2e51bb",
          3: "#D32929",
          4: "#91C714",
          5: "#3160D8",
          6: "#F78B00",
          7: "#FBC500",
          8: "#3b5998",
          9: "#4ab3f4",
          10: "#517fa4",
          11: "#0077b5",
        },
        dark: {
          1: "#293145",
          2: "#232a3b",
          3: "#313a55",
          4: "#1e2533",
          5: "#3f4865",
          6: "#2b3348",
          7: "#181f29",
        },
        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
        slate : {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",             
        },
        theme: {
          1: '#1C3FAA',
          2: '#F1F5F8',
          3: '#2E51BB',
          4: '#274AB7',
          5: '#DEE7EF',
          6: '#D32929',
          7: '#365A74',
          8: '#D2DFEA',
          9: '#91C714',
          10: '#3160D8',
          11: '#F78B00',
          12: '#FBC500',
          13: '#7F9EB9',
          14: '#E6F3FF',
          15: '#8DA9BE',
          16: '#607F96',
          17: '#FFEFD9',
          18: '#D8F8BC',
          19: '#2449AF',
          20: '#395EC1',
          21: '#C6D4FD',
          22: '#E8EEFF',
          23: '#1A389F',
          24: '#163296',
          25: '#C7D2FF',
          26: '#15329A',
          27: '#203FAD',
          28: '#BBC8FD',
          29: '#284EB2',
          30: '#98AFF5'
        },
        darkmode: {
          50: "rgb(var(--color-darkmode-50) / <alpha-value>)",
          100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
          200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
          300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
          400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
          500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
          600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
          700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
          800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
          900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
        },
      },
      fontFamily: {
        roboto: ['Roboto']
      },
      container: {
        center: true
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1600px'
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addBase }) {
      addBase({
        // Default colors
        ":root": {
          "--color-theme-1": toRGB(colors.blue["800"]),
          "--color-theme-2": toRGB(colors.blue["900"]),
          "--color-primary": toRGB(colors.blue["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.lime["500"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.yellow["400"]),
          "--color-pending": toRGB(colors.orange["500"]),
          "--color-danger": toRGB(colors.red["600"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
        },
        // Default dark-mode colors
        ".dark": {
          "--color-primary": toRGB(colors.blue["700"]),
          "--color-darkmode-50": "87 103 132",
          "--color-darkmode-100": "74 90 121",
          "--color-darkmode-200": "65 81 114",
          "--color-darkmode-300": "53 69 103",
          "--color-darkmode-400": "48 61 93",
          "--color-darkmode-500": "41 53 82",
          "--color-darkmode-600": "40 51 78",
          "--color-darkmode-700": "35 45 69",
          "--color-darkmode-800": "27 37 59",
          "--color-darkmode-900": "15 23 42",
        },
        // Theme 1 colors
        ".theme-1": {
          "--color-theme-1": toRGB(colors.emerald["800"]),
          "--color-theme-2": toRGB(colors.emerald["900"]),
          "--color-primary": toRGB(colors.emerald["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.emerald["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.yellow["400"]),
          "--color-pending": toRGB(colors.amber["500"]),
          "--color-danger": toRGB(colors.rose["600"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.emerald["800"]),
          },
        },
        // Theme 2 colors
        ".theme-2": {
          "--color-theme-1": toRGB(colors.blue["900"]),
          "--color-theme-2": toRGB(colors.blue["950"]),
          "--color-primary": toRGB(colors.blue["950"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.teal["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.amber["500"]),
          "--color-pending": toRGB(colors.orange["500"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.blue["800"]),
          },
        },
        // Theme 3 colors
        ".theme-3": {
          "--color-theme-1": toRGB(colors.cyan["800"]),
          "--color-theme-2": toRGB(colors.cyan["900"]),
          "--color-primary": toRGB(colors.cyan["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.teal["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.amber["500"]),
          "--color-pending": toRGB(colors.amber["600"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.cyan["800"]),
          },
        },
        // Theme 4 colors
        ".theme-4": {
          "--color-theme-1": toRGB(colors.indigo["800"]),
          "--color-theme-2": toRGB(colors.indigo["900"]),
          "--color-primary": toRGB(colors.indigo["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.emerald["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.yellow["500"]),
          "--color-pending": toRGB(colors.orange["600"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.indigo["700"]),
          },
        },
      });
    }),
  ],
  variants: {
    extend: {
      zIndex: ['responsive', 'hover'],
      position: ['responsive', 'hover'],
      padding: ['responsive', 'last'],
      margin: ['responsive', 'last'],
      borderWidth: ['responsive', 'last'],
      backgroundColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      textColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark','theme'],
      boxShadow: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderOpacity: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      backgroundOpacity: ['last', 'first', 'odd', 'responsive', 'hover', 'dark']
    }
  }
}
