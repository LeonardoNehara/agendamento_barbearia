<?php $render('header'); ?>

<style>
    .form-container {
        max-width: 80%;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 100px;
    }

    .filtrar {
        max-width: 80%;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 30px;
    }

    h5 {
        margin: 0;
    }

    .form-cad {
        margin-left: 100px;
    }

    .calendario {
        margin: 40px 10px;
        padding: 0;
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
    }

    #calendar {
        max-width: 1100px;
        margin: 0 auto;
    }
    
    .barbeiroSelect{
        padding: 5px;
    }
    

    @media (max-width: 600px) {
        .form-cad {
            font-size: 0.90rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.90rem;
            margin-left: 10px;
        }
    }
</style>

<main class='main-div' style="width:100%;">
    <div class="calendario">
        <div class="form-container">
            <div class="filtrar">
                <label class="barbeiroSelect" for="barbeiroSelect">Filtrar por Barbeiro:</label>
                <select class="form-select form-select-lg mb-3" id="barbeiroSelect" onchange="filtrarPorBarbeiro()">
                </select>
            </div>

            <div id="calendar"></div>

            <div class="modal fade" id="visualizarAgendamentoModal" tabindex="-1" aria-labelledby="visualizarAgendamentoModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="visualizarAgendamentoModalLabel">Visualizar Agendamento</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="visualisarEvento">
                                <dl class="row">
                                    <dt class="col-sm-3">Cliente: </dt>
                                    <dd class="col-sm-9" id="visualizarAgendamento_cliente"></dd>

                                    <dt class="col-sm-3">Serviço: </dt>
                                    <dd class="col-sm-9" id="visualizarAgendamento_servico"></dd>

                                    <dt class="col-sm-3">Barbeiro: </dt>
                                    <dd class="col-sm-9" id="visualizarAgendamento_barbeiro"></dd>

                                    <dt class="col-sm-3">Telefone: </dt>
                                    <dd class="col-sm-9" id="visualizarAgendamento_telefone"></dd>

                                    <dt class="col-sm-3">Data e Hora: </dt>
                                    <dd class="col-sm-9" id="visualizarAgendamento_datahora"></dd>
                                </dl>

                                <button class="btn btn-success" id="btnViewEditEvento">Editar</button>
                            </div>

                            <div class="editarEvento" style="display: none;">
                                <form id="formEditarAgendamento">
                                    <div class="modal-body">
                                        <input type="hidden" id="editar_id" name="editar_id">
                                        <div class="mb-3">
                                            <label for="editar_nome_completo" class="form-label">Nome Completo</label>
                                            <input type="text" class="form-control" id="editar_nome_completo" name="editar_nome_completo" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editar_telefone" class="form-label">Telefone</label>
                                            <input type="text" class="form-control" id="editar_telefone" name="editar_telefone" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editar_barbeiro" class="form-label">Barbeiro</label>
                                            <select class="form-select" id="editar_barbeiro" name="editar_barbeiro" required></select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editar_servico" class="form-label">Serviço</label>
                                            <select class="form-select" id="editar_servico" name="editar_servico" required></select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editar_dataHora" class="form-label">Data e Hora</label>
                                            <input type="datetime-local" class="form-control" id="editar_dataHora" name="editar_dataHora" required>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" id="btnCancelarEdicao">Cancelar</button>
                                        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="cadastrarAgendamentoModal" tabindex="-1" aria-labelledby="cadastrarAgendamentoModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="cadastrarAgendamentoModalLabel">Cadastrar Agendamento</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form method="POST" id="formCadastroAgendamento">
                                <div class="mb-3">
                                    <label for="nome_completo" class="form-label">Cliente:</label>
                                    <input type="text" class="form-control" id="nome_completo" required>
                                </div>
                                <div class="mb-3">
                                    <label for="telefone" class="form-label">Telefone:</label>
                                    <input type="tel" class="form-control" id="telefone" required>
                                </div>
                                <div class="mb-3">
                                    <label for="servico" class="form-label">Serviço:</label>
                                    <select class="form-control" id="servico" required>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="barbeiroSelectModal" class="form-label">Barbeiro:</label>
                                    <select class="form-control" id="barbeiroSelectModal" required>
                                        <option value="">Selecione um barbeiro</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="dataHora" class="form-label">Data e Hora:</label>
                                    <input type="datetime-local" class="form-control" id="dataHora" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src='js/bootstrap5/index.global.min.js'></script>
<script src="<?= $base; ?>/js/inicio.js"></script>
<script>
    const base = '<?= $base; ?>';
</script>
