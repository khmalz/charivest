const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
   darkMode: ["class"],
   content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./app/_components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", flowbite.content()],
   theme: {
      container: {
         center: true,
         padding: {
            DEFAULT: "1rem",
            sm: "2rem",
            lg: "4rem",
         },
      },
      extend: {
         fontSize: {
            xss: "0.5rem",
         },
         colors: {
            primary: "#213555",
            secondary: "#3E5879",
            tertiary: "#D8C4B6",
            quaternary: "#F5EFE7",
            dashboardprimary: "#222831",
            dashboardsecondary: "#31363F",
            dashboardtertiary: "#5C8374",
            dashboardquaternary: "#9EC8B9",
         },
      },
   },
   plugins: [require("tailwindcss-animate"), flowbite.plugin()],
};
