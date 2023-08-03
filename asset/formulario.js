
const form= document.getElementById("form");
const nameInput=document.getElementById("name");
const lastnameInput=document.getElementById("lastname");
const emailInput=document.getElementById("email");
const phoneInput=document.getElementById("tel");
const txtarea=document.getElementById("txtarea");


const checkName =()=>{
    let valid =false;
    const min = 3;
    const max = 25;

    const usarname =nameInput.value.trim();

    if (!isEmpty(usarname)) {
        showError(nameInput, 'El nombre es obligatorio');
    } else if (!isBetween(usarname.length, min, max)) {
        showError(
        nameInput,
        `El nombre debe tener entre ${min} y ${max} caracteres`
        );
    } else {
        showSuccess(nameInput);
        valid = true;
    }
    
    return valid;
};
const checkLastName =()=>{
    let valid =false;
    const min = 3;
    const max = 25;

    const userlastname =lastnameInput.value.trim();

    if (!isEmpty(userlastname)) {
        showError(lastnameInput, 'El apellido es obligatorio');
    } else if (!isBetween(userlastname.length, min, max)) {
        showError(
            lastnameInput,
        `El apellido no tiene un formato correcto`
        );
    } else {
        showSuccess(lastnameInput);
        valid = true;
    }
    
    return valid;
};
// Checkear el email
const checkEmail = () => {
    // Input valido por defecto
    let valid = false;
    // Guardamos el valor dle input
    const emailValue = emailInput.value.trim();
    //   Si el campo esta vacio mostra error
    if (!isEmpty(emailValue)) {
        showError(emailInput, 'El email es obligatorio');
    } else if (!isEmailValid(emailValue)) {
        showError(emailInput, 'El email no es valido');
    } else {
        showSuccess(emailInput);
        valid = true;
    }

    return valid;
};
// Checkear el telefono
const checkPhone = () => {
    let valid = false;
    const phoneValue = phoneInput.value.trim();
    if (!isPhoneValid(phoneValue)) {
        showError(phoneInput, 'El telefono no es valido');
    } else {
        showSuccess(phoneInput);
        valid = true;
    }

    return valid;
};

// Recibir el input y el mensaje de error
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

  // Funcion para mostrar exito
  // Recibe el input
const showSuccess = input => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};
const isEmailValid = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    //   Testear
    return re.test(email);
};

// Checkeamos si el telefono ingresado es valido (10 numeros)
const isPhoneValid = phone => {
    const re = /^[0-9]{13}$/;
    // testeamos
    return re.test(phone);
};


const isEmpty = value => (value === '' ? false : true);
const isBetween = (length, min, max) => length <min || length > max ? false : true;




