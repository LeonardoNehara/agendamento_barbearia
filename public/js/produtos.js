$(document).ready(function () {
    listar();
    $('#cadastro').on('click', function () {
        const idProduto = $('#idProduto').val();
        const teste = $('#valorCompra').val();
        let dados = {
            nome: $('#nome').val(),
            valorCompra: parseFloat(($('#valorCompra').val() || '').replace(',', '.')) || 0,
            valorVenda: parseFloat(($('#valorVenda').val() || '').replace(',', '.')) || 0
        };
        console.log(teste);
        
        if (!app.validarCampos(dados) || dados.valorCompra <= 0 || dados.valorVenda <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos corretamente! Os valores de compra e venda devem ser maiores que zero."
            });
            return;
        }

        if ($('#idProduto').val()) {
            dados.id = idProduto;
            editar(dados);
        } else {
            cadastro(dados);
        }
    });
});

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getProdutos',
        params: null,
        onSuccess(res) {
            Table(res[0].ret);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar Produtos!"
            });
        }
    });
}

function cadastro(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadProduto',
        params: dados,
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Produto cadastrado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao cadastrar produto!"
            });
        }
    });
}

function editar(dados) {
    app.callController({
        method: 'POST',
        url: base + '/editarProduto',
        params: dados,
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Produto editado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao editar Produto!"
            });
        }
    });
}

function Table(dados) {
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
                title: 'Valor de Compra',
                data: 'valorCompra',
                render: function (data) {
                    return `R$ ${parseFloat(data).toFixed(2)}`.replace('.', ',');
                }
            },
            {
                title: 'Valor de Venda',
                data: 'valorVenda',
                render: function (data) {
                    return `R$ ${parseFloat(data).toFixed(2)}`.replace('.', ',');
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
                                    <li><a class="dropdown-item text-danger" onclick="confirmUpdateSituacao(${row.id}, 2, '${row.situacao}')">Inativar</a></li>
                                    <li><a class="dropdown-item text-success" onclick="confirmUpdateSituacao(${row.id}, 1, '${row.situacao}')">Ativar</a></li>
                                </ul>
                            </div>`;
                }
            }
        ]
    });
}

function setEditar(row) {
    $('#form-title').text('Editando Produto').css('color', 'blue');
    $('#idProduto').val(row.id);
    $('#nome').val(row.nome);
    $('#valorCompra').val(row.valorCompra);
    $('#valorVenda').val(row.valorVenda);
    $('html, body').animate({scrollTop: $(".form-container").offset().top
    }, 100);
}

function limparForm() {
    $('#form-title').text('Cadastrando Produtos').css('color', 'black');
    $('#nome').val('');
    $('#valorCompra').val('');
    $('#valorVenda').val('');
    $('#idProduto').val('');
}

function confirmUpdateSituacao(id, situacao, atualSituacao) {
    if (atualSituacao === (situacao === 1 ? 'Ativo' : 'Inativo')) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!",
            text: `Produto já está ${atualSituacao.toLowerCase()}!`
        });
        return;
    }

    Swal.fire({
        title: 'Confirmação',
        text: `Deseja realmente ${situacao === 1 ? 'ativar' : 'inativar'} o produto?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            updateSituacao(id, situacao);
        }
    });
}

function updateSituacao(id, situacao) {
    app.callController({
        method: 'POST',
        url: base + '/updateSituacaoProduto',
        params: { id, situacao },
        onSuccess() {
            listar();
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Erro ao atualizar situação!"
            });
        }
    });
}
