/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
   darkMode: ["class"],
   content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      container: {
         center: true,
         padding: {
            DEFAULT: "1rem",
            sm: "2rem",
         },
      },
      extend: {
         colors: {
            primary: "#213555",
            secondary: "#3E5879",
            tertiary: "#D8C4B6",
            quaternary: "#F5EFE7",
         },
      },
   },
   plugins: [require("tailwindcss-animate")],
};
