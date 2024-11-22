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
            <!-- Filtro de barbeiro -->
            <div class="filtrar">
                <label for="barbeiroSelect">Filtrar por Barbeiro:</label>
                <select id="barbeiroSelect" onchange="filtrarPorBarbeiro()">
                    <!-- Opções serão carregadas dinamicamente -->
                </select>
            </div>
            
            <!-- Calendário -->
            <div id="calendar"></div>
        </div>
    </div>

</main>

<script src="<?= $base; ?>/js/inicio.js"></script>
<script>
    const base = '<?= $base; ?>';
</script>
