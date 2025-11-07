export function getApiURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:5000/";
	}
	return "https://api." + window.location.hostname.replace("www.", "") + "/";
}

export function getPrivateAppURL() {
	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:3001/";
	}
	return "https://community." + window.location.hostname.replace("www.", "") + "/";
}

export function getJobsMiddlewareURL() {
	if (process.env.REACT_APP_JOBS_MIDDLEWARE_URL
		&& process.env.REACT_APP_JOBS_MIDDLEWARE_URL.length > 0) {
		return process.env.REACT_APP_JOBS_MIDDLEWARE_URL;
	}

	if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
		return "http://localhost:8002/";
	}

	return "https://jobs-middleware." + window.location.hostname.replace("www.", "") + "/";
}
