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

    textarea#observacao {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 16px;
        box-sizing: border-box;
        resize: vertical;
        min-height: 100px;
    }
</style>

<main class='main-div' style="width:100%;">
    <div class="form-container">
        <div class="titulo-container">
            <h1><strong>Agendamento de Devolução</strong></h1>
            <div class="header-container">
                <h5>Informe os dados abaixo para continuar sua solicitação.</h5>
            </div>
        </div>
        <div style="margin-top: 50px;">
            <div class="row">
                <input id="idusuario" type="text" class="form-control" hidden>

                <!-- Data e Hora do Agendamento -->
                <div class="col-md-6 mb-3">
                    <label for="datahora" class="form-label">Data e Horário<span class="text-danger">*</span></label>
                    <input type="datetime-local" class="form-control" id="datahora" name="datahora" required>
                </div>

                <!-- Barbeiro -->
                <div class="col-md-6 mb-3">
                    <label for="barbeiro" class="form-label">Barbeiro<span class="text-danger">*</span></label>
                    <select class="form-select" id="barbeiro" name="barbeiro" required>
                        <option value="">Selecione o barbeiro</option>
                        <!-- As opções de barbeiros serão preenchidas dinamicamente -->
                    </select>
                </div>

                <!-- Serviço -->
                <div class="col-md-6 mb-3">
                    <label for="servico" class="form-label">Serviço<span class="text-danger">*</span></label>
                    <select class="form-select" id="servico" name="servico" required>
                        <option value="">Selecione o serviço</option>
                        <!-- As opções de serviços serão preenchidas dinamicamente -->
                    </select>
                </div>
            </div>
            <div class="form-footer">
                <button id="solicitar" class="btn-custom">Solicitar agendamento</button>
            </div>
        </div>
    </div>
</main>

</body>
<script src="<?= $base; ?>/js/agendamento.js"></script>
<script>
    const base = '<?= $base; ?>';
</script>
