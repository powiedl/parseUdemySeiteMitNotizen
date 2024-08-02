import styled from "styled-components";
const StyledHeaderCourseTitle = styled.h1`
  margin-right: auto;
`;

export default function HeaderCourseTitle({ children }) {
  return <StyledHeaderCourseTitle>{children}</StyledHeaderCourseTitle>;
}
