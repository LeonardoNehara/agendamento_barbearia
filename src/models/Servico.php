<?php
namespace src\models;

use \core\Model;
use core\Database;
use PDO;
use Throwable;

class Servico extends Model
{
    public function cadastro($nome, $valor, $tempoMinutos)
    {
        try {
            $sql = Database::getInstance()->prepare("
                INSERT INTO servico (nome, valor, tempo_minutos, idsituacao)
                VALUES (:nome, :valor, :tempo_minutos, 1)
            ");
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':valor', $valor);
            $sql->bindValue(':tempo_minutos', $tempoMinutos);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Serviço cadastrado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao cadastrar serviço: ' . $error->getMessage()
            ];
        }
    }

    public function verificarServico($nome)
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT CASE WHEN EXISTS(SELECT 1 FROM servico WHERE nome = :nome) THEN 1 ELSE 0 END AS existeServico
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
                'result' => 'Falha ao verificar serviço: ' . $error->getMessage()
            ];
        }
    }

    public function getServicos()
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT
                    s.id, 
                    s.nome, 
                    s.valor, 
                    s.tempo_minutos AS tempoMinutos,
                    CASE WHEN s.idsituacao = 1 THEN 'Ativo' ELSE 'Inativo' END AS situacao
                FROM servico s
            ");
            $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);

            return [
                'sucesso' => true,
                'result' => $result
            ];
        } catch (Throwable $error) {
            var_dump($error); // Ver erro completo
            return [
                'sucesso' => false,
                'result' => 'Falha ao buscar serviços: ' . $error->getMessage()
            ];
        }
    }

    public function getServicosAtivos()
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT
                    s.id, 
                    s.nome, 
                    s.valor, 
                    s.tempo_minutos AS tempoMinutos,
                    'Ativo' AS situacao
                FROM servico s
                WHERE s.idsituacao = 1
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
                'result' => 'Falha ao buscar serviços ativos: ' . $error->getMessage()
            ];
        }
    }


    public function updateSituacao($id, $idsituacao)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE servico
                SET idsituacao = :idsituacao
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':idsituacao', $idsituacao);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Situação do serviço atualizada com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar situação do serviço: ' . $error->getMessage()
            ];
        }
    }

    public function editar($id, $nome, $valor, $tempoMinutos)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE servico
                SET nome = :nome, valor = :valor, tempo_minutos = :tempo_minutos
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':nome', $nome);
            $sql->bindValue(':valor', $valor);
            $sql->bindValue(':tempo_minutos', $tempoMinutos);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Serviço atualizado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar serviço: ' . $error->getMessage()
            ];
        }
    }
}
