$(document).ready(function () {
    listar(); 
    $('#cadastro').on('click', function () {
        
        const dados = {
            nome: $('#nome').val(),
            login: $('#login').val(),
            senha: $('#senha').val()
        };
        if (!app.validarCampos(dados)) {
            Swal.fire({
                icon: "warning",
                title: "Atenção!!",
                text: "Preencha todos os campos!"
            });
            return;
        }
        if (!validarNome(dados.nome)) {
            return;
        }
        if (!validarSenha(dados.senha)) {
            return;
        }
        if (!validarLogin(dados.login)) {
            return;
        }

        if ($('#idusuario').val()) {
            dados.idusuario = $('#idusuario').val();
            editar(dados);  
        } else {
            cadastro(dados); 
        }
    });
});


function validarLogin(login) {
    let mensagens = [];
    if (login.length < 3 || login.length > 20) mensagens.push("O login deve ter entre 3 e 20 caracteres.");
    if (!/^[a-zA-Z]/.test(login)) mensagens.push("O login deve começar com uma letra.");
    if (!/^[a-zA-Z0-9_.]+$/.test(login)) mensagens.push("O login deve conter apenas letras, números, ponto ou sublinhado.");
    if (/\s/.test(login)) mensagens.push("O login não pode conter espaços.");

    if (mensagens.length > 0) {
        Swal.fire({ icon: "warning", title: "Atenção!!", text: mensagens.join(" ") });
        return false;
    }
    return true;
}

function validarSenha(senha) {
    let mensagens = [];
    if (senha.length < 8) mensagens.push("A senha deve ter pelo menos 8 caracteres.");
    if (!/[A-Z]/.test(senha)) mensagens.push("A senha deve conter pelo menos uma letra maiúscula.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) mensagens.push("A senha deve conter pelo menos um caractere especial.");

    if (mensagens.length > 0) {
        Swal.fire({ icon: "warning", title: "Atenção!!", text: mensagens.join(" ") });
        return false;
    }
    return true;
}

function validarNome(nome) {
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nomeRegex.test(nome)) {
        Swal.fire({ icon: "warning", title: "Atenção!!", text: "O nome pode conter apenas letras e espaços." });
        return false;
    }
    return true;
}

function listar() {
    app.callController({
        method: 'GET',
        url: base + '/getusuarios',  
        params: null,
        onSuccess(res) {
            Table(res[0].ret);
        },
        onFailure() {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar usuários!"
            });
        }
    });
}

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
            { title: 'Nome', data: 'nome', render: (data) => `<strong>${data}</strong>` },
            { title: 'Login', data: 'login' },
            { title: 'Situação', data: 'descricao', render: (data) => `<span class="${data === 'Ativo' ? 'status-ativo' : 'status-inativo'}">${data}</span>` },
            {
                title: 'Ações',
                data: null,
                render: (data, type, row) => {
                    const rowData = JSON.stringify(row).replace(/"/g, '&quot;');
                    return `
                        <div class="dropdown" style="display: inline-block; cursor: pointer;">
                            <a class="text-secondary" id="actionsDropdown${row.idusuario}" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; cursor: pointer;">
                                <i class="fas fa-ellipsis-h"></i>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="actionsDropdown${row.idusuario}">
                                <li><a class="dropdown-item text-primary" onclick="setEditar(${rowData})">Editar</a></li>
                                <li><a class="dropdown-item text-danger" onclick="confirmUpdateSituacao(${row.idusuario}, 2, '${row.idsituacao}', 'Inativar')">Inativar</a></li>
                                <li><a class="dropdown-item text-success" onclick="confirmUpdateSituacao(${row.idusuario}, 1, '${row.idsituacao}', 'Ativar')">Ativar</a></li>
                            </ul>
                        </div>
                    `;
                }
            }
        ]
    });
};

function cadastro(dados) {
    app.callController({
        method: 'POST',
        url: base + '/cadusuario',
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

function setEditar(row) {
    $('#form-title').text('Editando Usuário').css('color', 'blue');
    $('#idusuario').val(row.idusuario);
    $('#nome').val(row.nome);
    $('#login').val(row.login);
    $('html, body').animate({ scrollTop: $(".form-container").offset().top }, 100);
}

function limparForm() {
    $('#form-title').text('Cadastrando Usuários');
    $('#idusuario').val('');
    $('#nome').val('');
    $('#login').val('');
    $('#senha').val('');
}

function editar(dados) {
    app.callController({
        method: 'POST',
        url: base + '/editarusuario',
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

function confirmUpdateSituacao(id, idsituacao, atualsituacao, acao) {
    if (idsituacao == atualsituacao) {
        Swal.fire({ icon: "warning", title: "Atenção!", text: `Usuário já está ${atualsituacao === 2 ? 'Inativo' : 'Ativo'}` });
        return;
    }
    Swal.fire({
        title: 'Confirmação',
        text: `Você tem certeza que deseja ${acao.toLowerCase()} o usuário?`,
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

function updateSituacao(id, idsituacao) {
    app.callController({
        method: 'POST',
        url: base + '/updatesituacaousuario',
        params: { idusuario: id, idsituacao },
        onSuccess() {
            listar();
        },
        onFailure() {
            Swal.fire({ icon: "error", title: "Atenção!!", text: "Erro ao atualizar situação!" });
        }
    });
}

function mostrarSenha(){
    let inputSenha = $('#senha')
    if (inputSenha.attr('type') === 'password') {
         inputSenha.attr('type', 'text');
     } else {
         inputSenha.attr('type', 'password');
     }
}
