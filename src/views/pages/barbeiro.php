<?php $render('header'); ?>

<style>
    /* Seu estilo aqui */
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

    .form-header {
        margin-bottom: 0;
        float: right;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .form-header small {
        font-weight: 500;
        color: #6c757d;
    }

    .form-cad {
        margin-left: 100px;
    }

    /* Responsividade */
    @media (max-width: 395px) {
        .form-cad {
            font-size: 0.90rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.90rem;
            margin-left: 10px;
        }
    }

    @media (max-width: 412px) {
        .form-cad {
            font-size: 0.90rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.90rem;
            margin-left: 10px;
        }
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

    @media (max-width: 900px) {
        .form-cad {
            font-size: 0.99rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.99rem;
            margin-left: 10px;
        }
    }
</style>

<main class="main-div" style="width: 100%;">
    <div class="form-container">
        <div class="header-container">
            <button id="novo" class="btn-custom" onclick="limparForm()">Novo</button>
            <h5 id="form-title" class="form-cad">Cadastrando Barbeiro</h5>
            <h5 class="media-h5">Informações Básicas</h5>
        </div>

        <div style="margin-top: 50px;">
            <div class="row">
                <input id="idfilial" type="text" class="form-control" hidden>

                <div class="col-md-6 mb-3">
                    <label for="nome" class="form-label">Nome<span class="text-danger">*</span></label>
                    <input id="nome" type="text" class="form-control" placeholder="Nome do Barbeiro">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="telefone" class="form-label">Telefone<span class="text-danger">*</span></label>
                    <input id="telefone" type="text" class="form-control" placeholder="Telefone">
                </div>
            </div>

            <div class="form-footer">
                <button id="cadastro" class="btn-custom">Gravar</button>
            </div>
        </div>
    </div>

    <div class="form-container">
        <h1><strong>Barbeiros</strong></h1>
        Gestão de barbeiros
        <table id="mytable" class="table table-bordered display nowrap" style="width: 100%"></table>
    </div>
</main>

</body>
<script src="<?= $base; ?>/js/barbeiros.js"></script>
<!-- Bootstrap JS -->
<script>
    const base = '<?= $base; ?>';
</script>
