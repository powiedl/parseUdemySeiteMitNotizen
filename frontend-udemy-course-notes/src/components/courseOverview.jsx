//import React from "react";
import styled from "styled-components";

const StyledCourseOverview = styled.div``;

export default function courseOverview({ courseInfo }) {
  return (
    <StyledCourseOverview>
      <h2>{courseInfo.title}</h2>
    </StyledCourseOverview>
  );
}
