let calendar; // Variável global para o calendário

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

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
        editable: true,
        navLinks: true,
        events: [],

        // Quando o evento for clicado
        eventClick: function(arg) {
            // Abre a modal de visualização com os dados do evento
            const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarAgendamentoModal"));

            // Preenche os dados da modal
            document.getElementById("visualizarAgendamento_cliente").innerText = arg.event.title.split(' - ')[0]; // Cliente
            document.getElementById("visualizarAgendamento_servico").innerText = arg.event.title.split(' - ')[1]; // Serviço
            document.getElementById("visualizarAgendamento_datahora").innerText = arg.event.start.toLocaleString(); // Data e Hora

            // Exibe a modal
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

// Função para carregar barbeiros e preencher o select
function carregarBarbeiros() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',
        params: null,
        onSuccess(res) {
            let barbeiros = res[0].ret;
            let options = '<option value="">Selecione o Barbeiro</option>';
            barbeiros.forEach(barbeiro => {
                options += `<option value="${barbeiro.id}">${barbeiro.nome}</option>`;
            });
            document.getElementById('barbeiroSelect').innerHTML = options;
            document.getElementById('barbeiroSelectModal').innerHTML = options;
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
        url: base + '/getservicos',
        params: null,
        onSuccess(res) {
            let servicos = res[0].ret;
            let options = '';
            servicos.forEach(servico => {
                options += `<option value="${servico.id}">${servico.nome}</option>`;
            });
            document.getElementById('servico').innerHTML = options;
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
