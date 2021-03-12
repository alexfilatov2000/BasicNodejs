async function func(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');

    fetch('https://www.google.com', {headers: headers})
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}