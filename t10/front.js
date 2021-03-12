
let func = async () =>{
    let url = 'https://gateway.marvel.com:443/v1/public/characters?apikey=366d13c242e7d58e1b048b5a8a52bd03';
    let response = await fetch(url);
    let res = await response.json();

    let arr = document.querySelectorAll('div');
    arr.forEach(item => {
        item.style.cssText = "width: 100%; border: 1px solid red; color: lightblue; padding: 10px; background-color: #191923; margin: 2px;"
    })
    let arr2 = document.querySelectorAll('span');
    arr2.forEach(item => {
        item.style.color = "green";
    })

    code.innerText = res.code;
    document.getElementById('status').innerText = res.status;
    copyright.innerText = res.copyright;
    attrText.innerText = res.attributionText;
    attrHTML.innerText = res.attributionHTML;
    etag.innerText = res.etag;
    ids.innerText = res.data.results[1].id;
    title.innerText = res.data.results[1].name;
    desc.innerText = res.data.results[1].description;
}

func();
