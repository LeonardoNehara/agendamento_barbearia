
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área Administrativa</title>

    <!-- Scripts e Links de Bibliotecas -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/index.global.min.js"></script>
    <script src="js/core/locales-all.global.min.js"></script>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>

    <!-- Arquivos CSS personalizados -->
    <link rel="stylesheet" href="<?= $base; ?>/css/header/botoes.css">
    <link rel="stylesheet" href="<?= $base; ?>/css/header/header.css">
    <link rel="stylesheet" href="<?= $base; ?>/css/header/body.css">
    <link rel="stylesheet" href="<?= $base; ?>/css/tabela/tabela-responsive.css">
    
    <!-- MaskPlugin -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <!-- Font -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <!-- inputmask -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.7/jquery.inputmask.min.js"></script>
</head>

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
        margin-bottom: 20px;
    }

    h5 {
        margin: 0;
        font-weight: 500;
        color: #6c757d;
    }

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

    select, input[type="datetime-local"], input[type="text"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
    }

    .form-container h1 {
        text-align: center;
    }

    #mytable_filter{
        margin-left: 100px;
    }

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
                <input id="id" type="text" class="form-control" hidden>

                <div class="col-md-6 mb-3">
                    <label for="nome_completo" class="form-label">Nome Completo<span class="text-danger">*</span></label>
                    <input type="text" id="nome_completo" class="form-control" required>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="telefone" class="form-label">Telefone<span class="text-danger">*</span></label>
                    <input type="text" id="telefone" class="form-control" required>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="datahora" class="form-label">Data e Hora<span class="text-danger">*</span></label>
                    <input type="datetime-local" class="form-control" id="datahora" name="datahora" required>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="barbeiro_id" class="form-label">Barbeiro<span class="text-danger">*</span></label>
                    <select class="form-select" id="barbeiro_id" name="barbeiro_id" required>
                        <option value="">Selecione o Barbeiro</option>
                    </select>
                </div>

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
</body>
<script src="<?= $base; ?>/js/agendamento.js"></script>
<script>
    const base = '<?= $base; ?>';
</script>