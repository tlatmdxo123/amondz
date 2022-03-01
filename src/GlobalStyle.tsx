import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    a{
        text-decoration: none;
        color:#000000;
    }
    input{
        border:none;
    }
    input:focus{
        outline: none;
    }
    button{
        border:none;
        background: none;
    }
    ul,figure{
        padding:0;
        margin: 0;
    }
    li{
        list-style: none;
    }
`;
