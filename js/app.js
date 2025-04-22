const showPassword = document.querySelector('.show-password');
const numberRange = document.querySelector('.number-range');
const inputRange = document.querySelector('.input-range');
const passwordPropInputs = document.querySelectorAll('.password-prop');
const createBtn = document.querySelector('.create-btn');
const checkBox = document.querySelector('.check-box');
const strongLevelElem = document.querySelector('.powers');
const secondChildStrong = document.querySelector('.two');
const threeChildStrong = document.querySelector('.three');
const copyBtn = document.querySelector('.fa-copy');
const strongLevelAllChildElem = strongLevelElem.querySelectorAll('div');

let passwordLength=16;

function setPasswordProps() {
const PasswordProps = [];
    passwordPropInputs.forEach(passwordPropInput => {

        if (passwordPropInput.checked) {
            PasswordProps.push(passwordPropInput.dataset.value);
        }
    });

if (PasswordProps.length===0) {
    showPassword.innerHTML=""
}else{
    const password =  generatePassword(PasswordProps);
    showPassword.innerHTML=password; 
}    




 
showPasswordLevel(PasswordProps);
}
function generatePassword(props) {
    const numbers = "1234567890";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "@!#%$&)}";
    let password="";
    let userPasswordCharText="";
    
props.forEach(prop => {
    if (prop==="uppercase") {
        userPasswordCharText+=uppercaseLetters;
    }else if (prop==="lowercase") {
        userPasswordCharText+=lowercaseLetters;
    }else if (prop==="number") {
     userPasswordCharText+=numbers ;
    }else if(prop==="symbol"){
        userPasswordCharText+=symbols ;
    }else{
        //
    }
});
for (let i = 0; i < passwordLength; i ++) {
    password+=userPasswordCharText[Math.floor(Math.random()*userPasswordCharText.length)]    
}

    return password;
}
function setPasswordLength(event) {
    passwordLength=event.target.value;
    numberRange.innerHTML=passwordLength;
}
function showPasswordLevel(PasswordProps) {
    strongLevelAllChildElem.forEach(child => {
       child.classList.remove('very-bad');
       child.classList.remove('bad');
       child.classList.remove('good');
       child.classList.remove('very-good');

        
    });
   switch (PasswordProps.length) {
    case 1:{
        strongLevelElem.firstElementChild.className='very-bad';
        break;
    }
    case 2:{
        strongLevelElem.firstElementChild.className='bad';
        secondChildStrong.className='bad';
        
        break;
    }
    case 3:{
        strongLevelElem.firstElementChild.className='good';
        secondChildStrong.className='good';
        threeChildStrong.className='good';
        break;
    }
    case 4:{
        strongLevelElem.firstElementChild.className='very-good';
        secondChildStrong.className='very-good';
        threeChildStrong.className='very-good';
        strongLevelElem.lastElementChild.className='very-good';
        break;
    }
    default:
        break;
   }
    
}
function startTOCopy() {
    const passwordValue = showPassword.innerText;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(passwordValue)
    .then(()=>alert("متن با موفقیت کپی شد"))
    .catch(err=>alert("خطا در کپی کردن"+ err));
    }
}
createBtn.addEventListener('click', setPasswordProps);
copyBtn.addEventListener('click', startTOCopy);
inputRange.addEventListener('change', setPasswordLength);
