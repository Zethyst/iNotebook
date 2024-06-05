// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
// 1, 3, 5, 7, 9, 11, 13, 15, 17, 19,
// 1 3 7 9 13 15 19
// 1 3 7 13 15 19
// 1 3 7 13 19

function reduction(arr,k){
    if (arr.length < k){
        return arr
    }
    // console.log(arr);
    let newarr = arr.filter((element,index)=>{
        return (index+1)%k!==0
    })
    console.log(newarr);
    return reduction(newarr , k+1)
}

function deletion(n) {
    let arr=[]
    for(let i=1;i<=n;i++){
        arr.push(i)
    }
    let result = reduction(arr,2)
    
    if (result.includes(n)){
        return 1;
    }
    else{
        return 0;
    }
}

N = 19;
console.log(deletion(N));
