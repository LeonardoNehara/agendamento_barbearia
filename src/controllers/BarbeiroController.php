<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Barbeiro;

class BarbeiroController extends Controller {

    public function __construct(){
        // Verificando apenas o token na sessão (removendo o idgrupo da sessão)
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    // Página principal de cadastro
    public function index() {
        // Verifica se o token está presente na sessão, sem a necessidade de idgrupo
        if ($_SESSION['token']) {  // Usuário autenticado
            $this->render('barbeiro', ['base' => Config::BASE_DIR]);
        } else {
            // Caso contrário, renderiza a página de erro 404
            $this->render('404');
        }
    }

    // Buscar todos os barbeiros cadastrados
    public function getBarbeiros() {
        $cad = new Barbeiro();
        $ret = $cad->getBarbeiros();

        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret['result']]));
            die;
        }
    }

    // Cadastro de novo barbeiro
    public function cadastro() {
        $nome = $_POST["nome"];
        $telefone = $_POST["telefone"];

        $cad = new Barbeiro();
        
        // Verifica se o telefone já está cadastrado
        $existe = $cad->verificarTelefone($telefone);

        
        if ($existe['result'][0]['existeTelefone'] == 1) {
            echo json_encode(array(["success" => false,"ret" => $existe]));
            die;
        }

        // Realiza o cadastro
        $ret = $cad->cadastro($nome, $telefone);
        
        if ($ret['sucesso'] == true) {
            // Retorne diretamente o objeto JSON, sem envolver em um array adicional
            echo json_encode(array(["success" => true,"ret" => $ret]));
            die;
        } else {
            // Retorne diretamente o objeto JSON, sem envolver em um array adicional
            echo json_encode(array(["success" => false,"ret" => $ret]));
            die;
        }   
    }

    // Atualizar situação do barbeiro (Ativo/Inativo)
    public function updateSituacaoBarbeiro() {
        $id = $_GET['id'];
        $idsituacao = $_GET['idsituacao'];

        $cad = new Barbeiro();
        $ret = $cad->updateSituacao($id, $idsituacao);

        // Corrigir retorno da resposta para não envolver o resultado em um array extra
        if ($ret['sucesso'] == false) {
            echo json_encode(array([ "success" => false, "ret" => $ret['result'] ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "ret" => $ret['result'] ]));
            die;
        }
    }


    // Editar dados do barbeiro
    public function editar() {
        $id = $_GET['id'];
        $nome = $_GET['nome'];
        $telefone = $_GET['telefone'];

        $editar = new Barbeiro();
        $result = $editar->editar($id, $nome, $telefone);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }  
    }
}
