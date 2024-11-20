$(document).ready(function () {
    listar();  // Carregar a lista de barbeiros
    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });
    $('#cadastro').on('click', function () {

        let dados = {
            nome: $('#nome').val(),
            telefone: $('#telefone').val().replace(/[^\d]/g, '') // Removendo a máscara antes de enviar
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
                text: "Telefone inválido! Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX."
            });
            return;
        }

        if ($('#id').val()) {
            dados.id = $('#id').val()
            editar(dados);
        } else {
            cadastro(dados);
        }
    });
});

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',
        params: null,
        onSuccess(res) {
            Table(res[0].ret);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar Barbeiros!"
            });
        }
    });
}

function validarTelefone(telefone) {

    const apenasNumeros = telefone;
    const ddd = apenasNumeros.slice(0, 2); // Primeiros dois dígitos
    const numero = apenasNumeros.slice(2); // O restante do número

    const telefoneFormatado = `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;
 

    return telefoneFormatado;
}

// Função de cadastro de usuário
function cadastro(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadbarbeiro',
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


// Função para renderizar os dados na tabela com logs
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
                title: 'Telefone',
                data: 'telefone',
                render: function (data) {
                    if (data.length === 10) {
                        return data.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
                    } else if (data.length === 11) {
                        return data.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
                    } else {
                        return data;
                    }
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
                                    <li><a class="dropdown-item text-danger" onclick="confirmUpdateSituacao(${row.id}, 2, '${row.idsituacao}', 'Inativar')">Inativar</a></li>
                                    <li><a class="dropdown-item text-success" onclick="confirmUpdateSituacao(${row.id}, 1, '${row.idsituacao}', 'Ativar')">Ativar</a></li>
                                </ul>
                            </div>`;
                }
            }
        ]
    });
};

    // Função para confirmar a alteração de status
    function confirmUpdateSituacao(id, idsituacao, atualsituacao, acao) {
    if (idsituacao == atualsituacao) {
        Swal.fire({ icon: "warning", title: "Atenção!", text: `Barbeiro já está ${atualsituacao === 2 ? 'Inativo' : 'Ativo'}` });
        return;
    }
    Swal.fire({
        title: 'Confirmação',
        text: `Você tem certeza que deseja ${acao.toLowerCase()} o Barbeiro ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            updateSituacao(id, idsituacao);
        }
    });
    }

    // Função para atualizar o status do usuário
    function updateSituacao(id, idsituacao) {
        app.callController({
            method: 'POST',
            url: base + '/updateSituacaoBarbeiro',
            params: { id, idsituacao },
            onSuccess() {
                listar();
            },
            onFailure() {
                Swal.fire({ icon: "error", title: "Atenção!!", text: "Erro ao atualizar situação!" });
            }
        });
    }

    // Função de edição de usuário
    function editar(dados) {
        console.log('chegou aqui');
        app.callController({
            method: 'POST',
            url: base + '/editarbarbeiro',
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
                    title: "Atenção!!",
                    text: "Erro ao editar usuário!"
                });
            }
        });
    }

    // Função de edição do usuário
    function setEditar(row) {
        $('#form-title').text('Editando Barbeiro').css('color', 'blue');
        $('#id').val(row.id);
        $('#nome').val(row.nome);
        $('#telefone').val(row.telefone);
        $('html, body').animate({ scrollTop: $(".form-container").offset().top }, 100);
    }

    function limparForm() {
        $('#form-title').text('Cadastrando Barbeiro').css('color', 'black'); // Corrige o título e cor padrão
        $('#nome').val(''); // Limpa o campo de nome
        $('#telefone').val(''); // Limpa o campo de telefone
        $('#id').val(''); // Limpa o ID oculto
    }

