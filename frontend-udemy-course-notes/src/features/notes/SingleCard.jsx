//import React from 'react'
import { createContext, useState, useContext, useRef, useEffect } from "react";
import parse from "html-react-parser";
import { HiOutlinePencil } from "react-icons/hi2";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import ReactDOMServer from "react-dom/server";

// #region Quill manipulationen
const editorModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["code-block"],
    ],
    handlers: {},
  },
  clipboard: {
    matchVisual: true,
  },
};
// #endregion

// #region Styling
const StyledSingleCard = styled.div`
  border: 2px solid black;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  position: relative;
`;

const StyledNote = styled.div`
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  & .ql-container {
    /* background-color: ${(props) =>
      props.mode === "edit"
        ? "var(--color-yellow-100)"
        : "var(--color-green-100)"}; */
    background-color: var(--color-yellow-100);
  }
  /* & .ql-toolbar .ql-stroke,
  & .ql-toolbar .ql-fill {
    fill: var(--color-grey-700);
    stroke: none;
  } */
  & .ql-toolbar .ql-picker {
    color: var(--color-grey-700);
  }
  & .ql-toolbar .ql-stroke {
    stroke: var(--color-grey-700);
  }
  & code {
    background-color: var(--color-grey-100) !important;
  }
`;

const StyledSection = styled.h4`
  display: inline;
  margin: 0.5rem 1.5rem;
`;

const StyledLession = styled.h5`
  display: inline;
  margin: 0.5rem 1.5rem;
`;

const StyledTimeStamp = styled.span`
  margin: 0.5rem 1.5rem;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  border-radius: 0.3rem;
  padding: 0.3rem;
  transition: all 0.25s;
  opacity: 100%;
  transform-origin: top right;
  color: var(--color-grey-100);
  background-color: ${(props) =>
    props.mode === "edit"
      ? "var(--color-yellow-700);"
      : "var(--color-green-700);"}
  &:hover {
    transform: scale(1.2);
    transition: all 0.25s;
    opacity: 60%;
  }
`;
const StyledHeader = styled.header`
  display: flex;
  gap: 1rem;
  margin: 0.2rem 0.5rem;
  align-items: baseline;
`;
const StyledHeaderSection = styled.h4`
  margin: 0.5rem 1.5rem;
  font-weight: 900;
`;

const StyledHeaderLesson = styled.h4`
  margin: 0.5rem 1.5rem;
  font-weight: 700;
`;
const StyledHeaderTimestamp = styled.h4`
  margin: 0.5rem 2.5rem 0.5rem auto;
  font-weight: 400;
`;

const StyledShowNote = styled.div`
  & .ud-component--base-components--code-block {
    margin-left: 3rem;
  }
`;
// #endregion

const SingleCardContext = createContext();
export default function SingleCard({ children, note }) {
  const { isDarkMode } = useDarkMode();

  const [mode, setMode] = useState("show");
  const [convertedText, setConvertedText] = useState(note.noteHTML);
  const [savedText, setSavedText] = useState("");
  const [changed, setChanged] = useState(false);

  function handleEditClick() {
    //console.log("handleClick edit=", edit);
    setMode((m) => (m === "show" ? "edit" : "show")); // toggle between 'show' and 'edit'
    setConvertedText((t) => correctConvertedText(t));
  }
  function correctConvertedText(t) {
    // remove multiple <p><br></p> in a row
    const pattern = "<p><br></p>";
    const newText = t
      .split(pattern)
      .filter((e) => e)
      .join(pattern);
    // split string at each occurence of pattern, ...
    // ... if multiple patterns occur in sccession then the splitted element is an empty string
    // ... so filter out empty elements - an empty string is falsy, so filter filters it out
    // ... join the elements of the resulting array with the pattern - so the pattern is guaranteed to be only one at a time
    return newText;
  }
  return (
    <StyledSingleCard>
      <SingleCardContext.Provider
        value={{
          mode,
          convertedText,
          setConvertedText,
          setChanged,
          changed,
          note,
        }}
      >
        {children}
        <EditButton onClick={handleEditClick}>
          <HiOutlinePencil />
        </EditButton>
      </SingleCardContext.Provider>
    </StyledSingleCard>
  );
}

function Section({ children }) {
  return <StyledSection>{children}</StyledSection>;
}

function Lesson({ children }) {
  return <StyledLession>{children}</StyledLession>;
}

function TimeStamp({ children }) {
  return <StyledTimeStamp>{children}</StyledTimeStamp>;
}

function Header({ section, lesson, timestamp }) {
  return (
    <StyledHeader>
      <StyledHeaderSection>{section}</StyledHeaderSection>
      <StyledHeaderLesson>{lesson}</StyledHeaderLesson>
      <StyledHeaderTimestamp>{timestamp}</StyledHeaderTimestamp>
    </StyledHeader>
  );
}

function Note({ children }) {
  const { mode, convertedText, setConvertedText, changed, setChanged, note } =
    useContext(SingleCardContext);
  const qRef = useRef();
  function handleChange(content, editor, source) {
    if (source === "user") setChanged(true);
    setConvertedText(content);
  }
  //const [editContent, setEditContent] = useState();
  // useEffect(() => {
  //   //const str = ReactDOMServer.renderToString({ children });
  //   setConvertedText(note.noteHTML);
  // }, [setConvertedText, note]);
  //console.log("convertedText=", convertedText);
  return (
    <StyledNote mode={mode}>
      {changed && "CHANGED!"}
      {mode === "edit" ? (
        <>
          <ReactQuill
            theme='snow'
            value={convertedText}
            onChange={(content, editor, source) =>
              handleChange(content, editor, source)
            }
            // style={{ minHeight: "300px" }}
            modules={editorModules}
            ref={qRef}
          />
        </>
      ) : (
        <StyledShowNote>{parse(convertedText)}</StyledShowNote>
      )}
    </StyledNote>
  );
}

function EditButton({ onClick, children, isDarkMode }) {
  const { mode } = useContext(SingleCardContext);
  return (
    <StyledButton onClick={onClick} mode={mode}>
      {children}
    </StyledButton>
  );
}

SingleCard.Section = Section;
SingleCard.Lesson = Lesson;
SingleCard.TimeStamp = TimeStamp;
SingleCard.Note = Note;
SingleCard.Header = Header;
