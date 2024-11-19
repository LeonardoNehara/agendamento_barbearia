$(document).ready(function () {
    listar();  // Carregar a lista de produtos

    $('#cadastro').on('click', function () {
        const idProduto = $('#idProduto').val();
        let dados = {
            nome: $('#nome').val(),
            valorCompra: $('#valorCompra').val(),
            valorVenda: $('#valorVenda').val()
        };

        if (!app.validarCampos(dados)) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos!"
            });
            return;
        }

        if (idProduto) {
            editar(dados, idProduto);
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

// Função para exibir os dados dos produtos na tabela
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
                title: 'Valor de Compra',
                data: 'valorCompra',
                render: function (data) {
                    return `R$ ${parseFloat(data).toFixed(2)}`;
                }
            },
            {
                title: 'Valor de Venda',
                data: 'valorVenda',
                render: function (data) {
                    return `R$ ${parseFloat(data).toFixed(2)}`;
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
    $('#form-title').text('Editando Produto').css('color', 'blue');
    $('#idProduto').val(row.id);
    $('#nome').val(row.nome);
    $('#valorCompra').val(row.valorCompra);
    $('#valorVenda').val(row.valorVenda);
    
    $('html, body').animate({
        scrollTop: $(".form-container").offset().top
    }, 100);
}

function editar(dados, id) {
    app.callController({
        method: 'POST',
        url: base + '/editarProduto',
        params: { id: id, nome: dados.nome, valorCompra: dados.valorCompra, valorVenda: dados.valorVenda },
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

function limparForm() {
    $('#form-title').text('Cadastrando Produtos');
    $('#nome').val('');
    $('#valorCompra').val('');
    $('#valorVenda').val('');
    $('#idProduto').val('');
}
