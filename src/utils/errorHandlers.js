import swal from "sweetalert2";

const errorHandler = (err) => {
	swal.fire(err.name, err.message, "error");
};

const defaultErrorHandel = () => {
	swal.fire("Oops...", "Something wrong...", "error");
};

export { errorHandler, defaultErrorHandel };
