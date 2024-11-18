<?php
namespace src\models;

use \core\Model;
use core\Database;
use PDO;
use Throwable;

class Produto extends Model
{
    public function cadastro($nome, $valorCompra, $valorVenda)
    {
        try {
            $sql = Database::getInstance()->prepare("
                INSERT INTO produto (nome, valor_compra, valor_venda, idsituacao)
                VALUES (:nome, :valor_compra, :valor_venda, 1)  -- 1 para ativo
            ");
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':valor_compra', $valorCompra);
            $sql->bindValue(':valor_venda', $valorVenda);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Produto cadastrado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao cadastrar produto: ' . $error->getMessage()
            ];
        }
    }

    public function verificarProduto($nome)
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT CASE WHEN EXISTS(SELECT 1 FROM produto WHERE nome = :nome) THEN 1 ELSE 0 END AS existeProduto
            ");
            $sql->bindValue(':nome', $nome);
            $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);

            return [
                'sucesso' => true,
                'result' => $result
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao verificar produto: ' . $error->getMessage()
            ];
        }
    }

    public function getProdutos()
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT
                    p.id, 
                    p.nome, 
                    p.valor_compra AS valorCompra, 
                    p.valor_venda AS valorVenda,
                    CASE WHEN p.idsituacao = 1 THEN 'Ativo' ELSE 'Inativo' END AS situacao
                FROM produto p
            ");
            $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);

            return [
                'sucesso' => true,
                'result' => $result
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao buscar produtos: ' . $error->getMessage()
            ];
        }
    }

    public function updateSituacao($id, $idsituacao)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE produto
                SET idsituacao = :idsituacao
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':idsituacao', $idsituacao);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Situação do produto atualizada com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar situação do produto: ' . $error->getMessage()
            ];
        }
    }

    public function editar($id, $nome, $valorCompra, $valorVenda)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE produto
                SET nome = :nome, valor_compra = :valor_compra, valor_venda = :valor_venda
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':valor_compra', $valorCompra);
            $sql->bindValue(':valor_venda', $valorVenda);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Produto atualizado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar produto: ' . $error->getMessage()
            ];
        }
    }
}
