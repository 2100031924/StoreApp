import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: url('https://e1.pxfuel.com/desktop-wallpaper/44/391/desktop-wallpaper-supermarket-high-quality-general-store.jpg') no-repeat center center fixed;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .glow {
    text-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0ff;
  }
`;

export default GlobalStyle;
