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
                text: "Telefone inválido! Por favor, insira um telefone válido."
            });
            return;
        }

        if ($('#id').val()) {
            dados.id = $('#id').val();
            editarAgendamento(dados);
        } else {
            agendar(dados);
        }
    });
});

function validarTelefone(telefone) {
    const apenasNumeros = telefone;
    const ddd = apenasNumeros.slice(0, 2);
    const numero = apenasNumeros.slice(2);
    const telefoneFormatado = `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;

    return telefoneFormatado;
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
        url: base + '/getservicos',
        params: null,
        onSuccess(res) {
            let servicos = res[0].ret;
            let options = '<option value="">Selecione o Serviço</option>';
            servicos.forEach(servico => {
                options += `<option value="${servico.id}">${servico.nome} - R$ ${servico.valor}</option>`;
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
                    const date = data.split(' ')[0]; 
                    const time = data.split(' ')[1]; 
                    return `<strong>${date}</strong>`; 
                },
                orderData: [4]  
            },
            { 
                title: 'Hora', 
                data: 'datahora',
                render: data => {
                    const time = data.split(' ')[1]; 
                    return time ? time.substring(0, 5) : ''; 
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
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();
        const filterBarbeiro = $('#filter_barbeiro').val();

        const dateColumnIndex = 4; 
        const rowDate = data[dateColumnIndex];

        const barbeiroColumnIndex = 2; 
        const rowBarbeiro = data[barbeiroColumnIndex];

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
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao realizar agendamento!"
            });
        }
    });
}

function setEditar(row) {
    $('#form-title').text('Editando Agendamento').css('color', 'blue');
    $('#id').val(row.id);
    $('#nome_completo').val(row.nome_completo);
    $('#telefone').val(row.telefone);
    $('#barbeiro_id').val(row.barbeiro_id);
    $('#servico_id').val(row.servico_id);
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
