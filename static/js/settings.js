document.querySelector('#user_foto').addEventListener('click', ev => {
    document.querySelector('#avatar_up').click();
});

document.querySelector('#user_capa').addEventListener('click', ev => {
    document.querySelector('#capa_up').click();
});

function readURL(input, seletor) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            const foto = document.querySelector(seletor);
            foto.src = e.target.result
        }
    reader.readAsDataURL(input.files[0]);
    }
}

document.querySelector('#avatar_up').addEventListener('change', function () {
    readURL(this, '#user_foto');
});

document.querySelector('#capa_up').addEventListener('change', function () {
    readURL(this, '#user_capa');
});