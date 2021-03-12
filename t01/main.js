//
// myButton.onclick = async () => {
//     let powers = document.querySelectorAll('.messageCheckbox:checked');
//     let arrPowers = [];
//     powers.forEach((a) => {
//         arrPowers.push(a.value)
//     })
//     let origin = document.querySelectorAll('.check:checked');
//
//     let user = {
//         name: document.getElementById('rname').value,
//         alias: document.getElementById('alias').value,
//         age: document.getElementById('age').value,
//         description: document.getElementById('about').value,
//         file: document.getElementById('myfile').value,
//         powers: arrPowers,
//         level: document.getElementById('cowbell').value,
//         origin: origin[0].value
//     }
//
//     let response = await fetch('/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(user)
//     });
//     let result = await response.json();
//     document.getElementById('myText').innerText = [
//         `name: ${result.name}`,
//         `alias: ${result.alias}`,
//         `age: ${result.age}`,
//         `description: ${result.description}`,
//         `file: ${result.file}`,
//         `powers: ${result.powers}`,
//         `level: ${result.level}`,
//         `origin: ${result.origin}`,
//     ].join('\n');
//     document.getElementById('myMain').style.display = "none";
// }
//
