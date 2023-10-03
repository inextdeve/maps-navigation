import React, { useState } from 'react';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@mui/material';
import MainPage from './main/MainPage';
import LoginPage from './login/LoginPage';
import useQuery from './common/util/useQuery';
import { useEffectAsync } from './reactHelper';
import { devicesActions } from './store';

import App from './App';

const Navigation = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
