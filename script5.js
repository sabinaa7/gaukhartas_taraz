
const scriptURL = 'https://script.google.com/macros/s/AKfycbzlWX31HlbyZylSDP_r8pM_sstZp5bcrylITVtbBt2_fCMke0HxknQAk51y4lthoP-2/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {

    e.preventDefault()

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! Form is submitted"))
        .then(() => { window.location.reload(); })
        .catch(error => error('Error!', error.message))
})