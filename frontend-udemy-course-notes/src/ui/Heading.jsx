import styled, { css } from "styled-components";

// let a = 5;
// const test = css`
//   text-align: center;
//   ${a > 6 ? "font-style:italic" : "font-stretch:extra-expanded"}
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 30px;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 24px;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 20px;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 28px;
      font-weight: 600;
      text-align: center;
    `}

line-height:1.4rem;
`;

export default Heading;
