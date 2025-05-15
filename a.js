class Formulario {
    constructor() {
        this.form = document.querySelector('form');
        this.campos = this.form.querySelectorAll('input[required], textarea[required]');
        this.mensagensErro = {}; // Objeto para armazenar as mensagens de erro
        this.inicializar();
    }

    inicializar() {
        this.campos.forEach(campo => {
            const mensagemErroElemento = document.createElement('div');
            mensagemErroElemento.className = 'mensagem-erro';
            campo.parentNode.insertBefore(mensagemErroElemento, campo.nextSibling);
            this.mensagensErro[campo.id] = mensagemErroElemento;

            campo.addEventListener('input', () => { // Adicionando listener para o evento 'input'
                this.validarCampo(campo);
            });
        });

        // Adiciona um elemento de mensagem de erro para o grupo de rádio
        const tipoContatoLabel = document.querySelector('.campo-formulario > label:first-child');
        const mensagemErroRadio = document.createElement('div');
        mensagemErroRadio.className = 'mensagem-erro';
        tipoContatoLabel.parentNode.insertBefore(mensagemErroRadio, tipoContatoLabel.nextSibling);
        this.mensagensErro['tipo_contato'] = mensagemErroRadio;

        this.form.addEventListener('submit', (event) => {
            this.validarFormulario(event);
        });
    }

    validarFormulario(event) {
        this.campos.forEach(campo => {
            this.validarCampo(campo);
        });
        this.validarTipoContato();

        if (this.form.querySelectorAll('.erro').length > 0) {
            event.preventDefault();
        } else {
            alert('Os dados do formulário foram inseridos');
            // Aqui você pode adicionar a lógica para enviar o formulário
        }
    }

    validarCampo(campo) {
        const valor = campo.value.trim();
        const id = campo.id;
        let mensagem = '';
        let erro = false;

        if (valor === "") {
            mensagem = "Este campo é obrigatório.";
            erro = true;
        } else if (id === 'nome' && !/^[a-zA-Z\s]+$/.test(valor)) {
            mensagem = "O nome deve conter apenas letras e espaços.";
            erro = true;
        } else if (id === 'email' && !/\S+@\S+\.\S+/.test(valor)) {
            mensagem = "Por favor, insira um email válido.";
            erro = true;
        } else if (id === 'idade' && (isNaN(parseInt(valor)) || parseInt(valor) < 1 || parseInt(valor) > 100)) {
            mensagem = "Por favor, insira uma idade válida (1-100).";
            erro = true;
        } else if (id === 'data_cadastro' && valor === "") {
            mensagem = "A data de cadastro é obrigatória.";
            erro = true;
        } else if (id === 'mensagem' && valor === "") {
            mensagem = "A mensagem é obrigatória.";
            erro = true;
        } else if (id === 'telefone' && valor === "") {
            mensagem = "O telefone é obrigatório.";
            erro = true;
        }

        if (erro) {
            this.mostrarErro(campo, mensagem);
        } else {
            this.removerErro(campo);
        }
    }

    validarTipoContato() {
        const tipoContatoSelecionado = document.querySelector('input[name="tipo_contato"]:checked');
        if (!tipoContatoSelecionado) {
            const campo = document.querySelector('.radio-group');
            campo.classList.add('erro');
            this.mensagensErro['tipo_contato'].textContent = "Por favor, selecione o tipo de contato.";
        } else {
            const campo = document.querySelector('.radio-group');
            campo.classList.remove('erro');
            this.mensagensErro['tipo_contato'].textContent = "";
        }
    }

    mostrarErro(campo, mensagem) {
        campo.classList.add('erro');
        this.mensagensErro[campo.id].textContent = mensagem;
    }

    removerErro(campo) {
        campo.classList.remove('erro');
        this.mensagensErro[campo.id].textContent = '';
    }
}

const formulario = new Formulario();
