import Swal from 'sweetalert2'

export function AlertCorrect() {
    Swal.fire(
        'Deleted!',
        'Login Success',
        'success'
    ).then(() => {
        window.location = "/";
    })
      
}
