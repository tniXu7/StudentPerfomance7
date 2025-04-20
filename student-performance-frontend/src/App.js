// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAuth(true);
      fetch('http://127.0.0.1:8000/api/auth/user/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(data => {
          if (data.is_superuser) setUserRole('admin');
          else if (data.is_teacher) setUserRole('teacher');
          else setUserRole('student');
        })
        .catch(() => {
          setAuth(false);
          setUserRole(null);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth ? (
              userRole === 'admin' ? <Navigate to="/admin-dashboard" />
              : userRole === 'teacher' ? <Navigate to="/teacher-dashboard" />
              : <Navigate to="/student-dashboard" />
            ) : (
              <Login setAuth={setAuth} setUserRole={setUserRole} />
            )
          }
        />
        <Route
          path="/register"
          element={
            !auth ? <Registration /> : <Navigate to="/" />
          }
        />
        <Route path="/student-dashboard" element={auth && userRole === 'student' ? <StudentDashboard setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route path="/teacher-dashboard" element={auth && userRole === 'teacher' ? <TeacherDashboard setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route path="/admin-dashboard" element={auth && userRole === 'admin' ? <AdminDashboard setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
