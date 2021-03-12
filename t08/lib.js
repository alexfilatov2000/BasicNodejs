const fs = require('fs');
const parse = require('csv-parse');
const _ = require('lodash');


module.exports.parseCsv = function parseCsv(path) {
    const data = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(parse({ delimiter: ',' }))
            .on('data', row => {
                data.push(row);
            })
            .on('end', () => resolve(data));
    });
}

module.exports.transform = function transform(data){
    const pickAttributes = ['ID', 'Name', 'Alignment', 'Gender', 'EyeColor','Race', 'HairColor', 'Publisher','SkinColor','Height','Weight'];
    let arr = [];
    data.map(item => {
        item.ID = item[0];
        item.Name = item[1];
        item.Alignment = item[2];
        item.Gender = item[3];
        item.EyeColor = item[4];
        item.Race = item[5];
        item.HairColor = item[6];
        item.Publisher = item[7];
        item.SkinColor = item[8];
        item.Height = item[9];
        item.Weight = item[10];
        arr.push(_.pick(item, pickAttributes));
    })
    return arr;
}

