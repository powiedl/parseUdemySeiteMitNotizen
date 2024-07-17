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
      //console.log("Antwort vom Backend!");
      //console.log(response.data);
      //console.log("==================================================================");
    });
    // axios
    //   .post("http://localhost:3000/files", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data", // damit multer "anspringt"
    //     },
    //   })
    //   .then((response) => {
    //     console.log("response", response.data);
    //     const filenames = response.data.files.map((file) => file.filename);
    //     setHtmlfiles(filenames);
    //     console.log("htmlfiles=", htmlfiles);
    //   });
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
