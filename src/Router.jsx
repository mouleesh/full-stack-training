import Layout from './layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import ListInterviewQuestions from './admin/interview-questions/List';
import NotFoundPage from './NotFoundPage';
import Subjects from './admin/subject/List';
import Login from './auth/Login';
import PublicLayout from './layout/PublicLayout';
import LandingPage from './LandingPage';
import Snackbar from './components/Snackbar';
import Users from './admin/user/List';

function Router() {
  return (
    <>
      <Snackbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicLayout />}>
            <Route path="subjects" element={<LandingPage />} />
            <Route path="subjects/:subjectId" element={<LandingPage />} />
          </Route>
          <Route path='/admin' element={<Layout />}>
            <Route path='' element={<ListInterviewQuestions />} />
            <Route path='interview-questions' element={<ListInterviewQuestions />} />
            <Route path='dashboard' element={<p>This is dashboard comp</p>} />
            <Route path='subjects' element={<Subjects/>} />
            <Route path='users' element={<Users />} />
            <Route path='contact-form' element={<p>This is contact form comp</p>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default Router