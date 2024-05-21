function ValidationSign(values) {
    const errors = {}
    const document_Pattern = /^[0-9]{10}$/;
    const name_Pattern = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;   
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.documento) {
        errors.documento = "Documento no ingresado";
    } else if (!document_Pattern.test(values.documento)) {
        errors.documento = "El formato del documento es incorrecto";
    }

    if (values.nombre === "") {
        errors.nombre = "Nombre no ingresado";
    } else if (!name_Pattern.test(values.nombre)) {
        errors.nombre = "El formato del nombre es incorrecto";
    }

    if (!values.primerApellido) {
        errors.primerApellido = "Apellido no ingresado";
    } else if (!name_Pattern.test(values.primerApellido)) {
        errors.primerApellido = "El formato del primer apellido es incorrecto";
    }

    // Segundo apellido es opcional, no se valida aquí

    if (!values.email) {
        errors.email = "Correo no ingresado";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "El correo electrónico no es válido";
    }

    if (values.confirmarEmail !==values.email) {
        errors.confirmarEmail = "Los correos no coinciden";
    }

    if (!values.password) {
        errors.password = "Contraseña no ingresada";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
    }

    if (values.confirmarPassword !== values.password) {
        errors.confirmarPassword = "Las contraseñas no coinciden";
    }

    return errors;
    
}

export default ValidationSign;