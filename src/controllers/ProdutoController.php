<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Produto;

class ProdutoController extends Controller {

    public function __construct(){
        // Verifica apenas o token na sessão (sem a necessidade de idgrupo)
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    // Página principal de cadastro de produtos
    public function index() {
        if ($_SESSION['token']) {  // Usuário autenticado
            $this->render('produtos', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }

    // Buscar todos os produtos cadastrados
    public function getProdutos() {
        $cad = new Produto();
        $ret = $cad->getProdutos();

        if ($ret['sucesso'] == true) {
            echo json_encode([
                "success" => true,
                "ret" => $ret['result']
            ]);
            die;
        } else {
            echo json_encode([
                "success" => false,
                "ret" => $ret['result']
            ]);
            die;
        }
    }

    // Cadastro de novo produto
    public function cadastro() {
        $nome = $_POST["nome"];
        $valorCompra = $_POST["valorCompra"];
        $valorVenda = $_POST["valorVenda"];

        $cad = new Produto();
        
        // Verifica se o produto já está cadastrado pelo nome
        $existe = $cad->verificarProduto($nome);
        
        if ($existe['result'][0]['existeProduto'] == 1) {
            echo json_encode([
                "success" => false,
                "ret" => $existe
            ]);
            die;
        }

        // Realiza o cadastro
        $ret = $cad->cadastro($nome, $valorCompra, $valorVenda);
        
        if ($ret['sucesso'] == true) {
            echo json_encode([
                "success" => true,
                "ret" => $ret
            ]);
            die;
        } else {
            echo json_encode([
                "success" => false,
                "ret" => $ret
            ]);
            die;
        }   
    }

    // Atualizar situação do produto (Ativo/Inativo)
    public function updateSituacaoProduto() {
        $id = $_GET['id'];
        $idsituacao = $_GET['idsituacao'];

        $cad = new Produto();
        $ret = $cad->updateSituacao($id, $idsituacao);

        if ($ret['sucesso'] == false) {
            echo json_encode([ "success" => false, "ret" => $ret['result'] ]);
            die;
        } else {
            echo json_encode([ "success" => true, "ret" => $ret['result'] ]);
            die;
        }
    }

    // Editar dados do produto
    public function editar() {
        $id = $_GET['id'];
        $nome = $_GET['nome'];
        $valorCompra = $_GET['valorCompra'];
        $valorVenda = $_GET['valorVenda'];

        $editar = new Produto();
        $result = $editar->editar($id, $nome, $valorCompra, $valorVenda);

        if (!$result['sucesso']) {
            echo json_encode([ "success" => false, "result" => $result ]);
            die;
        } else {
            echo json_encode([ "success" => true, "result" => $result ]);
            die;
        }  
    }
}
