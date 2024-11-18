$(document).ready(function () {
    listar();  // Carregar a lista de serviços

    $('#cadastro').on('click', function () {
        const idServico = $('#idServico').val();
        let dados = {
            nome: $('#nome').val(),
            valor: $('#valor').val(),
            tempoMinutos: $('#tempoMinutos').val()
        };

        if (!app.validarCampos(dados)) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos!"
            });
            return;
        }

        if (idServico) {
            editar(dados, idServico);
        } else {
            cadastro(dados);
        }
    });
});

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getServicos',
        params: null,
        onSuccess(res) {
            Table(res.result);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar Serviços!"
            });
        }
    });
}

function cadastro(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadServico',
        params: dados,
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Serviço cadastrado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao cadastrar serviço!"
            });
        }
    });
}

// Função para exibir os dados dos serviços na tabela
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
                title: 'Nome',
                data: 'nome',
                render: function (data) {
                    return `<strong>${data}</strong>`;
                }
            },
            {
                title: 'Valor',
                data: 'valor',
                render: function (data) {
                    return `R$ ${parseFloat(data).toFixed(2)}`;
                }
            },
            {
                title: 'Tempo (minutos)',
                data: 'tempoMinutos',
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
    $('#form-title').text('Editando Serviço').css('color', 'blue');
    $('#idServico').val(row.id);
    $('#nome').val(row.nome);
    $('#valor').val(row.valor);
    $('#tempoMinutos').val(row.tempoMinutos);

    $('html, body').animate({
        scrollTop: $(".form-container").offset().top
    }, 100);
}

function editar(dados, id) {
    app.callController({
        method: 'POST',
        url: base + '/editarServico',
        params: { id: id, nome: dados.nome, valor: dados.valor, tempoMinutos: dados.tempoMinutos },
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Serviço editado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao editar Serviço!"
            });
        }
    });
}

function limparForm() {
    $('#form-title').text('Cadastrando Serviços');
    $('#nome').val('');
    $('#valor').val('');
    $('#tempoMinutos').val('');
    $('#idServico').val('');
}
