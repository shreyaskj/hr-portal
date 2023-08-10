import React from 'react';
import { EmployeeFormComp, OpenModal } from './components/employee-form/employee-form-comp';
import { ViewEmployees } from './components/view-employee/view-employee-comp'
import './App.css';
import { useDispatch } from 'react-redux';
import { actions } from './components/reducer';

function App() {
  const dispatch = useDispatch()

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <h2 class="navbar-brand logo">HR Portal</h2>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" onClick={(e) => {
          dispatch(actions.setEmployeeAdditionSuccess())
          dispatch(actions.resetCurrentEmployee({}))
          dispatch(actions.setViewMode('ALLOWED'))
        }}>
          Add Employee
        </button>
      </nav>
      <OpenModal onClick={() => dispatch(actions.resetValidationErrors())}>
        <EmployeeFormComp />
      </OpenModal>
      <ViewEmployees />
    </div>
  );
}

export default App;
