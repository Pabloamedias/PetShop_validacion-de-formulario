export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML= ""
  }else{
    input.parentElement.classList.add("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input)

  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"

]


const mensajesDeError = {
  nombre:{ //objeto
    valueMissing: "Este campo no puede estar vacío"
  },
  email:{
    valueMissing: "Este campo no puede estar vacío",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."

  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener almenos 18 años de edad"

  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El número debe inicializar con un +569, seguido de 8 digitos"

  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato ingresado no es el correcto"

  }
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach(error =>{
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error]
    }
  })

  return mensaje
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
