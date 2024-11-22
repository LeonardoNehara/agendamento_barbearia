<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\AgendamentoModel;

class AgendamentoController extends Controller {

    public function __construct() {
        // Verificando se o token está presente na sessão
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    // Página principal de agendamento
    public function index() {
        // Verifica se o token está presente na sessão, sem a necessidade de idgrupo
        if ($_SESSION['token']) {  // Usuário autenticado
            $this->render('agendamento', ['base' => Config::BASE_DIR]);
        } else {
            // Caso contrário, renderiza a página de erro 404
            $this->render('404');
        }
    }

    // Buscar todos os agendamentos
    public function getAgendamentos() {
        $agendamento = new AgendamentoModel();
        $ret = $agendamento->getAgendamentos();

        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true, "ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array(["success" => false, "ret" => $ret['result']]));
            die;
        }
    }

    // Cadastro de novo agendamento
    public function cadastro() {
        $cliente = $_POST["nome_completo"];
        $telefone = $_POST["telefone"];
        $datahora = $_POST["datahora"];
        $barbeiro_id = $_POST["barbeiro_id"];
        $servico_id = $_POST["servico_id"];

        $agendamento = new AgendamentoModel();

        // Realiza o cadastro de agendamento
        $ret = $agendamento->cadastro($cliente, $telefone, $barbeiro_id, $servico_id, $datahora);

        if ($ret['sucesso'] == true) {
            echo json_encode(array([ "success" => true, "ret" => $ret ]));
            die;
        } else {
            echo json_encode(array([ "success" => false, "ret" => $ret ]));
            die;
        }
    }

    // Atualizar situação do agendamento (Agendado, Cancelado)
    public function updateSituacaoAgendamento() {
        $id = $_POST['id'];
        $situacao = $_POST['situacao'];

        $agendamento = new AgendamentoModel();
        $ret = $agendamento->updateSituacao($id, $situacao);

        if ($ret['sucesso'] == false) {
            echo json_encode(array([ "success" => false, "ret" => $ret['result'] ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "ret" => $ret['result'] ]));
            die;
        }
    }

    // Editar dados do agendamento
    public function editar() {
        $id = $_POST['id'];
        $cliente = $_POST['cliente'];
        $telefone = $_POST['telefone'];
        $barbeiro_id = $_POST['barbeiro_id'];
        $servico_id = $_POST['servico_id'];
        $datahora = $_POST['datahora'];
        $situacao = $_POST['situacao'];

        $agendamento = new AgendamentoModel();
        $result = $agendamento->editar($id, $cliente, $telefone, $barbeiro_id, $servico_id, $datahora, $situacao);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }
    }
}
