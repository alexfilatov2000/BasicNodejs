const fs = require('fs');

class fileList{
    getList(){
        let dir = './tmp';
        let arr = []
        fs.readdirSync(dir).forEach(file => {
            const data = fs.readFileSync('tmp/'+file, 'utf8')
            arr.push({name: file, content: data});
        });
        return arr;
    }
    hasFiles(){
        let dir = './tmp';
        return fs.existsSync(dir);
    }
}