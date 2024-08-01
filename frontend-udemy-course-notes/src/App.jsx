import React, { useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "axios";
import "./App.css";
import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";

import SingleCard from "./components/singleCard";
//import CourseSelect from "./components/courseSelect";
import CourseSelect from "./features/course/CourseSelect";
import CourseOverview from "./components/courseOverview";
import { StyleSheetManager } from "styled-components";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./ui/Dashboard";
import PageNotFound from "./pages/PageNotFound";

import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function App() {
  const [course, setCourse] = useState();
  const [courseInfo, setCourseInfo] = useState({});
  function handleSelectCourse(htmlfile) {
    //console.log("handleSelectCourse htmlfile=", htmlfile);
    const url = `http://localhost:3000/infos/${htmlfile}`;
    //console.log(`requesting ${url}'`);
    axios.get(url).then((response) => {
      setCourseInfo(response.data);
    });
  }

  return (
    <DarkModeProvider>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "variation"}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <StyledAppLayout>
                  <Header />
                  <Sidebar />
                  <Main>
                    <Container>
                      <Outlet />
                    </Container>
                  </Main>
                </StyledAppLayout>
              }
            >
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='course/select' element={<CourseSelect />} />
              <Route path='course/:courseId' element={<CourseOverview />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </StyleSheetManager>
    </DarkModeProvider>
  );
  // return (
  //   <>
  //     <GlobalStyles />
  //     <CourseSelect onCourseSelected={handleSelectCourse} />
  //     {course && <CourseOverview />}
  //     {courseInfo?.title && <CourseOverview courseInfo={courseInfo} />}
  //     {courseInfo?.notes?.length > 0 &&
  //       courseInfo.notes.map((note) => {
  //         return (
  //           <SingleCard key={note.key} note={note}>
  //             <SingleCard.Section>{note.sectionHeading}</SingleCard.Section>
  //             <SingleCard.Lesson>{note.lessonHeading}</SingleCard.Lesson>
  //             <SingleCard.TimeStamp>{note.timestampStr}</SingleCard.TimeStamp>
  //             <SingleCard.Note>{note.noteHTML}</SingleCard.Note>
  //           </SingleCard>
  //         );
  //       })}
  //   </>
  // );
}
