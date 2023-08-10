import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "../reducer";
import "./employee-form.css";

const cities = ["Choose City", "Toronto", "Ottawa", "Montreal", "Vancouver"];
const titles = [
	"Choose Title",
	"Developer",
	"Team Lead",
	"Engineering Manager",
	"Director",
	"Quality Engineer",
	"Product Manager",
];
const status = ["Status", "ACTIVE", "INACTIVE"];

const Input = (props) => {
	return (
		<div className="mb-3">
			<label htmlFor={props.id} className="lable">
				{props.label}
			</label>
			<input
					{...props}
					className="form-control input"
				/>
			{props?.validationError?.error && (
				<div id="validationError" class="form-text">
					{props?.validationError?.message}
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
	return (
		<>
			<label htmlFor={props?.id} className="lable">{props.label}</label>
		<select
			value={props.value}
			className="form-select select"
			id={props?.id}
			onChange={props?.onChange}
			disabled={props?.disabled}
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
	const employees = useSelector((state) => state.totalEmployees);
	const currentEmployee = useSelector(selectors.getCurrentEmployee);
	const validationError = useSelector(selectors.getValidationError);

	const dispatch = useDispatch();

	function isEmployeeIdAvailable(employeeId) {
		return (
			employees.findIndex((employee) => employee.employeeId === employeeId) !==
			-1
		);
	}

	function onSubmitHandler(e) {
		e.preventDefault();
		setSpinner(true)
		const targetElement = e.target;
		const targetId = targetElement.id;
		dispatch(actions[targetId](currentEmployee));
		dispatch(actions.resetCurrentEmployee({}));
		dispatch(actions.setEmployeeAdditionSuccess(true));
		dispatch(actions.setValidationError({ error: false, message: "" }));
		setTimeout(() => setSpinner(false), 500)
	}

	function onChangeHandler(e) {
		e.preventDefault();
		const targetElement = e.target;
		const targetId = targetElement.id;
		const targetValue = targetElement.value;
		if (targetId === "employeeId" && isEmployeeIdAvailable(targetValue)) {
			dispatch(
				actions.setValidationError({
					error: true,
					message: "Employee ID has been taken, Please find a unique ID",
				})
			);
		} else {
			dispatch(actions.setValidationError({ error: false, message: "" }));
			dispatch(actions[targetId](targetValue));
		}
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
										value={currentEmployee?.firstName || ""}
										type="text"
										id="firstName"
										label="First Name"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.middleName || ""}
										type="text"
										id="middleName"
										label="Middle Name"
										disabled={isRestrictedView}
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.lastName || ""}
										type="text"
										id="lastName"
										label="Last Name"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.phone || ""}
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
										value={currentEmployee?.city || ""}
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.dob || ""}
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
										value={currentEmployee?.employeeId || ""}
										type="text"
										inputMode="numeric"
										id="employeeId"
										label="Employee ID"
										disabled={isRestrictedView || isEditView}
										validationError={validationError}
										required
									/>
									<Select
										onChange={onChangeHandler}
										id="title"
										label="Title"
										data={titles}
										disabled={isRestrictedView}
										value={currentEmployee?.title || ""}
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.hireDate || ""}
										type="date"
										id="hireDate"
										label="Date of Hiring"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.email || ""}
										type="email"
										id="email"
										label="Email"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.salary || ""}
										type="text"
										id="salary"
										inputMode="numeric"
										label="Salary"
										disabled={isRestrictedView}
										required
									/>
									<Input
										onChange={onChangeHandler}
										value={currentEmployee?.yearsInPosition || ""}
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
										value={currentEmployee?.status || ""}
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
								<input type="submit" class="btn btn-primary" value="Submit" />
							)}
						</form>
					)}
				</div>
			)}
		</>
	);
}
