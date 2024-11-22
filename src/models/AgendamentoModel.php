<?php

namespace src\models;

use \core\Model;
use core\Database;
use PDO;
use Throwable;

class AgendamentoModel extends Model
{
    // Cadastro de agendamento
    public function cadastro($cliente, $telefone, $barbeiro_id, $servico_id, $datahora)
    {
        try {
            $sql = Database::getInstance()->prepare("
                INSERT INTO agendamento (cliente, telefone, barbeiro_id, servico_id, datahora, situacao)
                VALUES (:cliente, :telefone, :barbeiro_id, :servico_id, :datahora, 1)
            ");
            $sql->bindValue(':cliente', $cliente);
            $sql->bindValue(':telefone', $telefone);
            $sql->bindValue(':barbeiro_id', $barbeiro_id);
            $sql->bindValue(':servico_id', $servico_id);
            $sql->bindValue(':datahora', $datahora);

            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Agendamento realizado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao realizar agendamento: ' . $error->getMessage()
            ];
        }
    }

    // Verificar se já existe agendamento no horário
    public function verificarDisponibilidade($barbeiro_id, $datahora)
    {
        try {
            $sql = Database::getInstance()->prepare("
                SELECT CASE WHEN EXISTS(SELECT 1 FROM agendamento WHERE barbeiro_id = :barbeiro_id AND datahora = :datahora AND situacao = 1) THEN 1 ELSE 0 END AS disponivel
            ");
            $sql->bindValue(':barbeiro_id', $barbeiro_id);
            $sql->bindValue(':datahora', $datahora);
            $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);

            return [
                'sucesso' => true,
                'result' => $result
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao verificar disponibilidade: ' . $error->getMessage()
            ];
        }
    }

    // Buscar agendamentos (opcional: por barbeiro, cliente, etc.)
    public function getAgendamentos($barbeiro_id = null, $cliente = null)
    {
        try {
            $sqlQuery = "SELECT a.id, a.cliente, a.telefone, b.nome AS barbeiro, s.nome AS servico, a.datahora, a.situacao
                         FROM agendamento a
                         INNER JOIN barbeiro b ON a.barbeiro_id = b.id
                         INNER JOIN servico s ON a.servico_id = s.id";
            
            if ($barbeiro_id) {
                $sqlQuery .= " WHERE a.barbeiro_id = :barbeiro_id";
            }
            if ($cliente) {
                $sqlQuery .= " WHERE a.cliente LIKE :cliente";
            }

            $sql = Database::getInstance()->prepare($sqlQuery);
            if ($barbeiro_id) {
                $sql->bindValue(':barbeiro_id', $barbeiro_id);
            }
            if ($cliente) {
                $sql->bindValue(':cliente', "%" . $cliente . "%");
            }

            $sql->execute();
            $result = $sql->fetchAll(PDO::FETCH_ASSOC);

            return [
                'sucesso' => true,
                'result' => $result
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao buscar agendamentos: ' . $error->getMessage()
            ];
        }
    }

    // Atualizar situação do agendamento (confirmar, cancelar)
    public function updateSituacao($id, $situacao)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE agendamento
                SET situacao = :situacao
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':situacao', $situacao); // 1 = Confirmado, 2 = Cancelado
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Situação do agendamento atualizada com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar situação do agendamento: ' . $error->getMessage()
            ];
        }
    }

    // Editar agendamento
    public function editar($id, $cliente, $telefone, $barbeiro_id, $servico_id, $datahora)
    {
        try {
            $sql = Database::getInstance()->prepare("
                UPDATE agendamento
                SET cliente = :cliente, telefone = :telefone, barbeiro_id = :barbeiro_id, servico_id = :servico_id, datahora = :datahora
                WHERE id = :id
            ");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':cliente', $cliente);
            $sql->bindValue(':telefone', $telefone);
            $sql->bindValue(':barbeiro_id', $barbeiro_id);
            $sql->bindValue(':servico_id', $servico_id);
            $sql->bindValue(':datahora', $datahora);
            $sql->execute();

            return [
                'sucesso' => true,
                'result' => 'Agendamento atualizado com sucesso!'
            ];
        } catch (Throwable $error) {
            return [
                'sucesso' => false,
                'result' => 'Falha ao atualizar agendamento: ' . $error->getMessage()
            ];
        }
    }
}
