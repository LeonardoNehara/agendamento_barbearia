<?php
namespace src\controllers;

use AgendamentoModel as GlobalAgendamentoModel;
use src\models\AgendamentoModel;  // Corrigido para o namespace correto
use src\Config;  // Certifique-se de que o Config está no namespace correto

class AgendamentoController {

    private $agendamentoModel;

    // Construtor recebe a conexão com o banco de dados
    public function __construct($db) {
        $this->agendamentoModel = new GlobalAgendamentoModel($db); // Instancia o modelo com a conexão
    }

    // Método para exibir todos os agendamentos
    public function exibirAgendamentos() {
        $agendamentos = $this->agendamentoModel->obterAgendamentos();
        include 'view/agendamentos.php'; // Inclui a view para exibir os agendamentos
    }

    // Método para criar um agendamento
    public function criarAgendamento() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_POST['datahora']) && isset($_POST['barbeiro']) && isset($_POST['servico']) && isset($_POST['idusuario'])) {
                $datahora = $_POST['datahora'];
                $barbeiro_id = $_POST['barbeiro'];
                $servico_id = $_POST['servico'];
                $usuario_id = $_POST['idusuario'];

                $sucesso = $this->agendamentoModel->criarAgendamento($datahora, $barbeiro_id, $servico_id, $usuario_id);
                if ($sucesso) {
                    echo "Agendamento criado com sucesso!";
                    header("Location: index.php");
                    exit();
                } else {
                    echo "Erro ao criar agendamento.";
                }
            }
        }
        include 'view/criarAgendamento.php'; // Exibe o formulário de criação de agendamento
    }

    // Método para atualizar um agendamento
    public function atualizarAgendamento() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
            if (isset($_POST['datahora']) && isset($_POST['barbeiro']) && isset($_POST['servico'])) {
                $id = $_GET['id'];
                $datahora = $_POST['datahora'];
                $barbeiro_id = $_POST['barbeiro'];
                $servico_id = $_POST['servico'];

                $sucesso = $this->agendamentoModel->atualizarAgendamento($id, $datahora, $barbeiro_id, $servico_id);
                if ($sucesso) {
                    echo "Agendamento atualizado com sucesso!";
                    header("Location: index.php");
                    exit();
                } else {
                    echo "Erro ao atualizar agendamento.";
                }
            }
        }

        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $agendamento = $this->agendamentoModel->obterAgendamentoPorId($id);
            include 'view/editarAgendamento.php'; // Exibe o formulário de edição de agendamento
        }
    }

    // Método para excluir um agendamento
    public function excluirAgendamento() {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sucesso = $this->agendamentoModel->excluirAgendamento($id);

            if ($sucesso) {
                echo "Agendamento excluído com sucesso!";
                header("Location: index.php");
                exit();
            } else {
                echo "Erro ao excluir agendamento.";
            }
        }
    }
}
