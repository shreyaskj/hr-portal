import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducer'
import './view-employee.css'

export function ViewEmployees(props) {
    const dispatch = useDispatch()
    const employees = useSelector((state) => state.totalEmployees)
    const hasEmployees = employees.length > 0
    const columnKeys = ['firstName', 'lastName', 'title', 'hireDate', 'status']

    function editModeClickHandler(e) {
        e.preventDefault()
        const targetButton = e.target
        const employeeId = targetButton.getAttribute('data-employee-id')
        const employee = employees.find((employee) => employee.employeeId === employeeId)
        dispatch(actions.setViewMode('RESTRICTED'))
        dispatch(actions.resetCurrentEmployee(employee))
        dispatch(actions.setEmployeeAdditionSuccess(false))
    }

    function deleteClickHandler(e) {
        e.preventDefault()
        const targetButton = e.target
        const employeeId = targetButton.getAttribute('data-employee-id')
        const employee = employees.find((employee) => employee.employeeId === employeeId)
        dispatch(actions.deleteEmployee(employee))
    }

    return (
        <>
            <h3 className='h3 table-heading'>{hasEmployees ? 'List of Employees' : 'No Employees in the System'}</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Position Title</th>
                        <th scope="col">Date of Hiring</th>
                        <th scope="col">Status</th>
                        <th scope="col">For More Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                {
                                    columnKeys.map((key, index) => (
                                        <td key={index}>{employee[key]}</td>
                                    ))
                                }
                                <th>
                                    <button key={index} type="button" class="btn btn-light edit-button" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" data-employee-id={employee.employeeId} onClick={editModeClickHandler}>View Employee</button>
                                    <button key={index} type="button" class="btn btn-danger delete-button" data-employee-id={employee.employeeId} onClick={deleteClickHandler}>Delete</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}