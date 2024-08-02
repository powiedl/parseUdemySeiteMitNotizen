import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { uploadCourseHTML, parseFile } from "../../services/apiFiles";
import { useCurrentCourse } from "../../context/CurrentCourseContext";
import { useNavigate } from "react-router-dom";
const StyledCourseSelect = styled.div`
  .course-file-upload-input {
    display: none;
  }
  div {
    margin: 0.5rem 0;
    padding: 0.4rem 0.8rem;
    background-color: var(--color-indigo-100);
    color: var(--color-indigo-700);
    cursor: pointer;
    display: inline-block;
    transition: filter 0.3s;
    &:hover {
      filter: brightness(90%);
      transition: filter 0.3s;
    }
  }
`;

export default function CourseSelect() {
  const [htmlFile, setHtmlFile] = useState();
  const { setCourseTitle, setCourseHref, setCourseNotes, setCourseId } =
    useCurrentCourse();
  const navigate = useNavigate();

  function handleClick(e) {
    //    console.log("CourseSelect,handleClick");
    e.preventDefault();
    const fileInput = document.getElementById("course-select-input");
    fileInput.click();
  }
  async function onInput(e) {
    // console.log(
    //   "CourseSelect,onInput:",
    //   e.target.files[0]?.name,
    //   " #files:",
    //   e.target.files?.length
    // );
    const files = { files: e.target.files };
    //console.log("CourseSelect,onInput:files=", files);
    uploadCourseHTML(files).then((filenames) => {
      //console.log("CourseSelect,filenames=", filenames);
      setHtmlFile(filenames[0]);
    });
  }

  function handleSubmit(e) {
    //console.log("CourseSelect,handleSubmit");
    e.preventDefault();
    if (!htmlFile) return;
    //console.log("CourseSelect,Submitting", htmlFile.name);
  }

  async function handleSelect(e) {
    console.log("CourseSelect,handleSelect,htmlFile=", htmlFile);
    const { data, status } = await parseFile(htmlFile);
    console.log("CourseSelect,data=", data);
    setCourseTitle(data.title);
    setCourseHref(data.href);
    setCourseNotes(data.notes);
    setCourseId(data.id);
    navigate(`/notes/${data.id}`);
  }
  return (
    <StyledCourseSelect>
      <form onSubmit={handleSubmit} id='course-select-form'>
        <Button
          htmlFor='course-select-input'
          size='large'
          onClick={handleClick}
        >
          Add course file
        </Button>
        <input
          id='course-select-input'
          type='file'
          accept='.htm,.html,text/html'
          className='course-file-upload-input'
          onInput={onInput}
          multiple={false}
        />
      </form>
      {htmlFile && <div onClick={handleSelect}>{htmlFile}</div>}
    </StyledCourseSelect>
  );
}
