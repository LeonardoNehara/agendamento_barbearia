$(document).ready(function () {
    carregarBarbeiros();  // Carregar lista de barbeiros
    carregarServicos();   // Carregar lista de serviços
    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    // Evento ao clicar no botão de agendamento
    $('#cadastro').on('click', function () {
        let dados = {
            nome_completo: $('#nome_completo').val(),
            telefone: $('#telefone').val().replace(/[^\d]/g, ''),  // Remover máscara
            barbeiro_id: $('#barbeiro_id').val(),
            servico_id: $('#servico_id').val(),
            datahora: $('#datahora').val()
        };
    
        if (!validarCampos(dados)) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos!"
            });
            return;
        }

        if (!validarTelefone(dados.telefone)) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Telefone inválido! Por favor, insira um telefone válido."
            });
            return;
        }

        agendar(dados);  // Chamar a função de agendamento
    });
});

// Função para carregar os barbeiros
function carregarBarbeiros() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',  // API ou controller que retorna a lista de barbeiros
        params: null,
        onSuccess(res) {
            let barbeiros = res[0].ret;
            
            let options = '<option value="">Selecione o Barbeiro</option>';
            barbeiros.forEach(barbeiro => {
                options += `<option value="${barbeiro.id}">${barbeiro.nome}</option>`;
            });
            $('#barbeiro_id').html(options);  // Preenche o select com os barbeiros
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao carregar barbeiros!"
            });
        }
    });
}

// Função para carregar os serviços
function carregarServicos() {
    app.callController({
        method: 'GET',
        url: base + '/getservicos',  // API ou controller que retorna a lista de serviços
        params: null,
        onSuccess(res) {
            let servicos = res[0].ret;

            let options = '<option value="">Selecione o Serviço</option>';
            servicos.forEach(servico => {
                options += `<option value="${servico.id}">${servico.nome} - R$ ${servico.valor}</option>`;
            });
            $('#servico_id').html(options);  // Preenche o select com os serviços
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao carregar serviços!"
            });
        }
    });
}

// Função para validar campos obrigatórios
function validarCampos(dados) {
    for (let key in dados) {
        if (dados[key] === "") return false;  // Verifica se algum campo está vazio
    }
    return true;
}

// Função para validar telefone
function validarTelefone(telefone) {
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length === 11;  // Verifica se o telefone tem o formato correto (11 dígitos)
}

// Função para agendar o serviço
function agendar(dados) {
    app.callController({
        method: 'POST',
        url: base + '/agendar',  // API ou controller que realiza o agendamento
        params: dados,
        onSuccess() {
            Swal.fire({
                icon: "success",
                title: "Agendamento realizado!",
                text: "Seu agendamento foi realizado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao realizar o agendamento!"
            });
        }
    });
}
