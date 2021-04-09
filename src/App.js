import { BrowserRouter, Route, Switch } from "react-router-dom"
import Department from "./components/Department"
import Employee from "./components/Employee"
import Home from "./components/Home"
import Navigation from "./components/Navigation"

function App() {
	return (
		<BrowserRouter>
			<div className="container">
				<h3 className="m-3 d-flex justify-content-center">Employee Management Database</h3>

				<Navigation />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/department" component={Department} />
					<Route path="/employee" component={Employee} />
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
