$(document).ready(function () {
    carregarBarbeiros();
    carregarServicos();
    listarAgendamentos();

    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    $('#cadastro').on('click', function () {
        let dados = {
            nome_completo: $('#nome_completo').val(),
            telefone: $('#telefone').val().replace(/[^\d]/g, ''),
            barbeiro_id: $('#barbeiro_id').val(),
            servico_id: $('#servico_id').val(),
            datahora: $('#datahora').val()
        };

        if (!app.validarCampos(dados)) {
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
                text: "Telefone inválido! O número de telefone deve conter 11 dígitos (incluindo o DDD)."
            });
            return;
        }

        if ($('#id').val()) {
            dados.id = $('#id').val()
            editarAgendamento(dados);
        } else {
            agendar(dados);
        }
    });
});

function validarTelefone(telefone) {
    const apenasNumeros = telefone.replace(/\D/g, '');

    if (apenasNumeros.length !== 11) {
        return null; 
    }

    const ddd = apenasNumeros.slice(0, 2);
    const numero = apenasNumeros.slice(2);
    const telefoneFormatado = `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;

    return telefoneFormatado;
}

function validarNome(nome) {
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nomeRegex.test(nome)) {
        Swal.fire({ icon: "warning", title: "Atenção!!", text: "O nome pode conter apenas letras e espaços." });
        return false;
    }
    return true;
}

function listarAgendamentos() {
    app.callController({
        method: 'GET',
        url: base + '/getAgendamentos',
        params: null,
        onSuccess(res) {
            Table(res[0].ret);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar agendamentos!"
            });
        }
    });
}

let barbeirosMap = {}; 
let servicosMap = {};

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
                barbeirosMap[barbeiro.nome] = barbeiro.id;
            });
            $('#barbeiro_id').html(options);
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
                options += `<option value="${servico.id}">${servico.nome} - R$ ${servico.valor}</option>`;
                servicosMap[servico.nome] = servico.id; // Preenche o mapa
            });
            $('#servico_id').html(options);
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

const Table = function (dados) {
    const table = $('#mytable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        stateSave: true,
        bDestroy: true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json"
        },
        data: dados,
        columns: [
            { title: 'Cliente', data: 'cliente', render: data => `<strong>${data}</strong>` },
            {
                title: 'Telefone',
                data: 'telefone',
                render: data => {
                    if (data.length === 10) {
                        return data.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
                    } else if (data.length === 11) {
                        return data.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
                    }
                    return data;
                }
            },
            { title: 'Barbeiro', data: 'barbeiro' },
            { title: 'Serviço', data: 'servico' },
            { 
                title: 'Data', 
                data: 'datahora',
                render: data => {
                    const date = new Date(data); 
                    return `<strong>${date.toLocaleDateString('pt-BR')}</strong>`;  
                },
                orderData: [4]
            },
            { 
                title: 'Hora', 
                data: 'datahora',
                render: data => {
                    const date = new Date(data);
                    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); 
                },
                orderData: [4] 
            },
            {
                title: 'Ações',
                data: null,
                render: (data, type, row) => {
                    const rowData = JSON.stringify(row).replace(/"/g, '&quot;');
                    return `<div class="dropdown" style="display: inline-block; cursor: pointer;">
                                <a class="text-secondary" id="actionsDropdown${row.id}" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; cursor: pointer;">
                                    <i class="fas fa-ellipsis-h"></i>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="actionsDropdown${row.id}">
                                    <li><a class="dropdown-item text-primary" onclick="setEditar(${rowData})">Editar</a></li>
                                    <li><a class="dropdown-item text-danger" onclick="confirmCancelar(${row.id})">Cancelar</a></li>
                                </ul>
                            </div>`;
                }
            }
        ],
        order: [[4, 'asc']] 
    });

    $('#btnBuscar').off('click').on('click', function () {
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();
    
        if (startDate && endDate && endDate < startDate) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!",
                text: "A data final não pode ser menor que a data inicial."
            });
            return;
        }
    
        $('#mytable').DataTable().draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const startDateInput = $('#start_date').val();
        const endDateInput = $('#end_date').val();
        const filterBarbeiro = $('#filter_barbeiro').val();
    
        const dateColumnIndex = 4;
        const rowDateStr = data[dateColumnIndex];
    
        const barbeiroColumnIndex = 2;
        const rowBarbeiro = data[barbeiroColumnIndex];
    
        const rowDate = new Date(rowDateStr.split('/').reverse().join('-'));
        const startDate = startDateInput ? new Date(startDateInput) : null;
        const endDate = endDateInput ? new Date(endDateInput) : null;

        if (startDate && rowDate < startDate) return false;
        if (endDate && rowDate > endDate) return false;

        if (filterBarbeiro && filterBarbeiro !== rowBarbeiro) return false;
    
        return true;
    });
};

function carregarBarbeirosFiltro() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',
        params: null,
        onSuccess(res) {
            let barbeiros = res[0].ret;
            let options = '<option value="">Todos os Barbeiros</option>';
            barbeiros.forEach(barbeiro => {
                options += `<option value="${barbeiro.nome}">${barbeiro.nome}</option>`;
            });
            $('#filter_barbeiro').html(options);
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

$(document).ready(function () {
    carregarBarbeirosFiltro();
});

$(document).ready(function () {
    $('#btnLimpar').on('click', function () {
        $('#start_date').val('');
        $('#end_date').val('');
        $('#filter_barbeiro').val('');

        $('#mytable').DataTable().draw();
    });

    $('#btnBuscar').on('click', function () {
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();

        if (startDate && endDate && endDate < startDate) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!",
                text: "A data final não pode ser menor que a data inicial."
            });
            return;
        }

        $('#mytable').DataTable().draw();
    });
});

function agendar(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadagendamento',
        params: dados,
        onSuccess() {
            listarAgendamentos();
            limparFormulario();
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

function setEditar(row) {
    $('#form-title').text('Editando Agendamento').css('color', 'blue');
    $('#id').val(row.id);
    $('#nome_completo').val(row.cliente);
    $('#telefone').val(row.telefone);

    let barbeiroID = barbeirosMap[row.barbeiro];
    let servicoID = servicosMap[row.servico];

    if (barbeiroID) {
        $('#barbeiro_id').val(barbeiroID);
    } else {
        console.warn(`Barbeiro não encontrado: ${row.barbeiro}`);
    }

    if (servicoID) {
        $('#servico_id').val(servicoID);
    } else {
        console.warn(`Serviço não encontrado: ${row.servico}`);
    }

    $('#datahora').val(row.datahora);
    $('html, body').animate({ scrollTop: $(".form-container").offset().top }, 100);
}

function editarAgendamento(dados) {
    app.callController({
        method: 'POST',
        url: base + '/editarAgendamento',
        params: dados,
        onSuccess() {
            listarAgendamentos();
            limparFormulario();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Agendamento editado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao editar agendamento!"
            });
        }
    });
}

function confirmCancelar(id) {
    Swal.fire({
        title: 'Confirmação',
        text: 'Você tem certeza que deseja cancelar este agendamento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            cancelarAgendamento(id);
        }
    });
}

function cancelarAgendamento(id) {
    app.callController({
        method: 'POST',
        url: base + '/updateSituacaoAgendamento',
        params: { id, situacao: 'Cancelado' },
        onSuccess() {
            listarAgendamentos();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Agendamento cancelado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao cancelar agendamento!"
            });
        }
    });
}

function limparFormulario() {
    $('#form-title').text('Novo Agendamento').css('color', 'black');
    $('#nome_completo').val('');
    $('#telefone').val('');
    $('#barbeiro_id').val('');
    $('#servico_id').val('');
    $('#datahora').val('');
    $('#id').val('');
}

$(document).ready(function () {
    $('#datahora').on('focus', function () {
        $(this).datepicker('option', 'beforeShowDay', function (date) {
            var day = date.getDay();
            return [(day != 0)];
        });
    });

    $('#datahora').on('change', function () {
        const horariosDisponiveis = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        const dataHoraSelecionada = $(this).val();
        
        if (dataHoraSelecionada) {
            const data = new Date(dataHoraSelecionada);
            const diaSemana = data.getDay();
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


