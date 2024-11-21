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

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
    }

    h5 {
        margin: 0;
    }

    .form-footer {
        text-align: center;
        margin-top: 20px;
    }

    select, input[type="datetime-local"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
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
</main>

<script src="<?= $base; ?>/js/agendamento.js"></script>
<script>
    const base = '<?= $base; ?>';
</script>

</body>
</html>
