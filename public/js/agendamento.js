$(document).ready(function () {
    listar();  // Carregar a lista de agendamentos

    $('#cadastro').on('click', function () {
        const idAgendamento = $('#idAgendamento').val();
        let dados = {
            datahora: $('#datahora').val(),
            barbeiro: $('#barbeiro').val(),
            servico: $('#servico').val(),
            usuario: $('#usuario').val()
        };

        if (!app.validarCampos(dados)) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos!"
            });
            return;
        }

        if (idAgendamento) {
            editar(dados, idAgendamento);
        } else {
            cadastro(dados);
        }
    });
});

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getAgendamentos',
        params: null,
        onSuccess(res) {
            Table(res.result);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar Agendamentos!"
            });
        }
    });
}

function cadastro(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadAgendamento',
        params: dados,
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Agendamento cadastrado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao cadastrar agendamento!"
            });
        }
    });
}

// Função para exibir os dados dos agendamentos na tabela
const Table = function (dados) {
    $('#mytable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        stateSave: true,
        bDestroy: true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json"
        },
        data: dados,
        columns: [
            {
                title: 'Data e Hora',
                data: 'datahora',
                render: function (data) {
                    return `<strong>${data}</strong>`;
                }
            },
            {
                title: 'Barbeiro',
                data: 'barbeiro',
                render: function (data) {
                    return data;
                }
            },
            {
                title: 'Serviço',
                data: 'servico',
                render: function (data) {
                    return data;
                }
            },
            {
                title: 'Usuário',
                data: 'usuario',
                render: function (data) {
                    return data;
                }
            },
            {
                title: 'Status',
                data: 'situacao',
                render: function (data) {
                    const statusClass = data === 'Ativo' ? 'status-ativo' : 'status-inativo';
                    return `<span class="${statusClass}">${data}</span>`;
                }
            },
            {
                title: 'Ações',
                data: null,
                render: function (data, type, row) {
                    const rowData = JSON.stringify(row).replace(/"/g, '&quot;');
                    return `<div class="dropdown" style="display: inline-block; cursor: pointer;">
                                <a class="text-secondary" id="actionsDropdown${row.id}" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; cursor: pointer;">
                                    <i class="fas fa-ellipsis-h"></i>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="actionsDropdown${row.id}">
                                    <li><a class="dropdown-item text-primary" onclick="setEditar(${rowData})">Editar</a></li>
                                    <li><a class="dropdown-item text-danger" onclick="confirmUpdateSituacao(${row.id}, 2, 'Inativar')">Inativar</a></li>
                                    <li><a class="dropdown-item text-success" onclick="confirmUpdateSituacao(${row.id}, 1, 'Ativar')">Ativar</a></li>
                                </ul>
                            </div>`;
                }
            }
        ]
    });
};

function setEditar(row) {
    $('#form-title').text('Editando Agendamento').css('color', 'blue');
    $('#idAgendamento').val(row.id);
    $('#datahora').val(row.datahora);
    $('#barbeiro').val(row.barbeiro);
    $('#servico').val(row.servico);
    $('#usuario').val(row.usuario);

    $('html, body').animate({
        scrollTop: $(".form-container").offset().top
    }, 100);
}

function editar(dados, id) {
    app.callController({
        method: 'POST',
        url: base + '/editarAgendamento',
        params: { id: id, datahora: dados.datahora, barbeiro: dados.barbeiro, servico: dados.servico, usuario: dados.usuario },
        onSuccess() {
            listar();
            limparForm();
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
                text: "Erro ao editar Agendamento!"
            });
        }
    });
}

function limparForm() {
    $('#form-title').text('Cadastrando Agendamentos');
    $('#datahora').val('');
    $('#barbeiro').val('');
    $('#servico').val('');
    $('#usuario').val('');
    $('#idAgendamento').val('');
}
