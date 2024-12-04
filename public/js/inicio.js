let calendar;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    $('#editar_telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

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

        eventClick: function(arg) {
            document.getElementById("visualizarAgendamento_cliente").innerText = arg.event.title.split(' - ')[0];
            document.getElementById("visualizarAgendamento_servico").innerText = arg.event.title.split(' - ')[1];
            document.getElementById("visualizarAgendamento_barbeiro").innerText = arg.event.extendedProps.barbeiro;
            const telefoneSemMascara = arg.event.extendedProps.telefone.replace(/[^\d]/g, '');
            document.getElementById("visualizarAgendamento_telefone").innerText = telefoneSemMascara;
            document.getElementById("visualizarAgendamento_datahora").innerText = arg.event.start.toLocaleString();

            document.getElementById('editar_id').value = arg.event.id;
            document.getElementById('editar_nome_completo').value = arg.event.title.split(' - ')[0];
            document.getElementById('editar_telefone').value = telefoneSemMascara;
            document.getElementById('editar_dataHora').value = arg.event.start.toISOString().slice(0, 16);

            const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarAgendamentoModal"));
            visualizarModal.show();
        },

        select: function(info) {

            document.getElementById("dataHora").value = info.start.toISOString().slice(0, 16);

            const cadastrarModal = new bootstrap.Modal(document.getElementById("cadastrarAgendamentoModal"));
            cadastrarModal.show();
        }
    });

    calendar.render();

    carregarBarbeiros();
    carregarServicos();

    listarAgendamentosNoCalendario(calendar);
});

function editarAgendamento() {
    const dados = {
        id: document.getElementById('editar_id').value,
        nome_completo: document.getElementById('editar_nome_completo').value,
        telefone: document.getElementById('editar_telefone').value,
        servico_id: document.getElementById('editar_servico').value,
        barbeiro_id: document.getElementById('editar_barbeiro').value,
        datahora: document.getElementById('editar_dataHora').value
    };

    if (!dados.nome_completo || !dados.servico_id || !dados.datahora || !dados.telefone || !dados.barbeiro_id) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!",
            text: "Preencha todos os campos!"
        });
        return;
    }

    app.callController({
        method: 'POST',
        url: base + '/editarAgendamento',
        params: dados,
        onSuccess() {
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

document.getElementById("btnViewEditEvento").addEventListener("click", function() {
    document.querySelector('.visualisarEvento').style.display = 'none';
    document.querySelector('.editarEvento').style.display = 'block';
    
});


document.getElementById("btnCancelarEdicao").addEventListener("click", function() {
    document.querySelector('.editarEvento').style.display = 'none';
    document.querySelector('.visualisarEvento').style.display = 'block';
});

document.getElementById("formEditarAgendamento").addEventListener("submit", function(event) {
    event.preventDefault();
    editarAgendamento();
});

document.getElementById("visualizarAgendamentoModal").addEventListener("hidden.bs.modal", function () {
    document.querySelector('.visualisarEvento').style.display = 'block';
    document.querySelector('.editarEvento').style.display = 'none';
});

document.getElementById("cadastrarAgendamentoModal").addEventListener("hidden.bs.modal", function () {
    document.getElementById('formCadastroAgendamento').reset(); 
});

function carregarBarbeiros() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeirosativos',
        params: null,
        onSuccess(res) {
            let barbeiros = res[0].ret;
            let options = '<option value="" selected>Selecione o Barbeiro</option>';
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

function carregarServicos() {
    app.callController({
        method: 'GET',
        url: base + '/getservicosativos',
        params: null,
        onSuccess(res) {
            let servicos = res[0].ret;
            let options = '<option value="">Selecione o Serviço</option>';
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

function cadastrarAgendamento() {
    const dados = {
        nome_completo: document.getElementById('nome_completo').value,
        telefone: document.getElementById('telefone').value.replace(/[^\d]/g, ''),
        barbeiro_id: document.getElementById('barbeiroSelectModal').value,
        servico_id: document.getElementById('servico').value,
        datahora: document.getElementById('dataHora').value
    };

    if (!dados.nome_completo || !dados.telefone || !dados.barbeiro_id || !dados.servico_id || !dados.datahora) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!",
            text: "Preencha todos os campos!"
        });
        return;
    }

    app.callController({
        method: 'POST',
        url: base + '/cadagendamento',
        params: dados,
        onSuccess() {

            listarAgendamentosNoCalendario(calendar);
            const modalCadastrar = bootstrap.Modal.getInstance(document.getElementById("cadastrarAgendamentoModal"));
            modalCadastrar.hide();

            document.getElementById('formCadastroAgendamento').reset();
            document.getElementById('telefone').value = '';
            document.getElementById('dataHora').value = '';

            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Agendamento realizado com sucesso!"
            });
        },
        onFailure(res) {
            if (res[0].ret && res[0].ret.sucesso === false && res[0].ret.result) {
                Swal.fire({
                    icon: "error",
                    title: "Atenção!!",
                    text: res[0].ret.result
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Atenção!!",
                    text: "Erro ao realizar agendamento!"
                });
            }
        }
    });
}


function abrirModalCadastro(info) {
    document.getElementById('dataHora').value = info.start.toISOString().slice(0, 16);
    const modalCadastrar = new bootstrap.Modal(document.getElementById("cadastrarAgendamentoModal"));
    modalCadastrar.show();
}

document.getElementById("formCadastroAgendamento").addEventListener("submit", function(event) {
    event.preventDefault();
    cadastrarAgendamento();
});

function filtrarPorBarbeiro() {
    const barbeiroSelect = document.getElementById('barbeiroSelect');
    const filtroBarbeiro = barbeiroSelect.value;
    listarAgendamentosNoCalendario(calendar, filtroBarbeiro);
}

$(document).ready(function () {
    $('#dataHora').on('focus', function () {
        $(this).datepicker('option', 'beforeShowDay', function (date) {
            var day = date.getDay();
            return [(day != 0)];
        });
    });

    $('#dataHora').on('change', function () {
        const horariosDisponiveis = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        const dataHoraSelecionada = $(this).val();

        if (dataHoraSelecionada) {
            const data = new Date(dataHoraSelecionada);
            const diaSemana = data.getDay()
            const horaSelecionada = dataHoraSelecionada.split('T')[1].substring(0, 5);

            if (diaSemana == 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Atenção!",
                    text: "Não é permitido agendar para domingo."
                });
                $(this).val('');
                return;
            }

            if (!horariosDisponiveis.includes(horaSelecionada)) {
                Swal.fire({
                    icon: "warning",
                    title: "Atenção!",
                    text: "Selecione um horário: 8h-11h ou 14h-19h (intervalos de 1h)"
                });
                $(this).val('');
            }
        }
    });
});




