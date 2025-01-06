/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        Signika:["Signika", 'sans-serif']
        
    },
    colors:{
      'font-main-color':'#673EE6'
    }
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}

