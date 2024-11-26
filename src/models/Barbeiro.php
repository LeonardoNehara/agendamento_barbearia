<?php

namespace src\models;
use \core\Model;
use core\Database;
use PDO;
use Throwable;

class Barbeiro extends Model
{
    public function cadastro($nome, $telefone)
    {
        try {
            $sql = Database::getInstance()->prepare("
                INSERT INTO barbeiro (nome, telefone, idsituacao)
                VALUES (:nome, :telefone, 1)
            ");
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':telefone', $telefone);


            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Barbeiro cadastrado com sucesso!'
            ];
        } catch (Throwable $error) {
            return  [
                'sucesso' => false,
                'result' => 'Falha ao cadastrar barbeiro: ' . $error->getMessage()
            ];
        }
    }

    public function verificarTelefone($telefone)
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT CASE WHEN EXISTS(SELECT 1 FROM barbeiro WHERE telefone = :telefone) THEN 1 ELSE 0 END AS existeTelefone
            ");
            $sql->bindValue(':telefone', $telefone);
            $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);

            return [
                'sucesso' => true,
                'result' => $result
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao verificar telefone: ' . $error->getMessage()
            ];
        }
    }

    public function getBarbeiros()
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT
                    b.id, 
                    b.nome, 
                    b.telefone,
                    CASE WHEN b.idsituacao = 1 THEN 'Ativo' ELSE 'Inativo' END AS situacao
                FROM barbeiro b
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
                'result' => 'Falha ao buscar barbeiros: ' . $error->getMessage()
            ];
        }
    }

    public function getBarbeirosAtivos()
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT
                    b.id, 
                    b.nome, 
                    b.telefone,
                    'Ativo' AS situacao
                FROM barbeiro b
                WHERE b.idsituacao = 1
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
                'result' => 'Falha ao buscar barbeiros ativos: ' . $error->getMessage()
            ];
        }
    }

    

    public function updateSituacao($id, $idsituacao)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE barbeiro
                SET idsituacao = :idsituacao
                WHERE id = :id
            ");
            $idusuariointeger = intval($id);
            $idsituacaointeger = intval($idsituacao);
            $sql->bindValue(':id', $idusuariointeger);
            $sql->bindValue(':idsituacao', $idsituacaointeger);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Situação do barbeiro atualizada com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar situação do barbeiro: ' . $error->getMessage()
            ];
        }
    }

    public function editar($id, $nome, $telefone)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE barbeiro
                SET nome = :nome, telefone = :telefone
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':telefone', $telefone);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Barbeiro atualizado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar barbeiro: ' . $error->getMessage()
            ];
        }
    }
}
