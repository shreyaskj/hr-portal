import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "../reducer";
import {
	cities,
	titles,
	status,
	validationMapping
} from '../../app/data'
import "./employee-form.css";
import { isEmpty } from "lodash";

const Input = (props) => {
	const validationErrors = useSelector(selectors.getValidationErrors);
	const currentEmployee = useSelector(selectors.getCurrentEmployee);

	return (
		<div className="mb-3">
			<label htmlFor={props.id} className="lable">
				{props.label}
			</label>
			<input
				{...props}
				value={currentEmployee[props.id] || ''}
				className="form-control input"
			/>
			{validationErrors[props.id] && (
				<div id="validationError" class="form-text">
					{validationErrors[props.id]}
				</div>
			)}
		</div>
	);
};

const Spinner = (props) => {
	return (
		<div class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

const Select = (props) => {
	const currentEmployee = useSelector(selectors.getCurrentEmployee);

	return (
		<>
			<label htmlFor={props?.id} className="lable">{props.label}</label>
			<select
				value={currentEmployee[props.id] || ''}
				className="form-select select"
				id={props?.id}
				onChange={props?.onChange}
				disabled={props?.disabled}
				required
			>
				{props.data.map((value, index) => (
					<option key={index} value={value}>
						{value}
					</option>
				))}
			</select>
		</>
	);
};
export const OpenModal = (props) => {
	return (
		<div class="modal" tabIndex="-1" id="addEmployeeModal">
			<div class="modal-dialog modal-fullscreen">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Employee Form</h5>
						<button
							type="button"
							class="btn-close"
							onClick={props.onClick}
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">{props.children}</div>
				</div>
			</div>
		</div>
	);
};

export function EmployeeFormComp(props) {
	const [showSpinner, setSpinner] = useState(false);
	const viewMode = useSelector(selectors.getViewMode);
	const isEmployeeAdditionSuccess = useSelector(
		selectors.getEmployeeAdditionSuccess
	);
	const isEditView = viewMode === "EDIT";
	const isRestrictedView = viewMode === "RESTRICTED";
	const state = useSelector((state) => state);
	const currentEmployee = useSelector(selectors.getCurrentEmployee);
	const validationErrors = useSelector(selectors.getValidationErrors);

	const dispatch = useDispatch();

	function onSubmitHandler(e) {
		e.preventDefault();
		setSpinner(true)
		const targetElement = e.target;
		const targetId = targetElement.id;
		dispatch(actions[targetId](currentEmployee));
		dispatch(actions.resetCurrentEmployee({}));
		dispatch(actions.setEmployeeAdditionSuccess(true));
		dispatch(actions.resetValidationErrors());
		setTimeout(() => setSpinner(false), 500)
	}

	function handleValidations(target) {
		const targetId = target.id;
		const targetValue = target.value;
		if (validationMapping[targetId] && validationMapping[targetId].validator(state, targetValue)) {
			return {
				field: targetId,
				operation: 'ADD',
				message: validationMapping[targetId].message,
			}
		}
		return {
			field: targetId,
			operation: 'DELETE',
		}
	}

	function onChangeHandler(e) {
		e.preventDefault();
		const targetElement = e.target;
		const targetId = targetElement.id;
		const targetValue = targetElement.value;
		const validationErrorObj = handleValidations(targetElement)
		dispatch(actions.setValidationError(validationErrorObj));
		dispatch(actions[targetId](targetValue));
	}

	return (
		<>
			{showSpinner ? (
				<Spinner />
			) : (
				<div>
					{isEmployeeAdditionSuccess ? (
						<div class="modal-dialog modal-lg">{`Employee ${isEditView ? "Updation" : "Addition"
							} Success!`}</div>
					) : (
						<form
							id={isEditView ? "editEmployee" : "setEmployee"}
							onSubmit={onSubmitHandler}
							className="container"
						>
							<div className="row">
								<div className="col">
									<Input
										onChange={onChangeHandler}
										type="text"
										id="firstName"
										label="First Name"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="text"
										id="middleName"
										label="Middle Name"
										disabled={isRestrictedView}
									/>
									<Input
										onChange={onChangeHandler}
										type="text"
										id="lastName"
										label="Last Name"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="text"
										id="phone"
										label="Phone Number"
										disabled={isRestrictedView}
										required
									/>
									<Select
										onChange={onChangeHandler}
										label="City"
										id="city"
										data={cities}
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="date"
										id="dob"
										label="Date of Birth"
										disabled={isRestrictedView}
										required
									/>
								</div>
								<div className="col">
									<Input
										onChange={onChangeHandler}
										type="text"
										inputMode="numeric"
										id="employeeId"
										label="Employee ID"
										disabled={isRestrictedView || isEditView}
										required
									/>
									<Select
										onChange={onChangeHandler}
										id="title"
										label="Title"
										data={titles}
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="date"
										id="hireDate"
										label="Date of Hiring"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="email"
										id="email"
										label="Email"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="text"
										id="salary"
										inputMode="numeric"
										label="Salary"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										type="number"
										id="yearsInPosition"
										label="Years in Position"
										disabled={isRestrictedView}
										required
									/>
									<Select
										onChange={onChangeHandler}
										id="status"
										label="Status"
										data={status}
										disabled={isRestrictedView}
										required
									/>
								</div>
							</div>
							{isRestrictedView ? (
								<button
									class="btn btn-primary"
									onClick={(e) => dispatch(actions.setViewMode("EDIT"))}
								>
									Edit
								</button>
							) : (
								<input type="submit" class="btn btn-primary" value="Submit" disabled={!isEmpty(validationErrors)}/>
							)}
						</form>
					)}
				</div>
			)}
		</>
	);
}
