$(document).ready(function () {
    listar(); // Carregar a lista de serviços

    // Ao clicar no botão de cadastro/edição
    $('#cadastro').on('click', function () {
        const idServico = $('#idServico').val();
        let dados = {
            nome: $('#nome').val(),
            valor: parseFloat(($('#valor').val() || '').replace(',', '.')) || 0,
            tempoMinutos: parseInt($('#tempoMinutos').val()) || 0
        };
        console.log(idServico);
        if (!app.validarCampos(dados) || dados.valor <= 0 || dados.tempoMinutos <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos corretamente! O valor e o tempo devem ser maiores que zero."
            });
            return;
        }

        if (idServico) {
            dados.id = idServico; // Adiciona o ID ao objeto
            editar(dados);
        } else {
            cadastro(dados);
        }
    });
});

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getServicos', // Rota para listar serviços
        params: null,
        onSuccess(res) {
                Table(res[0].ret);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao listar serviços!"
            });
        }
    });
}

function cadastro(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadServico', // Rota para cadastro de serviços
        params: dados,
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Cadastrado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao cadastrar usuário!"
            });
        }
    });
}

function editar(dados) {
    app.callController({
        method: 'POST',
        url: base + '/editarServico', // Rota para edição de serviços
        params: dados,
        onSuccess() {
                listar();
                limparForm();
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "Editado com sucesso!"
                });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao editar serviço!"
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
            { title: 'Nome', data: 'nome' },
            {
                title: 'Valor',
                data: 'valor',
                render: function (data) {
                    return `R$ ${parseFloat(data).toFixed(2)}`.replace('.', ',');
                }
            },
            { title: 'Tempo (min)', data: 'tempoMinutos' },
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
                    return `<button class="btn btn-primary" onclick="setEditar(${rowData})">Editar</button>
                            <button class="btn btn-danger" onclick="confirmAlterarSituacao(${row.id}, 2, ${row.idsituacao}, 'Inativar')">Inativar</button>
                            <button class="btn btn-success" onclick="confirmAlterarSituacao(${row.id}, 1, ${row.idsituacao}, 'Ativar')">Ativar</button>`;
                }
            }
        ]
    });
}

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

function limparForm() {
    $('#form-title').text('Cadastrando Serviço').css('color', 'black');
    $('#idServico').val('');
    $('#nome').val('');
    $('#valor').val('');
    $('#tempoMinutos').val('');
}

function confirmAlterarSituacao(id, idsituacao, atualSituacao, acao) {
    if (idsituacao == atualSituacao) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!",
            text: `O serviço já está ${atualSituacao === 2 ? 'Inativo' : 'Ativo'}.`
        });
        return;
    }

    Swal.fire({
        title: 'Confirmação',
        text: `Você tem certeza que deseja ${acao.toLowerCase()} este serviço?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            alterarSituacao(id, idsituacao);
        }
    });
}


function alterarSituacao(id, idsituacao) {
    console.log('Chegou aqui');
    app.callController({
        method: 'POST',
        url: base + '/updateSituacao', // Rota para alteração de situação
        params: { id, idsituacao },
        onSuccess() {
                listar();
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: res.result
                });
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: res.result
                });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao alterar situação do serviço!"
            });
        }
    });
}
