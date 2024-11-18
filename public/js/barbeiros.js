$(document).ready(function () {
    listar();  // Carregar a lista de barbeiros
    
    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    $('#cadastro').on('click', function () {
        const idbarbeiro = $('#idbarbeiro').val();
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

        if (idbarbeiro) {
            editar(dados, idbarbeiro);
        } else {
            cadastro(dados);
        }
    });
});

function validarTelefone(telefone) {
    const telefoneLimpo = telefone.replace(/[^\d]/g, '');
    return telefoneLimpo.length === 11;
}

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',
        params: null,
        onSuccess(res) {
            Table(res.result);
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
                text: "Barbeiro cadastrado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao cadastrar barbeiro!"
            });
        }
    });
}

// Função para exibir os dados dos barbeiros na tabela
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
    $('#form-title').text('Editando Barbeiro').css('color', 'blue');
    $('#idbarbeiro').val(row.id);
    $('#nome').val(row.nome);
    $('#telefone').val(row.telefone);
    $('#telefone').mask('(00) 00000-0000');
    
    $('html, body').animate({
        scrollTop: $(".form-container").offset().top
    }, 100);
}

function editar(dados, id) {
    app.callController({
        method: 'POST',
        url: base + '/editarbarbeiro',
        params: { id: id, nome: dados.nome, telefone: dados.telefone },
        onSuccess() {
            listar();
            limparForm();
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Barbeiro editado com sucesso!"
            });
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao editar Barbeiro!"
            });
        }
    });
}

function limparForm() {
    $('#form-title').text('Cadastrando Barbeiros');
    $('#nome').val('');
    $('#telefone').val('');
    $('#idbarbeiro').val('');
}
