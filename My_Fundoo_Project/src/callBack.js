function person(name, callback){
    console.log("Hello", name);
    callback();
}

function massage(){
    console.log("Welcome to Bengal");
}

person("Anindya",massage);