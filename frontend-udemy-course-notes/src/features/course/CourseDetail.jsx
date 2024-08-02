import { useParams } from "react-router-dom";
import { useCurrentCourse } from "../../context/CurrentCourseContext";

export default function CourseDetail() {
  const { courseInfo, courseNotes } = useCurrentCourse();

  const { courseId } = useParams();
  console.log("CourseDetail,courseId=", courseId);

  return <div>COURSE DETAIL (eigentlich die Notes)</div>;
}
