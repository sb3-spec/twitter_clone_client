export function isNumeric(val) {return /^-?\d+$/.test(val);}

export function hasNumbers(t) {
    var regex = /\d/g;
    return regex.test(t);
}  

export function hasSpecialCharacters(string) {
    var regex = /^[a-zA-Z0-9!@#$%^&*\\(+=._-]+$/g
    return regex.test(string)
}