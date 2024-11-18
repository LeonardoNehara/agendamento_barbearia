<?php

namespace src\models;
use src\Config;

class AgendamentoModel {
    private $conn;

    public function __construct(){
        // Verifica apenas o token na sessão
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    // Criar um novo agendamento
    public function criarAgendamento($datahora, $barbeiro_id, $servico_id, $usuario_id) {
        // Prepara a query para inserir o agendamento
        $query = "INSERT INTO agendamentos (datahora, barbeiro_id, servico_id, usuario_id) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);

        // Associa os parâmetros à query
        $stmt->bind_param("siii", $datahora, $barbeiro_id, $servico_id, $usuario_id);

        // Executa a query e retorna o resultado
        return $stmt->execute();
    }

    // Obter todos os agendamentos
    public function obterAgendamentos() {
        // Query para buscar todos os agendamentos com as informações completas
        $query = "SELECT a.id, a.datahora, b.nome AS barbeiro, s.nome AS servico, u.nome AS usuario
                  FROM agendamentos a
                  JOIN barbeiro b ON a.barbeiro_id = b.id
                  JOIN servico s ON a.servico_id = s.id
                  JOIN usuarios u ON a.usuario_id = u.idusuario";

        // Executa a consulta
        $result = $this->conn->query($query);

        // Retorna todos os agendamentos como array associativo
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Atualizar um agendamento
    public function atualizarAgendamento($id, $datahora, $barbeiro_id, $servico_id) {
        // Query para atualizar o agendamento
        $query = "UPDATE agendamentos 
                  SET datahora = ?, barbeiro_id = ?, servico_id = ?, updated_at = CURRENT_TIMESTAMP
                  WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("siii", $datahora, $barbeiro_id, $servico_id, $id);

        // Retorna o resultado da execução da query
        return $stmt->execute();
    }

    // Excluir um agendamento
    public function excluirAgendamento($id) {
        // Query para excluir o agendamento
        $query = "DELETE FROM agendamentos WHERE id = ?";

        // Prepara a execução da query
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);

        // Retorna o resultado da execução
        return $stmt->execute();
    }

    // Buscar um agendamento específico
    public function obterAgendamentoPorId($id) {
        // Query para buscar um agendamento específico
        $query = "SELECT a.id, a.datahora, a.barbeiro_id, a.servico_id, a.usuario_id
                  FROM agendamentos a
                  WHERE a.id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Retorna o agendamento encontrado como array associativo
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
}
