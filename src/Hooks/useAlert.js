import swal from 'sweetalert'

function useAlert() {
  const showAlert = (text, icon, timer) => {
    swal(text, {
      icon: icon,
      buttons: false,
      timer: timer
    })
  }

  return { showAlert }
}

export default useAlert
