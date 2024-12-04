<?php

namespace src\models;

use \core\Model;
use core\Database;
use PDO;
use Throwable;

class Usuario extends Model
{
    public function cadastro($dados)
    {
        // Removendo idgrupo e idfilial do SQL de inserção
        $sql = "insert into usuarios (nome, login, senha, idsituacao)
                select 
                     ':nome'
                    ,':login'
                    ,':senha'
                    ,1
                    ";

        $sql = $this->switchParams($sql, $dados);

        try {
            $sql = Database::getInstance()->prepare($sql);
            $sql->execute();
            return [
                'sucesso' => true,
                'result' => 'Usuário cadastrado com sucesso'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao cadastrar: ' . $error->getMessage()
            ];
        }
    }

    public function getusuarios()
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT u.idusuario, u.nome, u.login, u.senha, u.idsituacao,
                    CASE 
                        WHEN u.idsituacao = 1 THEN 'Ativo' 
                        ELSE 'Inativo' 
                    END AS descricao
                FROM usuarios u;
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
                'result' => 'Falha ao buscar usuários: ' . $error->getMessage()
            ];
        }
    }

    public function editar($dados)
    {
        $sql = "UPDATE usuarios 
                SET nome = ':nome', login = ':login', senha = ':senha'
                WHERE idusuario = :idusuario"; 

        $sql = $this->switchParams($sql, $dados);

        try {
            $sql = Database::getInstance()->prepare($sql);
            $sql->execute();
            return [
                'sucesso' => true,
                'result' => 'Usuário atualizado com sucesso'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar usuário: ' . $error->getMessage()
            ];
        }
    }

    public function updateSituacao($id, $idsituacao)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE usuarios
                SET idsituacao = :idsituacao
                WHERE idusuario = :idusuario;
            ");
            $idusuariointeger = intval($id);
            $idsituacaointeger = intval($idsituacao);
            $sql->bindParam(':idusuario', $idusuariointeger);
            $sql->bindParam(':idsituacao', $idsituacaointeger);
            $sql->execute();
            return [
                'sucesso' => true,
                'result' => 'Situação do usuário atualizada com sucesso'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar situação do usuário: ' . $error->getMessage()
            ];
        }
    }

}
