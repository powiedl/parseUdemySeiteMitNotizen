import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
const StyledCourseSelect = styled.div`
  .course-file-upload-input {
    display: none;
  }
  Button {
  }
`;

export default function CourseSelect() {
  const [htmlFile, setHtmlFile] = useState("");
  function handleClick(e) {
    e.preventDefault();
    const fileInput = document.getElementById("course-select-input");
    fileInput.click();
  }
  function onInput(e) {
    setHtmlFile(e.target.value);
  }

  return (
    <StyledCourseSelect>
      <form>
        <Button
          htmlFor='course-select-input'
          size='large'
          onClick={handleClick}
        >
          Choose course file
        </Button>
        <input
          id='course-select-input'
          type='file'
          accept='.htm,.html,text/html'
          className='course-file-upload-input'
          value={htmlFile}
          onInput={onInput}
        />
      </form>
    </StyledCourseSelect>
  );
}
