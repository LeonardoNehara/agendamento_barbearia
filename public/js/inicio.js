let calendar;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Adiciona a máscara no campo de telefone da modal de cadastro
    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    // Adiciona a máscara no campo de telefone da modal de edição
    $('#editar_telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    // Inicializa o calendário
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: false,
        navLinks: true,
        events: [],

        // Quando o evento for clicado
        eventClick: function(arg) {
            console.log('Evento clicado:', arg.event);
            // Preenche os dados da modal de visualização
            document.getElementById("visualizarAgendamento_cliente").innerText = arg.event.title.split(' - ')[0]; // Cliente
            document.getElementById("visualizarAgendamento_servico").innerText = arg.event.title.split(' - ')[1]; // Serviço
            document.getElementById("visualizarAgendamento_barbeiro").innerText = arg.event.extendedProps.barbeiro; // Barbeiro
            const telefoneSemMascara = arg.event.extendedProps.telefone.replace(/[^\d]/g, '');
            document.getElementById("visualizarAgendamento_telefone").innerText = telefoneSemMascara; // Telefone sem máscara
            document.getElementById("visualizarAgendamento_datahora").innerText = arg.event.start.toLocaleString(); // Data e Hora

            // Preenche os dados do formulário de edição
            document.getElementById('editar_id').value = arg.event.id;
            document.getElementById('editar_nome_completo').value = arg.event.title.split(' - ')[0]; // Cliente
            document.getElementById('editar_telefone').value = telefoneSemMascara; // Telefone sem máscara
            document.getElementById('editar_barbeiro').value = arg.event.extendedProps.barbeiro;
            const teste = document.getElementById('editar_barbeiro').selectedIndex = arg.event.extendedProps.barbeiro.id;
            console.log(teste);
            document.getElementById('editar_servico').value = arg.event.extendedProps.servico; 
            const teste2 = document.getElementById('editar_servico').value = arg.event.extendedProps.servico;
            console.log(teste2);
            document.getElementById('editar_dataHora').value = arg.event.start.toISOString().slice(0, 16); // Data e Hora

            // Exibe a modal de visualização e esconde a de edição
            const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarAgendamentoModal"));
            visualizarModal.show();
        },

        // Quando o dia for clicado
        select: function(info) {
            // Chama a função para preencher o formulário com a data selecionada
            document.getElementById("dataHora").value = info.start.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:mm

            // Abre o modal de cadastro
            const cadastrarModal = new bootstrap.Modal(document.getElementById("cadastrarAgendamentoModal"));
            cadastrarModal.show();
        }
    });

    calendar.render();

    // Carregar barbeiros e serviços dinamicamente
    carregarBarbeiros();
    carregarServicos();

    // Carregar agendamentos no calendário inicialmente
    listarAgendamentosNoCalendario(calendar);
});

// Função para editar o agendamento
function editarAgendamento() {
    const dados = {
        id: document.getElementById('editar_id').value,
        nome_completo: document.getElementById('editar_nome_completo').value,
        telefone: document.getElementById('editar_telefone').value,
        servico_id: document.getElementById('editar_servico').value,
        barbeiro_id: document.getElementById('editar_barbeiro').value,
        datahora: document.getElementById('editar_dataHora').value
    };

    // Validação dos campos
    if (!dados.nome_completo || !dados.servico_id || !dados.datahora || !dados.telefone || !dados.barbeiro_id) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!",
            text: "Preencha todos os campos!"
        });
        return;
    }

    // Enviar os dados para o backend
    app.callController({
        method: 'POST',
        url: base + '/editarAgendamento', // A URL para editar o agendamento
        params: dados,
        onSuccess() {
            // Após sucesso, atualiza o calendário e fecha a modal
            listarAgendamentosNoCalendario(calendar);
            const visualizarModal = bootstrap.Modal.getInstance(document.getElementById("visualizarAgendamentoModal"));
            visualizarModal.hide();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Agendamento atualizado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!",
                text: "Erro ao atualizar agendamento!"
            });
        }
    });
}

// Evento de click no botão de editar na modal de visualização
document.getElementById("btnViewEditEvento").addEventListener("click", function() {
    // Exibe a seção de edição e esconde a de visualização
    document.querySelector('.visualisarEvento').style.display = 'none';
    document.querySelector('.editarEvento').style.display = 'block';
    
});

