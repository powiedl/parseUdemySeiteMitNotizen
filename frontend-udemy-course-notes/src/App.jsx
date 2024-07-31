import React, { useState, BrowserRouter, Navigate, Route, Routes } from "react";

import axios from "axios";
import "./App.css";
import GlobalStyles from "./styles/GlobalStyles";
import DarkModeProvider from "./context/DarkModeContext";

import SingleCard from "./components/singleCard";
import CourseSelect from "./components/courseSelect";
import CourseOverview from "./components/courseOverview";
import { StyleSheetManager } from "styled-components";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./ui/Dashboard";
import PageNotFound from "./pages/PageNotFound";

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
                // <ProtectedRoute>
                <AppLayout />
                // </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='course/select' element={<CourseSelect />} />
              <Route path='course/:courseId' element={<CourseOverview />} />
              {/* <Route path='checkin/:bookingId' element={<Checkin />} />
                <Route path='cabins' element={<Cabins />} />
                <Route path='users' element={<Users />} />
                <Route path='settings' element={<Settings />} />
                <Route path='account' element={<Account />} /> */}
            </Route>
            {/* <Route path='login' element={<Login />} /> */}
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
