import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { courseId } = useParams();
  console.log("CourseDetail,courseId=", courseId);

  return <div>COURSE DETAIL (eigentlich die Notes)</div>;
}
