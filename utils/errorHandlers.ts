import swal from 'sweetalert2';

export const errorHandler = (err: Error, message: string): void => {
  swal.fire(err.message, message, 'error');
  console.error(err, message);
}

export const defaultErrorHandel = (): void => {
  swal.fire('Oops...', 'Something wrong...', 'error');
}