// Evento de clique no botão "Cancelar" da seção de edição
document.getElementById("btnCancelarEdicao").addEventListener("click", function() {
    // Esconde a seção de edição
    document.querySelector('.editarEvento').style.display = 'none';

    // Mostra novamente a seção de visualização
    document.querySelector('.visualisarEvento').style.display = 'block';
    location.reload();
});

// Evento de submissão do formulário de edição
document.getElementById("formEditarAgendamento").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    editarAgendamento();
});


// Função para carregar barbeiros e preencher o select
function carregarBarbeiros() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeirosativos',
        params: null,
        onSuccess(res) {
            let barbeiros = res[0].ret;
            let options = '<option value="">Selecione o Barbeiro</option>';
            barbeiros.forEach(barbeiro => {
                options += `<option value="${barbeiro.id}">${barbeiro.nome}</option>`;
            });
            document.getElementById('editar_barbeiro').innerHTML = options;
            document.getElementById('barbeiroSelect').innerHTML = options;
            document.getElementById('barbeiroSelectModal').innerHTML = options;
            document.getElementById('editar_barbeiro').innerHTML = options;
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

// Função para carregar os serviços no select
function carregarServicos() {
    app.callController({
        method: 'GET',
        url: base + '/getservicosativos',
        params: null,
        onSuccess(res) {
            let servicos = res[0].ret;
            let options = '';
            servicos.forEach(servico => {
                options += `<option value="${servico.id}">${servico.nome}</option>`;
            });
            document.getElementById('servico').innerHTML = options;
            document.getElementById('editar_servico').innerHTML = options;
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

// Função para listar agendamentos no calendário
function listarAgendamentosNoCalendario(calendar, filtroBarbeiro = null) {
    app.callController({
        method: 'GET',
        url: base + '/getAgendamentos',
        params: { barbeiro: filtroBarbeiro },
        onSuccess(res) {
            if (res[0].success === true && res[0].ret && Array.isArray(res[0].ret)) {
                const agendamentos = res[0].ret.map(agendamento => ({
                    id: agendamento.id,
                    title: `${agendamento.cliente} - ${agendamento.servico}`,
                    barbeiro: agendamento.barbeiro,
                    telefone: agendamento.telefone,
                    start: agendamento.datahora.replace(' ', 'T'),
                    allDay: false
                }));

                calendar.removeAllEvents();
                calendar.addEventSource(agendamentos);
            } else {
                console.error('Estrutura de resposta inesperada:', res);
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Erro ao listar agendamentos no calendário! Estrutura inesperada."
                });
            }
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Erro ao listar agendamentos no calendário!"
            });
        }
    });
}

// Função para cadastrar um agendamento
function cadastrarAgendamento() {
    const dados = {
        nome_completo: document.getElementById('nome_completo').value,
        telefone: document.getElementById('telefone').value.replace(/[^\d]/g, ''),
        barbeiro_id: document.getElementById('barbeiroSelectModal').value,
        servico_id: document.getElementById('servico').value,
        datahora: document.getElementById('dataHora').value
    };

    // Validação dos campos
    if (!dados.nome_completo || !dados.telefone || !dados.barbeiro_id || !dados.servico_id || !dados.datahora) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!",
            text: "Preencha todos os campos!"
        });
        return;
    }

    // Enviar os dados para o backend
    app.callController({
        method: 'POST',
        url: base + '/cadagendamento',
        params: dados,
        onSuccess() {
            // Após sucesso, atualiza o calendário e fecha a modal
            listarAgendamentosNoCalendario(calendar);
            const modalCadastrar = bootstrap.Modal.getInstance(document.getElementById("cadastrarAgendamentoModal"));
            modalCadastrar.hide();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Agendamento realizado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!",
                text: "Erro ao realizar agendamento!"
            });
        }
    });
}

// Função para abrir a modal de cadastro
function abrirModalCadastro(info) {
    document.getElementById('dataHora').value = info.start.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:mm
    const modalCadastrar = new bootstrap.Modal(document.getElementById("cadastrarAgendamentoModal"));
    modalCadastrar.show();
}

// Eventos de submissão do formulário de cadastro
document.getElementById("formCadastroAgendamento").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    cadastrarAgendamento();
});

// Função para filtrar agendamentos por barbeiro
function filtrarPorBarbeiro() {
    const barbeiroSelect = document.getElementById('barbeiroSelect');
    const filtroBarbeiro = barbeiroSelect.value; // ID do barbeiro selecionado

    console.log('Barbeiro Selecionado:', filtroBarbeiro);
    listarAgendamentosNoCalendario(calendar, filtroBarbeiro);
}
