import Swal from 'sweetalert2'

export function AlertInCorrect() {
    Swal.fire('Oops...', 'Your passwork is not correct or Dont have this Account', 'error')
}
