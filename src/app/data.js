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
const validationMapping = {
    employeeId: {
        validator: (state, employeeId) => {
            return state?.totalEmployees?.findIndex(
                (employee) => employee.employeeId === employeeId
            ) !== -1
        },
        message: "Employee ID has been taken, Please find a unique ID",
    },
    phone: {
        validator: (state, phone) => {
            return phone.split('').length !== 10
        },
        message: "Phone Number should have only 10 Digits",
    }
};

export { cities, titles, status, validationMapping };
