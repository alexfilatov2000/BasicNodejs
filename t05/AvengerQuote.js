const fs = require('fs');

class File{
    async create(name, content){
        let dir = './tmp';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        await fs.promises.writeFile('tmp/'+name, content);
    }
    checkForDir(){
        let dir = './tmp';
        return fs.existsSync(dir);
    }
    getAllFileNames(){
        let dir = './tmp';
        let arr = []
        fs.readdirSync(dir).forEach(file => {
            const data = fs.readFileSync('tmp/'+file, 'utf8')
            arr.push({name: file, content: data});
        });
        return arr;
    }
    getContentByName(name){
        let dir = './tmp';
        fs.readdirSync(dir).forEach(file => {
            if (file === name) {
                return fs.readFileSync('tmp/' + file, 'utf8')
            }
        });
    }
    removeFile(path){
        try {
            fs.unlinkSync('tmp/'+path)
        } catch(err) {
            console.error(err)
        }
    }
}

module.exports.File = File;