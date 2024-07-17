//import React from 'react'
import { createContext, useState, useContext } from "react";
import styled from "styled-components";

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
export default function SingleCard({ children }) {
  const [edit, setEdit] = useState(false);

  function handleEditClick() {
    //console.log("handleClick edit=", edit);
    setEdit((e) => !e);
  }
  return (
    <StyledSingleCard>
      <SingleCardContext.Provider value={{ edit }}>
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
  const { edit } = useContext(SingleCardContext);
  //console.log("Button edit=", edit);
  return (
    <StyledNote>
      {edit && "EDITING!"} {children}
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
