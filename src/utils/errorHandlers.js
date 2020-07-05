import swal from 'sweetalert2'

const errorHandler = (err, message) => {
  swal.fire(err.message, message, 'error')
}

const defaultErrorHandel = () => {
  swal.fire('Oops...', 'Something wrong...', 'error')
}

export { errorHandler, defaultErrorHandel }
