import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderCourseTitle from "./HeaderCourseTitle";
import { useCurrentCourse } from "../context/CurrentCourseContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solig var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;
export default function Header() {
  const { courseInfo } = useCurrentCourse();
  return (
    <StyledHeader>
      <HeaderCourseTitle>
        {courseInfo.title || "Select a course file"}
      </HeaderCourseTitle>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
