$(document).ready(function () {
    listar();  // Carregar a lista de barbeiros
    console.log("Iniciando script de Barbeiros");

    $('#telefone').mask('(00) 00000-0000', { placeholder: '(  ) _____-____' });

    $('#cadastro').on('click', function () {
        const idbarbeiro = $('#idbarbeiro').val();
        let dados = {
            nome: $('#nome').val(),
            telefone: $('#telefone').val().replace(/[^\d]/g, '') // Removendo a máscara antes de enviar
        };
        
        console.log("Dados coletados para cadastro/edição:", dados);
        
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
            console.log("Editando barbeiro com ID:", idbarbeiro);
            editar(dados, idbarbeiro);
        } else {
            console.log("Cadastrando novo barbeiro");
            cadastro(dados);
        }
    });
});

function listar() {
    console.log("Chamando API para listar barbeiros");
    app.callController({
        method: 'GET',
        url: base + '/getbarbeiros',
        params: null,
        onSuccess(res) {
            console.log("Dados recebidos da API:", res);
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

// Função para renderizar os dados na tabela com logs
const Table = function (dados) {
    console.log("Renderizando tabela com os dados:", dados);
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
                    console.log("Renderizando nome:", data);
                    return `<strong>${data}</strong>`;
                }
            },
            {
                title: 'Telefone',
                data: 'telefone',
                render: function (data) {
                    console.log("Renderizando telefone:", data);
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
                    console.log("Renderizando status:", data);
                    return `<span class="${statusClass}">${data}</span>`;
                }
            },
            {
                title: 'Ações',
                data: null,
                render: function (data, type, row) {
                    const rowData = JSON.stringify(row).replace(/"/g, '&quot;');
                    console.log("Renderizando ações para o barbeiro:", row.nome);
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
