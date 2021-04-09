import React, { Component } from "react"
import { Table } from "react-bootstrap"

import { Button, ButtonToolbar } from "react-bootstrap"
import AddEmpModal from "./AddEmpModal"
import EditEmpModal from "./EditEmpModal"

const REACT_APP_API = "http://127.0.0.1:8000/"

export default class Employee extends Component {
	state = {
		emps: [],
		addModalShow: false,
		editModalShow: false,
	}

	refreshList = () => {
		fetch(REACT_APP_API + "employee")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ emps: data })
			})
	}

	componentDidMount() {
		this.refreshList()
	}

	componentDidUpdate() {
		this.refreshList()
	}

	deleteEmp = (empid) => {
		if (window.confirm("Are You Sure?")) {
			fetch(REACT_APP_API + "employee/" + empid, {
				method: "DELETE",
				header: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
		}
	}

	render() {
		const { emps, empid, empname, depmt, imagefilename, doj } = this.state
		let addModalClose = () => this.setState({ addModalShow: false })
		let editModalClose = () => this.setState({ editModalShow: false })
		return (
			<div>
				<Table className="mt-4" striped bordered hover size>
					<thead>
						<tr>
							<th>Employee ID</th>
							<th>Employee Name</th>
							<th>Department</th>
							<th>DOJ</th>
							<th>Options</th>
						</tr>
					</thead>

					<tbody>
						{emps.map((emp) => (
							<tr key={emp.EmployeeID}>
								<td>{emp.EmployeeID}</td>
								<td>{emp.EmployeeName}</td>
								<td>{emp.Department}</td>
								<td>{emp.DateOfJoining}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											varient="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													empid: emp.EmployeeID,
													empname: emp.EmployeeName,
													depmt: emp.Department,
													imagefilename: emp.ImageFileName,
													doj: emp.DateOfJoining,
												})
											}
										>
											Edit
										</Button>

										<Button
											className="mr-2"
											varient="danger"
											onClick={() => this.deleteEmp(emp.EmployeeID)}
										>
											Delete
										</Button>

										<EditEmpModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											empid={empid}
											empname={empname}
											depmt={depmt}
											imagefilename={imagefilename}
											doj={doj}
										/>
									</ButtonToolbar>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button
						variant="primary"
						onClick={() => this.setState({ addModalShow: true })}
					>
						Add Employee
					</Button>

					<AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
				</ButtonToolbar>
			</div>
		)
	}
}
