/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        helvetica: ["Helvetica"],
        inter: ["Inter"]
      },
      fontSize: {
        tiny: "0.625rem",   // 10px
        tiny1: "0.725rem",  // 12px
        sm: "0.875rem",     // 14px
        base: "1rem",       // 16px 
        lg: "1.125rem",     // 18px
        xl: "1.25rem",      // 20px
        "2xl": "1.5rem",    // 24px
        "3xl": "1.875rem",  // 30px
        "4xl": "2.25rem",   // 36px
        "5xl": "3rem",      // 48px
        "6xl": "4rem",      // 64px
        huge: "5rem",       // 80px
      },
      colors: {
        primary: "#ffffff",   
        secondary: "#000000", 
        greenColor: "#4CAF4F",    
        blackColor: "#263238",
        greyColor: "#4D4D4D",
        greyColorOne: "#EAEFEF",
        lightGreyColor: "#F8F8F8",
        redColor: "#EB4C4C",

      },
    },
  },
  plugins: [],
}

