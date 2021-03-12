
function func(event){
    event.preventDefault();
    document.getElementById('myActive').style.display = 'block';
    let fileName = event.target.textContent;
    document.getElementById('activeName').innerText = fileName;
    document.getElementById('fileName').value = fileName;
    let attr = event.target.getAttribute('dir');
    document.getElementById('activeContent').innerText = attr;
}