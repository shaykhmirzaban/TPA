import { Outlet } from "react-router-dom";

export default function CourseList () {
  return (
    <section className="courseList">
      <Outlet />
    </section>
  )
}