function callbackExample(num,callback){
    setTimeout(function(){
        let sum=0;
        for(let i=num;i>0;i--){
            sum+=i;
        }
        callback(sum);
    },0);
};
callbackExample(10,function(result){
    console.log(result);
});
console.log('first');