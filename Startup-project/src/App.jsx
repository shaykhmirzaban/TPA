import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Boilerplate from "./components/Boilerplate";
import Home from "./screen/Home";
import Login from "./screen/authentication/Login";
import SignUp from "./screen/authentication/SignUp";
import Error from "./components/Error.jsx";
import Course from "./screen/course/Course";
import CourseHome from "./screen/course/CourseHome.jsx";
import CourseDetail from "./screen/course/CourseDetail.jsx";
import Quiz from "./screen/Public-Quiz/Quiz";
import QuizCategory from "./screen/Public-Quiz/QuizCategory";
import QuizLevel from "./screen/Public-Quiz/QuizLevel";
import DisplayQuiz from "./screen/Public-Quiz/DisplayQuiz";
import StudentRegisterForm from "./screen/public-registration-form/StudentRegisterForm.jsx";
import TrainerRegisterForm from "./screen/public-registration-form/TrainerRegisterForm.jsx";
import Dashboard from "./screen/dashboard/Dashboard";
import DashboardHome from "./screen/dashboard/DashboardHome.jsx";
import CreateCourse from "./screen/dashboard/course/CreateCourse.jsx";
import CreateQuiz from "./screen/dashboard/quiz/CreateQuiz.jsx";
import StudentRegistrationList from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationList.jsx";
import StudentRegistrationListHome from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationListHome.jsx";
import TrainerRegistrationList from "./screen/dashboard/registration/trainerRegistration/TrainerRegistrationList.jsx";
import CreateResult from "./screen/dashboard/CreateResult.jsx";
import CourseList from "./screen/dashboard/course/courseList.jsx";
import CreateQuizHome from "./screen/dashboard/quiz/CreateQuizHome.jsx";
import CreateLevel from "./screen/dashboard/quiz/CreateLevel.jsx";
import CourseListHome from "./screen/dashboard/course/CourseListHome.jsx";
import CourseUpdate from "./screen/dashboard/course/CourseUpdate.jsx";
import StudentRegistrationCourseAndSec from "./screen/dashboard/StudentRegistrationCourseAndSec.jsx";
import UpdateStudentRegistrationForm from "./screen/dashboard/registration/studentRegistrationList/UpdateStudentRegistrationForm";
import TrainerRegistrationListHome from "./screen/dashboard/registration/trainerRegistration/TrainerRegistrationListHome";
import TrainerRegistrationUpdate from "./screen/dashboard/registration/trainerRegistration/TrainerRegistrationUpdate";
import Result from "./screen/Result";
import ShowResultHome from "./screen/dashboard/ShowResult/ShowResultHome";
import UpdateShowResult from "./screen/dashboard/ShowResult/UpdateShowResult";
import ShowResult from "./screen/dashboard/ShowResult/ShowResult";
import EnrolledStudent from "./screen/dashboard/enrolledStudent/EnrolledStudent.jsx";
import AddCountries from "./screen/dashboard/AddCountries.jsx";
import AddCities from "./screen/dashboard/AddCities.jsx";
import Branch from "./screen/dashboard/Branch.jsx";
import EnrolledStudentHome from "./screen/dashboard/enrolledStudent/EnrolledStudentHome.jsx";
import UpdateEnrolledStudent from "./screen/dashboard/enrolledStudent/UpdateEnrolledStudent.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Boilerplate />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="course" element={<Course />}>
            <Route index element={<CourseHome />} />
            <Route path="course-detail" element={<CourseDetail />} />
          </Route>

          <Route path="quiz" element={<Quiz />}>
            <Route index element={<QuizCategory />} />
            <Route path="quiz-level/:id" element={<QuizLevel />} />
            <Route path="display-quiz" element={<DisplayQuiz />} />
          </Route>

          <Route
            path="student-register-form"
            element={<StudentRegisterForm />}
          />

          <Route
            path="trainer-register-form"
            element={<TrainerRegisterForm />}
          />

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="create-course" element={<CreateCourse />} />

            <Route path="create-quiz" element={<CreateQuiz />}>
              <Route index element={<CreateQuizHome />} />
              <Route path="add-level/:id" element={<CreateLevel />} />
            </Route>

            <Route path="course-list" element={<CourseList />}>
              <Route index element={<CourseListHome />} />
              <Route path="course-update" element={<CourseUpdate />} />
            </Route>

            <Route
              path="student-registration-list"
              element={<StudentRegistrationList />}
            >
              <Route index element={<StudentRegistrationListHome />} />
              <Route
                path="update-student-registration-form"
                element={<UpdateStudentRegistrationForm />}
              />
            </Route>

            <Route
              path="trainer-registration-list"
              element={<TrainerRegistrationList />}
            >
              <Route index element={<TrainerRegistrationListHome />} />
              <Route
                path="update-trainer-registration-list-form"
                element={<TrainerRegistrationUpdate />}
              />
            </Route>

            <Route path="create-result" element={<CreateResult />} />

            <Route
              path="student-registration-form-course-and-sec-control"
              element={<StudentRegistrationCourseAndSec />}
            />

            <Route path="show-result" element={<ShowResult />}>
              <Route index element={<ShowResultHome />} />
              <Route path="update-show-result" element={<UpdateShowResult />} />
            </Route>

            <Route path="enrolled-student" element={<EnrolledStudent />}>
              <Route index element={<EnrolledStudentHome />} />
              <Route
                path="update-enrolled-student"
                element={<UpdateEnrolledStudent />}
              />
            </Route>

            <Route path="add-countries" element={<AddCountries />} />
            <Route path="add-cities" element={<AddCities />} />

            <Route path="branch" element={<Branch />} />
          </Route>

          <Route path="result" element={<Result />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}
