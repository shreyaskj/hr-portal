import { createAction, createReducer } from "@reduxjs/toolkit";

const employeeInitialState = {}

const firstName = createAction('employee/firstName/string')
const middleName = createAction('employee/middleName/string')
const lastName = createAction('employee/lastName/string')
const city = createAction('employee/city/string')
const dob = createAction('employee/dob/string')
const phone = createAction('employee/phone/string')
const title = createAction('employee/title/string')
const hireDate = createAction('employee/hireDate/string')
const email = createAction('employee/email/string')
const salary = createAction('employee/salary/string')
const yearsInPosition = createAction('employee/yearsInPosition/number')
const employeeId = createAction('employee/employeeId/string')
const status = createAction('employee/status/string')
const resetCurrentEmployee = createAction('employee/resetCurrentEmployee/object')

const getCurrentEmployee = (state) => state.currentEmployee

const employeeReducer = createReducer(employeeInitialState, (builder) => {
    builder
        .addCase(resetCurrentEmployee, (state, action) => action.payload)
        .addMatcher((action) => !action.type.includes('object'), (state, action) => {
            const stateKey = action.type.split('/')[1]
            return { ...state, [stateKey]: action.payload }
        })
})

const totalEmployeesInitialState = [
    {
      firstName: 'Shreyas',
      lastName: 'KJ',
      phone: '9986569300',
      dob: '1996-07-05',
      hireDate: '2018-07-05',
      email: 'shkamisetty@paypal.com',
      salary: '105k',
      yearsInPosition: '5',
      employeeId: '1420712',
      city: 'Toronto',
      title: 'Developer'
    }
  ]

const setEmployee = createAction('employee/setEmployee/object')
const editEmployee = createAction('employee/editEmployee/object')

const totalEmployeesReducer = createReducer(totalEmployeesInitialState, (builder) => {
    builder
        .addCase(setEmployee, (state, action) => {
            return [...state, action.payload]
        })
        .addCase(editEmployee, (state, action) => {
            const totalEmployees = Array.from(state)
            const employeeIndex = totalEmployees.findIndex((emp) => emp.employeeId === action.payload.employeeId)
            totalEmployees[employeeIndex] = action.payload
            return totalEmployees
        })
})

const applicationState = {
    viewMode: 'ALLOWED',
    isEmployeeAdditionSuccess: false,
    validationError: { error: false, message: '' }
}

const setViewMode = createAction('app/setViewMode/object')
const setEmployeeAdditionSuccess = createAction('app/setEmployeeAdditionSuccess/boolean')
const setValidationError = createAction('app/setValidationError/obj')

const getViewMode = (state) => state.progressState.viewMode
const getEmployeeAdditionSuccess = (state) => state.progressState.isEmployeeAdditionSuccess
const getValidationError = (state) => state.progressState.validationError

const applicationStateReducer = createReducer(applicationState, (builder) => {
    builder
        .addCase(setViewMode, (state, action) => {
            return {
                ...state,
                viewMode: action.payload,
            }
        })
        .addCase(setEmployeeAdditionSuccess, (state, action) => {
            return {
                ...state,
                isEmployeeAdditionSuccess: action.payload,
            }
        })
        .addCase(setValidationError, (state, action) => {
            return {
                ...state,
                validationError: action.payload
            }
        })
})

const reducers = {
    employeeReducer,
    totalEmployeesReducer,
    applicationStateReducer,
}

const actions = {
    setEmployee,
    editEmployee,
    resetCurrentEmployee,
    firstName,
    middleName,
    lastName,
    city,
    dob,
    phone,
    title,
    hireDate,
    email,
    salary,
    yearsInPosition,
    employeeId,
    status,
    setViewMode,
    setEmployeeAdditionSuccess,
    setValidationError,
}

const selectors = {
    getViewMode,
    getCurrentEmployee,
    getEmployeeAdditionSuccess,
    getValidationError,
}

export {
    reducers,
    actions,
    selectors,
}