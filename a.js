class Formulario {

    constructor() {
        // Não precisamos mais das referências e listeners dos asteriscos
    }

    Enviar() {
        this.nome = document.getElementById('nome').value;
        this.email = document.getElementById('email').value;
        this.tipo_contato = document.querySelector('input[name="tipo_contato"]:checked')?.value; // Captura o valor do radio selecionado
        this.fone = document.getElementById('telefone').value;
        this.idade = document.getElementById('idade').value;
        this.data_cadastro = document.getElementById('data_cadastro').value;
        this.mensagem = document.getElementById('mensagem').value;

        if (this.nome.trim() === "") {
            alert("O nome precisa ser preenchido.");
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(this.nome)) {
            alert("O nome deve conter apenas letras e espaços.");
            return false;
        }

        if (this.email.trim() === "") {
            alert("O email precisa ser preenchido");
            return false;
        }

        if (!this.tipo_contato) {
            alert("Por favor, selecione o tipo de contato.");
            return false;
        }

        if (this.fone.trim() === "") {
            alert("O telefone precisa ser preenchido");
            return false;
        }

        if (this.idade.trim() === "") {
            alert("A idade precisa ser preenchida");
            return false;
        }

        if (this.data_cadastro === "") {
            alert("A data de cadastro precisa ser preenchida");
            return false;
        }

        if (this.mensagem.trim() === "") {
            alert("O campo mensagem precisa ser preenchido");
            return false;
        }

        alert('Os dados do formulário foram inseridos');
        return true;
    }

}

const formulario = new Formulario();

document.querySelector('form').addEventListener('submit', function(event) {
    if (!formulario.Enviar()) {
        event.preventDefault();
    }
});