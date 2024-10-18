import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import '@fontsource/poppins'; 

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Define Poppins font variable
export const fontPoppins = {
  variable: "--font-poppins",
  fontFamily: "'Poppins', sans-serif", 
  weight: "100", 
};

export const applyFontPoppins = `
  :root {
    --font-poppins: ${fontPoppins.fontFamily};
  }
`;
