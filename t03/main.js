myButt.onclick = (e) => {
    e.preventDefault();
    let text = document.getElementById('psw').value;
    document.getElementById('input').style.display = "block";
    document.querySelector('#input textarea').value = text;


    let select = document.querySelectorAll('.opt:checked');
    select.forEach((a) => {
        if (a.value === 'UTF-8'){
            document.getElementById('utf').style.display = "block";
            document.getElementById('areaUTF').value = text;
        }
        if (a.value === 'ISO-8859-1'){
            document.getElementById('iso').style.display = "block";
            document.getElementById('areaISO').value = text;
        }
        if (a.value === 'Windows-1252'){
            document.getElementById('win').style.display = "block";
            document.getElementById('areaWIN').value = text;
        }
    })
    console.log(text);
}

clear.onclick = () => {
    window.location.href = "/";
}