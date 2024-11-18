<?php
namespace src\controllers;

use src\models\AgendamentoModel;
use src\Config;

class AgendamentoController {

    private $agendamentoModel;

    public function __construct(){
        // Verifica apenas o token na sessão
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    // Método para exibir todos os agendamentos
    public function exibirAgendamentos() {
        $agendamentos = $this->agendamentoModel->obterAgendamentos();
        echo json_encode([
            "success" => true,
            "data" => $agendamentos
        ]);
        die();
    }

    // Método para criar um agendamento
    public function criarAgendamento() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_POST['datahora'], $_POST['barbeiro'], $_POST['servico'], $_POST['idusuario'])) {
                $datahora = $_POST['datahora'];
                $barbeiro_id = $_POST['barbeiro'];
                $servico_id = $_POST['servico'];
                $usuario_id = $_POST['idusuario'];

                $sucesso = $this->agendamentoModel->criarAgendamento($datahora, $barbeiro_id, $servico_id, $usuario_id);
                if ($sucesso) {
                    echo json_encode([
                        "success" => true,
                        "message" => "Agendamento criado com sucesso!"
                    ]);
                    exit();
                } else {
                    echo json_encode([
                        "success" => false,
                        "message" => "Erro ao criar agendamento."
                    ]);
                    exit();
                }
            }
        }
        include 'view/criarAgendamento.php'; // Exibe o formulário de criação de agendamento
    }

    // Método para atualizar um agendamento
    public function atualizarAgendamento() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
            if (isset($_POST['datahora'], $_POST['barbeiro'], $_POST['servico'])) {
                $id = $_GET['id'];
                $datahora = $_POST['datahora'];
                $barbeiro_id = $_POST['barbeiro'];
                $servico_id = $_POST['servico'];

                $sucesso = $this->agendamentoModel->atualizarAgendamento($id, $datahora, $barbeiro_id, $servico_id);
                if ($sucesso) {
                    echo json_encode([
                        "success" => true,
                        "message" => "Agendamento atualizado com sucesso!"
                    ]);
                    exit();
                } else {
                    echo json_encode([
                        "success" => false,
                        "message" => "Erro ao atualizar agendamento."
                    ]);
                    exit();
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
                echo json_encode([
                    "success" => true,
                    "message" => "Agendamento excluído com sucesso!"
                ]);
                exit();
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "Erro ao excluir agendamento."
                ]);
                exit();
            }
        }
    }
}
