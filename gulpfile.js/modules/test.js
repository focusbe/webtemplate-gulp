const { src, dest } = require("gulp");
var Test = async function(){
    await new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve(true);
            console.log('test1');
        },2000);
    });
}
module.exports = Test;