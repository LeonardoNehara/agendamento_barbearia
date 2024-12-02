<?php
if (!isset($_SESSION['token'])) {
    header("Location: " . $base . '/');
    exit();
}
?>
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

    <!-- DataTables e outros -->
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.2/css/buttons.bootstrap5.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <link href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.colVis.min.js"></script>

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

<body style="background-color: #EDF2F6;">
    <div class="sair-icon" style="display: flex; align-items: center;">
        <i class="fa-solid fa-user"></i>
        <span style="margin-left: 5px;"><?= $_SESSION['usuario'] ?></span>
        <div style="border-left: 1px solid #ccc; height: 20px; margin: 0 10px;"></div>

        <a href="<?= $base; ?>/deslogar" style="color: rgb(161, 161, 170); margin-left: 7px;">
            <i class="fas fa-sign-out-alt"></i>
        </a>
    </div>
    <header class="header">
        <div>
            <i class="fas fa-bars hamburger" style="font-size: 22px;"></i>
        </div>
    </header>
    <aside class="sidebar">
        <img src="<?= $base; ?>/img/logo_topo.png" class="img-fluid" alt="logo">
        <ul>
            <li class="<?= (basename($_SERVER['REQUEST_URI']) == 'inicio') ? 'active' : ''; ?>">
                <a class="negrito" href="<?= $base; ?>/inicio">
                    <i class="fa-solid fa-house" style="margin-right: 10px; font-size: 22px;"></i>Inicio
                </a>
            </li>

            <!-- Sempre mostrar "Usuários" para admins -->
            <li class="<?= (basename($_SERVER['REQUEST_URI']) == 'usuario') ? 'active' : ''; ?>">
                <a class="negrito" href="<?= $base; ?>/usuario">
                    <i class="fa-solid fa-users-gear" style="margin-right: 10px; font-size: 22px;"></i>Usuários
                </a>
            </li>

            <!-- Sempre mostrar "Barbeiros" para admins -->
            <li class="<?= (basename($_SERVER['REQUEST_URI']) == 'barbeiros') ? 'active' : ''; ?>">
                <a class="negrito" href="<?= $base; ?>/barbeiros">
                    <i class="fa-solid fa-cut" style="margin-right: 10px; font-size: 22px;"></i>Barbeiros
                </a>
            </li>

            <!-- Sempre mostrar "Produtos" para admins -->
            <li class="<?= (basename($_SERVER['REQUEST_URI']) == 'produtos') ? 'active' : ''; ?>">
                <a class="negrito" href="<?= $base; ?>/produtos">
                    <i class="fa-solid fa-box" style="margin-right: 10px; font-size: 22px;"></i>Produtos
                </a>
            </li>

            <!-- Adicionando "Serviços" abaixo de Produtos -->
            <li class="<?= (basename($_SERVER['REQUEST_URI']) == 'servicos') ? 'active' : ''; ?>">
                <a class="negrito" href="<?= $base; ?>/servicos">
                    <i class="fa-solid fa-cogs" style="margin-right: 10px; font-size: 22px;"></i>Serviços
                </a>
            </li>

            <!-- Agendamento e Listagem para admins e outros grupos -->
            <li class="<?= (basename($_SERVER['REQUEST_URI']) == 'agendamentos') ? 'active' : ''; ?>">
                <a class="negrito" href="<?= $base; ?>/agendamentos">
                    <i class="fa-solid fa-clipboard-list" style="margin-right: 10px; font-size: 22px;"></i>Agendar
                </a>
            </li>

        </ul>
    </aside>

    <script>
        $('.hamburger').on('click', function() {
            $('.sidebar').toggleClass('open');
            $('body').toggleClass('sidebar-open');
            $('.header').toggleClass('sidebar-open');
        });
    </script>
</body>

</html>
