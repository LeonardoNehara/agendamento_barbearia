<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\AgendamentoModel;

class AgendamentoController extends Controller {

    public function __construct() {
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        if ($_SESSION['token']) {  
            $this->render('agendamento', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }

    public function getAgendamentos() {
        $barbeiro_id = isset($_GET['barbeiro']) ? $_GET['barbeiro'] : null;
        $agendamento = new AgendamentoModel();
        $ret = $agendamento->getAgendamentos($barbeiro_id);

        if ($ret['sucesso'] == true) {
            echo json_encode([["success" => true, "ret" => $ret['result']]]);
        } else {
            echo json_encode([["success" => false, "ret" => $ret['result']]]);
        }
        die;
    } 

    public function cadastro() {
        $cliente = $_POST["nome_completo"];
        $telefone = $_POST["telefone"];
        $datahora = $_POST["datahora"];
        $barbeiro_id = $_POST["barbeiro_id"];
        $servico_id = $_POST["servico_id"];
        $agendamento = new AgendamentoModel();
        
        // Converter a data e hora para o formato brasileiro (DD/MM/YYYY HH:MM)
        $date = new \DateTime($datahora);
        $datahoraFormatada = $date->format('d/m/Y H:i');
        
        // Buscar os dados do barbeiro e do serviço usando os IDs
        $barbeiroNome = $agendamento->getBarbeiroNome($barbeiro_id); // Método que recupera o nome do barbeiro
        $servicoNome = $agendamento->getServicoNome($servico_id); // Método que recupera o nome do serviço
    
        // Registrar agendamento no banco de dados
        $ret = $agendamento->cadastro($cliente, $telefone, $barbeiro_id, $servico_id, $datahora);
        
        if ($ret['sucesso'] == true) {
            // Criar mensagem para envio pelo WhatsApp
            $mensagem = "Olá $cliente, seu agendamento foi confirmado!\n" .
                        "Data e Hora: $datahoraFormatada\n" . // Usando a data formatada
                        "Barbeiro: $barbeiroNome\n" . // Usando o nome do barbeiro
                        "Serviço: $servicoNome.\n" . // Usando o nome do serviço
                        "Obrigado por escolher nossa barbearia!";
    
            // Enviar mensagem para o servidor Node.js
            $this->enviarWhatsApp($telefone, $mensagem);
        
            echo json_encode(array([ "success" => true, "ret" => $ret ]));
        } else {
            echo json_encode(array([ "success" => false, "ret" => $ret ]));
        }
        die;
    }

    public function getBarbeiroNome($barbeiro_id) {
        $agendamento = new AgendamentoModel();
        return $agendamento->getBarbeiroNome($barbeiro_id);
    }
    
    public function getServicoNome($servico_id) {
        $agendamento = new AgendamentoModel();
        return $agendamento->getServicoNome($servico_id);
    }
    
    
    
    private function enviarWhatsApp($telefone, $mensagem)
    {
        $url = 'http://localhost:3000/send-message'; // URL do servidor Node.js
        
        // Adicionar o código do país ao número do telefone e remover o primeiro "9" após o DDD
        $telefoneComCodigo = '55' . preg_replace('/\D/', '', $telefone); // Remove caracteres não numéricos
        $telefoneComCodigo = preg_replace('/(\d{2})(9)(\d{4})(\d{4})/', '$1$3$4', $telefoneComCodigo);
        
        $data = [
            'telefone' => $telefoneComCodigo,
            'mensagem' => $mensagem
        ];
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return $response;
    }

    

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

    public function editar() {
        $id = $_POST['id'];
        $cliente = $_POST['nome_completo'];
        $telefone = $_POST['telefone'];
        $barbeiro_id = $_POST['barbeiro_id'];
        $servico_id = $_POST['servico_id'];
        $datahora = $_POST['datahora'];

        $agendamento = new AgendamentoModel();
        $result = $agendamento->editar($id, $cliente, $telefone, $barbeiro_id, $servico_id, $datahora);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }
    }
    
}
