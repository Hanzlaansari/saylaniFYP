let zameenReducer = (state = [],action)=>{
    
switch(action.type){
case "zameen":
return [...action.payload]
default : 
return state ;
}
}

    export default (zameenReducer);