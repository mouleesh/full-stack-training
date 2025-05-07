import React from 'react'
import Layout from './layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import ListInterviewQuestions from './interview-questions/List';
import NotFoundPage from './NotFoundPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<ListInterviewQuestions />} />
          <Route path='/interview-questions' element={<ListInterviewQuestions />} />
          <Route path='/home' element={<p>This is home comp</p>} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default Router