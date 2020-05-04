import Swal from 'sweetalert2'

export const confirmAlert = (func, text, isShowCancel, successText, failText) => {
    Swal.fire({
        title: 'โปรดยืนยันการกระทำของท่าน',
        text: `${text}`,
        icon: 'warning',
        showCancelButton: isShowCancel,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'สำเร็จ!',
                `${successText}`,
                'success'
            )
            func()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'ล้มเหลว!',
                `${failText}`,
                'error'
            )
        }
    })
}

export const notifyAlert = (func, title, text, icon, showConfirm = true) => {
    Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: `${icon}`,
        showCancelButton: false,
        showConfirmButton: showConfirm,
        confirmButtonText: 'ยืนยัน'
    }).then(()=> 
        setTimeout(function () {
            func() 
        }, 100)
    )
}