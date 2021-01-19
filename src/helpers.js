export const revertValueAsync = (setter, seconds) => {
    setInterval(() => {
        setter(false);
    }, seconds * 1000);
}


export const isValid = (user)=>{
    const {first_name, last_name, email, username} = user;

    if ((first_name === undefined  || first_name === "") || (last_name === undefined  || last_name === "")||(email === undefined  || email === "")||(username === undefined  || username === "")||(first_name === undefined  || first_name === "")||(first_name === undefined  || first_name === "")||(first_name === undefined  || first_name === "")) {
        return false;
    }
    return true;
}