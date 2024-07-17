import React, { useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./App.css";
import SingleCard from "./components/singleCard";
import CourseSelect from "./components/courseSelect";
import CourseOverview from "./components/courseOverview";

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
    <>
      <CourseSelect onCourseSelected={handleSelectCourse} />
      {course && <CourseOverview />}
      {courseInfo?.title && <CourseOverview courseInfo={courseInfo} />}
      {courseInfo?.notes?.length > 0 &&
        courseInfo.notes.map((note) => (
          <SingleCard key={note.key}>
            <SingleCard.Section>{note.sectionHeading}</SingleCard.Section>
            <SingleCard.Lesson>{note.lessonHeading}</SingleCard.Lesson>
            <SingleCard.TimeStamp>{note.timestampStr}</SingleCard.TimeStamp>
            <SingleCard.Note>{parse(note.noteHTML)}</SingleCard.Note>
          </SingleCard>
        ))}
    </>
  );
}
