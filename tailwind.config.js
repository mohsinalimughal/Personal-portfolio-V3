/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4EFE3",
        creamdim: "#EAE3D2",
        ink: "#111110",
        inkdim: "#1B1B19",
        orange: "#FF5A1F",
        orangedim: "#E64E17",
        teal: "#0F3D3E",
        tealdim: "#0B2E2F",
      },
      fontFamily: {
        display: ['"Archivo"', "sans-serif"],
        body: ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
