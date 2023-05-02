
// import jwtDecode from "jwt-decode";


function isLoggedIn() {
	const data = localStorage.getItem("token");
	if (!data) {
		return false;
	}
	return true;
}
export {isLoggedIn}