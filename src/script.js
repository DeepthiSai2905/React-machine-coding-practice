const apiCall="https://jsonplaceholder.typicode.com/posts/1"; 
const apiCall2="https://jsonplaceholder.typicode.com/posts/2"; 

// promise with settimeout
const fetchData = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    fetch(apiCall)
    .then((res)=>{
      if(!res.ok) reject("Rejecting call")
      return res.json();
    })
    .then((data)=> resolve(data))
    .catch((err)=> reject("error while fetching",err));
  },1000)

})

fetchData.then((res)=>{
    console.log("Resultant data from settimeout promise ",res);
}).catch((err)=> console.log("Err",err))

// promise without settimeout
function apiFetchCall() {
    fetch(apiCall)
    .then((res)=> {
    if(!res.ok) throw new Error("rejected")
        return res.json();
    })
    .then((data)=> console.log("Resultant Data from promise without settimeout",data))
    .catch((err)=>console.log("Error",err))
}
apiFetchCall();

// promise with async await
async function fetchDataAsyncFunc(){
    try{
        const res = await fetch(apiCall);
        const data = await res.json();
        console.log("Resultant Data from async await promise",data)
    }
    catch(error){
        console.log("error",error)
    }
}

fetchDataAsyncFunc();

/*
here without settimeout prints first,
async await promise,
settimeout

Execution Order:
Without setTimeout: The first promise (without setTimeout) starts its execution immediately and resolves faster, so its result is logged first.
Async/Await: The async/await promise follows the same process as the first one, but it requires a bit more internal processing (because of await), but it still resolves quickly, so it logs second.
With setTimeout: The promise with setTimeout has an artificial delay of 1 second, so it resolves and logs last, after the other asynchronous operations are complete.

*/


async function fetchDataPromiseAll(){
    try{
        const [users, posts] = await Promise.all([
            fetch(apiCall).then((res)=> res.json()),
            fetch(apiCall2).then((res)=> res.json()),
        ])
        console.log("users, posts",users,posts);
    }
    catch(error){
        console.log("error",error);
    }
} 

fetchDataPromiseAll();