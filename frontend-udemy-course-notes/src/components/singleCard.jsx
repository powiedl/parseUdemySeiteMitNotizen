//import React from 'react'
import { createContext, useState, useContext, useEffect } from "react";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ReactDOMServer from "react-dom/server";

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

const StyledSingleCard = styled.div`
  border: 2px solid black;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  position: relative;
`;

const StyledNote = styled.div`
  background-color: beige;
  padding: 0.3rem 0.6rem;
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
  top: 0%;
  right: 0%;
  transition: all 0.25s;
  opacity: 100%;
  background-color: ${(props) =>
    props.edit === "true" ? "blue" : "lightgray"};
  &:hover {
    transform: scale(1.2);
    transition: all 0.25s;
    opacity: 80%;
  }
`;

const SingleCardContext = createContext();
export default function SingleCard({ children, note }) {
  const [edit, setEdit] = useState(false);
  const [convertedText, setConvertedText] = useState("");
  const [savedText, setSavedText] = useState("");
  const changed = note.noteHTML !== convertedText;
  function handleEditClick() {
    //console.log("handleClick edit=", edit);
    setEdit((e) => !e);
  }
  return (
    <StyledSingleCard>
      <SingleCardContext.Provider
        value={{ edit, convertedText, setConvertedText, changed, note }}
      >
        {children}
        <EditButton onClick={handleEditClick}>🖊</EditButton>
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

function Note({ children }) {
  const { edit, convertedText, setConvertedText, changed, note } =
    useContext(SingleCardContext);
  //const [editContent, setEditContent] = useState();
  useEffect(() => {
    //const str = ReactDOMServer.renderToString({ children });
    setConvertedText(note.noteHTML);
  }, [setConvertedText, note]);
  //console.log("convertedText=", convertedText);
  return (
    <StyledNote>
      {changed && "CHANGED! "}
      {edit ? (
        <>
          <ReactQuill
            theme='snow'
            value={convertedText}
            onChange={setConvertedText}
            // style={{ minHeight: "300px" }}
            modules={editorModules}
          />
        </>
      ) : (
        <>{parse(convertedText)}</>
      )}
    </StyledNote>
  );
}

function EditButton({ onClick }) {
  const { edit } = useContext(SingleCardContext);
  return (
    <StyledButton onClick={onClick} edit={edit.toString()}>
      🖊
    </StyledButton>
  );
}

SingleCard.Section = Section;
SingleCard.Lesson = Lesson;
SingleCard.TimeStamp = TimeStamp;
SingleCard.Note = Note;
