
let text = (cnt) => {
    return `this page was loaded ${cnt} time(s) in the last minute`
}

let getCookie = (str) => {
    return str.match(/[0-9]+/);
}

if (document.cookie === ''){
    let date = Date.now()
    document.cookie = `cnt=0-${date}`;
    document.getElementById('myText').innerText = text(getCookie(document.cookie));
} else {
    let x = document.cookie;
    x = x.match(/[0-9]+$/g)
    let now = Date.now()

    if (now - x < 36000){
        let numb = +getCookie(document.cookie);
        numb = numb + 1;
        document.cookie = `cnt=${numb}-${x}`;
        document.getElementById('myText').innerText = text(getCookie(document.cookie));
    } else {
        let date = Date.now()
        document.cookie = `cnt=0-${date}`;
        document.getElementById('myText').innerText = text(getCookie(document.cookie));
    }
}




