import { useParams } from "react-router-dom";
import { useCurrentCourse } from "../../context/CurrentCourseContext";
import SingleCard from "../notes/SingleCard";
import Spinner from "../../ui/Spinner";

export default function CourseDetail() {
  const { courseInfo, courseNotes } = useCurrentCourse();

  //const { courseId } = useParams();
  console.log("CourseDetail,courseInfo=", courseInfo);
  console.log("CourseDetail, # notes=", courseNotes.length);
  console.dir(courseNotes[0]);
  if (!courseNotes) return <Spinner />;

  return (
    <>
      {courseNotes.map((note) => (
        <SingleCard key={note.key} note={note}>
          <SingleCard.Section>{note.sectionHeading}</SingleCard.Section>
          <SingleCard.Lesson>{note.lessonHeading}</SingleCard.Lesson>
          <SingleCard.TimeStamp>{note.timestampStr}</SingleCard.TimeStamp>
          <SingleCard.Note>{note.noteHTML}</SingleCard.Note>
        </SingleCard>
      ))}
    </>
  );
}
