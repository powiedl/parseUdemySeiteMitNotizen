import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import logoUrl from "../assets/u-notes-logo-brand-700.png";

const StyledLogo = styled.div`
  text-align: center;
  font-family: "Edu AU VIC WA NT Hand", cursive;
  font-size: 2rem;
  color: var(--color-brand-700);
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  //const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={logoUrl} alt='u-notes Logo' />
      <div>u-notes</div>
    </StyledLogo>
  );
}

export default Logo;
