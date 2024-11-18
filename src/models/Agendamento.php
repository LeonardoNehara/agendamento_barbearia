<?php

class AgendamentoModel {
    private $conn;

    // Construtor: inicializa a conexão com o banco
    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar um novo agendamento
    public function criarAgendamento($datahora, $barbeiro_id, $servico_id, $usuario_id) {
        $query = "INSERT INTO agendamentos (datahora, barbeiro_id, servico_id, usuario_id) 
                  VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("siii", $datahora, $barbeiro_id, $servico_id, $usuario_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // Obter todos os agendamentos
    public function obterAgendamentos() {
        $query = "SELECT a.id, a.datahora, b.nome AS barbeiro, s.nome AS servico, u.nome AS usuario
                  FROM agendamentos a
                  JOIN barbeiro b ON a.barbeiro_id = b.id
                  JOIN servico s ON a.servico_id = s.id
                  JOIN usuarios u ON a.usuario_id = u.idusuario";
        
        $result = $this->conn->query($query);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Atualizar um agendamento
    public function atualizarAgendamento($id, $datahora, $barbeiro_id, $servico_id) {
        $query = "UPDATE agendamentos 
                  SET datahora = ?, barbeiro_id = ?, servico_id = ?, updated_at = CURRENT_TIMESTAMP
                  WHERE id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("siii", $datahora, $barbeiro_id, $servico_id, $id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // Excluir um agendamento
    public function excluirAgendamento($id) {
        $query = "DELETE FROM agendamentos WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // Buscar um agendamento específico
    public function obterAgendamentoPorId($id) {
        $query = "SELECT a.id, a.datahora, a.barbeiro_id, a.servico_id, a.usuario_id
                  FROM agendamentos a
                  WHERE a.id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
}

?>
