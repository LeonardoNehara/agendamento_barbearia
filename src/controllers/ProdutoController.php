<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Produto;

class ProdutoController extends Controller {

    public function __construct(){
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        if ($_SESSION['token']) {
            $this->render('produtos', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }

    public function getProdutos() {
        $cad = new Produto();
        $ret = $cad->getProdutos();

        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret['result']]));
            die;
        }
    }

    public function cadastro() {
        $nome = $_POST["nome"];
        $valorCompra = $_POST["valorCompra"];
        $valorVenda = $_POST["valorVenda"];

        $cad = new Produto();
        
        $existe = $cad->verificarProduto($nome);
        
        if ($existe['result']['existeProduto'] == 1) {
            echo json_encode(array(["success" => false,"ret" => $existe]));
            die;
        }

        $ret = $cad->cadastro($nome, $valorCompra, $valorVenda);
        
        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret]));
            die;
        }   
    }

    public function updateSituacaoProduto() {
        $id = $_POST['id'];
        $idsituacao = $_POST['situacao'];

        $cad = new Produto();
        $ret = $cad->updateSituacao($id, $idsituacao);

        if ($ret['sucesso'] == false) {
            echo json_encode(array(["success" => false, "ret" => $ret['result'] ]));
            die;
        } else {
            echo json_encode(array(["success" => true, "ret" => $ret['result'] ]));
            die;
        }
    }

    public function editar() {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $valorCompra = $_POST['valorCompra'];
        $valorVenda = $_POST['valorVenda'];

        $editar = new Produto();
        $result = $editar->editar($id, $nome, $valorCompra, $valorVenda);

        if (!$result['sucesso']) {
            echo json_encode(array(["success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array(["success" => true, "result" => $result ]));
            die;
        }  
    }
}
