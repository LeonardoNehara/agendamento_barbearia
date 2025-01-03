<?php

namespace src\models;

use \core\Model;
use core\Database;
use PDO;
use PDOException;
use Throwable;

class Login extends Model
{
    public function logar($dados)
    {       // and senha = ':senha'
        $sql = "select u.idusuario, u.nome, u.senha FROM usuarios u WHERE u.login = ':login' and u.idsituacao = 1 ";
        $sql= $this->switchParams($sql, $dados);
        try {
            $sql = Database::getInstance()->prepare($sql);
            $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);
            return [
                'sucesso' => true,
                'result' => $result
            ];

        } catch (Throwable $error) {
            return  [
                'sucesso' => false,
                'result' => 'Falha ao Logar: ' . $error->getMessage()         
            ] ;
        }
    }
}
