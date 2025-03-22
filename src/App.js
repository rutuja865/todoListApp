import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './redux/store';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
           <Route path="/mainpage"  element={
              <PrivateRoute><MainPage/></PrivateRoute> } />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
