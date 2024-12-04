<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\AgendamentoModel;

class AgendamentoControllerClient extends Controller {

    public function index() {
            $this->render('agendamentoClient', ['base' => Config::BASE_DIR]);
    }

    public function cadastro() {
        $cliente = $_POST["nome_completo"];
        $telefone = $_POST["telefone"];
        $datahora = $_POST["datahora"];
        $barbeiro_id = $_POST["barbeiro_id"];
        $servico_id = $_POST["servico_id"];
        $agendamento = new AgendamentoModel();

        $ret = $agendamento->cadastro($cliente, $telefone, $barbeiro_id, $servico_id, $datahora);

        if ($ret['sucesso'] == true) {
            echo json_encode(array([ "success" => true, "ret" => $ret ]));
            die;
        } else {
            echo json_encode(array([ "success" => false, "ret" => $ret ]));
            die;
        }
    }

}
