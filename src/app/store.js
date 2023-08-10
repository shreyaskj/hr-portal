import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../components/reducer';

const { employeeReducer, totalEmployeesReducer, applicationStateReducer } = reducers

export const store = configureStore({
  reducer: {
    currentEmployee: employeeReducer,
    totalEmployees: totalEmployeesReducer,
    progressState: applicationStateReducer,
  },
});
