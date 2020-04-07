const fs = require('fs');

class nodeFs {

    saveTo(fileName, data) {
        fs.writeFileSync(fileName, data);
    }

    readFrom(fileName) {
        return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }

    readDataWithID(fileName, id){
       let savedObj = this.findObjByID(fileName,id);
        if(savedObj!=null){
            console.log('ID => ' + savedObj['id']+' UserName => '+savedObj['userName']+' Age => '+savedObj['age']);
        }else{
            throw 'Element not found';
        }
        return savedObj;
    }

    addData (fileName, data){
        let savedObj = this.findObjByID(fileName,data.id);
        if(savedObj=== undefined){
            let existingData = this.readFrom(fileName);
            existingData.push(data);
            this.saveTo(fileName, JSON.stringify(existingData));
        }else{
            throw Error('Element not found');
        }
    }

    updateData (fileName, data){
        let savedObj = this.findObjByID(fileName,data.id);
        if(savedObj=== undefined){
            throw Error('Element not found');
        }else{
            let existingData = this.readFrom(fileName);
            existingData.forEach(function (field,key) {
                if(field.id === data.id){
                    existingData[key] = data;
                    fs.writeFileSync(fileName, JSON.stringify(existingData));
                }
            });
        }
    }

    findObjByID (fileName,id){
        let savedObj = undefined;
        let jsonData = this.readFrom(fileName);

        for(let i=0;i<jsonData.length;i++){
            if(jsonData[i]['id'] === id){
                savedObj = jsonData[i];
                break;
            }
        }
        return savedObj;
    }

    removeData(fileName,id){
        let allData = this.readFrom(fileName);
        allData = allData.filter((user)=>{
            return user.id !== id;
        });
        this.saveTo(fileName, allData);
    }
}

module.exports = nodeFs;