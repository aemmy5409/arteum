import React, { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error };
	}

	componentDidCatch(error, errorInfo) {
		// You can log the error to an error reporting service here
		console.error("Uncaught error:", error, errorInfo);
		this.setState({ errorInfo: errorInfo });
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div>
					<h1>Something went wrong.</h1>
					{this.state.error && <p>Error: {this.state.error.toString()}</p>}
					{this.state.errorInfo && (
						<p>Component Stack: {this.state.errorInfo.componentStack}</p>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
