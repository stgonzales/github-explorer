import { createGlobalStyle } from "styled-components";

import githubBackground from "../assets/github-background.svg"

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 16px Robot, sans-serif;
    }

    #root{
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button{
        cursor: pointer;
    }

    footer {
        position: static;
        width: 100%;
        bottom: 0;
        left: 0;
        margin: 15px 0;
        padding: 20px;
        text-align: center;
        color: #3A3A3A;

        font: 12px 'Robot', sans-serif;
    }
`