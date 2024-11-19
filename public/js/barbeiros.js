$(document).ready(function () {
    listar();  // Carregar a lista de barbeiros

    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    $('#cadastro').on('click', function () {
        const idbarbeiro = $('#idbarbeiro').val();
        let dados = {
            nome: $('#nome').val(),
            telefone: $('#telefone').val().replace(/[^\d]/g, '') // Removendo a máscara antes de enviar
        };
        
        // if (!app.validarCampos(dados)) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Atenção!!",
        //         text: "Preencha todos os campos!"
        //     });
        //     return;
        // }

        // if (!validarTelefone(dados.telefone)) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Atenção!!",
        //         text: "Telefone inválido! Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX."
        //     });
        //     return;
        // }

        if (idbarbeiro) {
            editar(dados, idbarbeiro);
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
    // Expressão regular para validar o formato de telefone brasileiro
    const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

    return regexTelefone.test(telefone);
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
                                    <li><a class="dropdown-item text-danger" onclick="confirmUpdateSituacao(${row.id}, 2, 'Inativar')">Inativar</a></li>
                                    <li><a class="dropdown-item text-success" onclick="confirmUpdateSituacao(${row.id}, 1, 'Ativar')">Ativar</a></li>
                                </ul>
                            </div>`;
                }
            }
        ]
    });
};
