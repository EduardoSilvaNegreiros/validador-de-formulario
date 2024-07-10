class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');


        this.events();
    }

    events() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.fieldsAreValid();
        const validPassword = this.passwordIsValid();

        if(validFields && validPassword) {
            alert('Formulário enviado');
            this.formulario.submit();
        }
    }


    passwordIsValid() {
        let valid = true;

        const password = this.formulario.querySelector('.senha');
        const repeatPassword = this.formulario.querySelector('.repetir-senha');


        if(password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'Campos senha e repetir senha precisam ser iguais.');
            this.createError(repeatPassword, 'Campos senha e repetir senha precisam ser iguais.');
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }

    fieldsAreValid() {
        let valid = true;
        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }   

        for (let field of this.formulario.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText;
            if (!field.value) {
                this.createError(field, `Campo ${label} não pode estar em branco`);
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.validateCpf(field)) valid = false;
            }

            if(field.classList.contains('usuario')) {
                if(!this.validateUser(field)) valid = false;
            }
        }
        
        return valid;
    }


    validateUser(field) {
        const user = field.value;
        let valid = true;

        if(user.length < 3 || user.length > 12) {
            this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres');
            return valid = false;
        }

        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números');
            return valid = false;
        }

        return true;
    }


    validateCpf(field) {
        const cpf = new ValidateCpf(field.value);

        if(!cpf.valid()) {
            this.createError(field, 'Cpf Inválido');
            return false;
        }
        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valid = new ValidaFormulario();