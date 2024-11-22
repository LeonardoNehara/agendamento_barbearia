<?php $render('header'); ?>

<style>
    /* Estilo para os containers de formulário */
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

    /* Container do cabeçalho */
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    h5 {
        margin: 0;
        font-weight: 500;
        color: #6c757d;
    }

    /* Botão de cadastro */
    .form-footer {
        text-align: center;
        margin-top: 20px;
    }

    .btn-custom {
        background-color: #007bff;
        border: none;
        color: white;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn-custom:hover {
        background-color: #0056b3;
    }

    /* Botão de limpar o filtro */
    .filter-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    }
    .filter-container .form-control {
        flex: 1;
        min-width: 150px;
    }


    /* Estilo dos campos de input */
    select, input[type="datetime-local"], input[type="text"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
    }

    /* Responsividade */
    @media (max-width: 600px) {
        .form-container {
            padding: 15px;
        }
    }
</style>

<main class='main-div' style="width:100%;">
    <div class="form-container">
        <div class="titulo-container">
            <h1><strong>Agendamento de Barbearia</strong></h1>
            <div class="header-container">
                <h5>Informe os dados abaixo para realizar o agendamento.</h5>
            </div>
        </div>
        <div style="margin-top: 50px;">
            <div class="row">
                <!-- Campo Cliente -->
                <div class="col-md-6 mb-3">
                    <label for="nome_completo" class="form-label">Nome Completo<span class="text-danger">*</span></label>
                    <input type="text" id="nome_completo" class="form-control" required>
                </div>

                <!-- Campo Telefone -->
                <div class="col-md-6 mb-3">
                    <label for="telefone" class="form-label">Telefone<span class="text-danger">*</span></label>
                    <input type="text" id="telefone" class="form-control" required>
                </div>

                <!-- Data e Hora do Agendamento -->
                <div class="col-md-6 mb-3">
                    <label for="datahora" class="form-label">Data e Hora<span class="text-danger">*</span></label>
                    <input type="datetime-local" class="form-control" id="datahora" name="datahora" required>
                </div>

                <!-- Barbeiro -->
                <div class="col-md-6 mb-3">
                    <label for="barbeiro_id" class="form-label">Barbeiro<span class="text-danger">*</span></label>
                    <select class="form-select" id="barbeiro_id" name="barbeiro_id" required>
                        <option value="">Selecione o Barbeiro</option>
                    </select>
                </div>

                <!-- Serviço -->
                <div class="col-md-6 mb-3">
                    <label for="servico_id" class="form-label">Serviço<span class="text-danger">*</span></label>
                    <select class="form-select" id="servico_id" name="servico_id" required>
                        <option value="">Selecione o Serviço</option>
                    </select>
                </div>
            </div>
            <div class="form-footer">
                <button id="cadastro" class="btn btn-primary">Solicitar Agendamento</button>
            </div>
        </div>  
    </div>
    <div class="form-container">
            <h1><strong>Gestão de Agendamentos</strong></h1>
            <br>
            <div class="filters">
                <label for="start_date">Data Inicial:</label>
                <input type="date" id="start_date" class="form-control" style="display: inline-block; width: auto;">

                <label for="end_date">Data Final:</label>
                <input type="date" id="end_date" class="form-control" style="display: inline-block; width: auto;">

                <label for="filter_barbeiro">Barbeiro:</label>
                <select id="filter_barbeiro" class="form-control" style="display: inline-block; width: auto;">
                    <option value="">Todos os Barbeiros</option>
                    <!-- As opções serão preenchidas dinamicamente -->
                </select>

                <button id="btnBuscar" class="btn btn-primary">Buscar</button>
                <button id="btnLimpar" class="btn btn-secondary">Limpar Filtros</button>
            </div>
            <br>
            <table id="mytable" class="table table-bordered display nowrap" style="width: 100%"></table>
    </div>
</main>
</body>
<script src="<?= $base; ?>/js/agendamento.js"></script>
<script>
    const base = '<?= $base; ?>';
</script>