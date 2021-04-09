import React, { Component } from "react"
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap"

const REACT_APP_API = "http://127.0.0.1:8000/"
const REACT_APP_IMAGEPATH = "http://127.0.0.1:8000/media/"

export default class EditEmpModal extends Component {
	state = {
		deps: [],
	}

	imagefilename = "anonymous.png"
	imagesrc = REACT_APP_IMAGEPATH + this.imagefilename

	componentDidMount() {
		fetch(REACT_APP_API + "department")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ deps: data })
			})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(REACT_APP_API + "employee", {
			method: "PUT",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				EmployeeID: event.target.EmployeeID.value,
				EmployeeName: event.target.EmployeeName.value,
				Department: event.target.Department.value,
				DateOfJoining: event.target.DateOfJoining.value,
				ImageFileName: this.imagefilename,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					alert(result)
				},
				(error) => alert("Failed")
			)
	}

	handleFileSelected = (event) => {
		event.preventDefault()
		this.imagefilename = event.target.files[0].name
		const fromData = new FormData()
		fromData.append("myFile", event.target.files[0], event.target.files[0].name)

		fetch(REACT_APP_API + "Employee/SaveImageFile", {
			method: "POST",
			body: fromData,
		})
			.then((res) => res.json())
			.then(
				(result) => {
					this.imagesrc = REACT_APP_IMAGEPATH + result
				},
				(error) => {
					alert("Failed!")
				}
			)
	}

	render() {
		return (
			<div className="container">
				<Modal
					{...this.props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title is="contained-modal-title-vcenter">
							Update Employee
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="EmployeeID">
										<Form.Label>EmployeeName</Form.Label>
										<Form.Control
											type="text"
											name="EmployeeID"
											required
											placeholder="EmployeeID"
                                            disabled
                                            defaultValue={this.props.empid}
										/>
									</Form.Group>

									<Form.Group controlId="EmployeeName">
										<Form.Label>EmployeeName</Form.Label>
										<Form.Control
											type="text"
											name="EmployeeName"
											required
											placeholder="EmployeeName"
                                            defaultValue={this.props.empname}
										/>
									</Form.Group>

									<Form.Group controlId="Department">
										<Form.Label>Depatment</Form.Label>
										<Form.Control as="select" defaultValue={this.props.depmt}>
											{this.state.deps.map((dep) => (
												<option key={dep.DepartmentID}>
													{dep.DepartmentName}
												</option>
											))}
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="DateOfJoining">
										<Form.Label>DateOfJoining</Form.Label>
										<Form.Control
											type="date"
											Name="DateOfJoining"
											required
											placeholder="DateOfJoining"
                                            defaultValue={this.props.doj}
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Update Employee
										</Button>
									</Form.Group>
								</Form>
							</Col>

							<Col sm={6}>
								<Image width="200px" height="200px" src={REACT_APP_IMAGEPATH + this.props.imagefilename} />
								<input onChange={this.handleFileSelected} type="file" />
							</Col>
						</Row>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="danger" onClick={this.props.onHide}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}
