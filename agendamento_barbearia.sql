-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28/11/2024 às 20:45
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `agendamento_barbearia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `id` int(11) NOT NULL,
  `cliente` varchar(255) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `barbeiro_id` int(11) DEFAULT NULL,
  `servico_id` int(11) DEFAULT NULL,
  `datahora` datetime NOT NULL,
  `situacao` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamento`
--

INSERT INTO `agendamento` (`id`, `cliente`, `telefone`, `barbeiro_id`, `servico_id`, `datahora`, `situacao`) VALUES
(1, 'Marcos Manuel', '44999798433', 2, 1, '2024-11-29 17:00:00', 1),
(2, 'Lucas Silva Marcos', '44998765432', 1, 3, '2024-11-29 08:00:00', 1),
(3, 'Maria Oliveira', '44998876543', 2, 5, '2024-11-29 09:00:00', 1),
(4, 'João Santos', '44997654321', 3, 2, '2024-11-29 10:00:00', 1),
(5, 'Ana Costa', '44996543210', 1, 4, '2024-11-29 11:00:00', 1),
(6, 'Pedro Almeida', '44995432109', 2, 6, '2024-11-29 12:00:00', 1),
(7, 'Carla Rocha', '44994321098', 3, 1, '2024-11-29 13:00:00', 1),
(8, 'Felipe Lima', '44993210987', 1, 7, '2024-11-29 14:00:00', 1),
(9, 'Isabela Martins', '44992109876', 2, 3, '2024-11-29 15:00:00', 1),
(10, 'Rafael Gomes', '44991098765', 3, 2, '2024-11-29 16:00:00', 1),
(11, 'Beatriz Almeida', '44989987654', 1, 4, '2024-11-29 17:00:00', 1),
(12, 'Lucas Silva', '44998765432', 2, 5, '2024-11-30 08:00:00', 1),
(13, 'João Santos', '44997654321', 3, 1, '2024-11-30 09:00:00', 1),
(14, 'Ana Costa', '44996543210', 1, 6, '2024-11-30 10:00:00', 1),
(15, 'Pedro Almeida', '44995432109', 2, 2, '2024-11-30 11:00:00', 1),
(16, 'Carla Rocha', '44994321098', 3, 7, '2024-11-30 12:00:00', 1),
(17, 'Felipe Lima', '44993210987', 1, 3, '2024-11-30 13:00:00', 1),
(18, 'Isabela Martins', '44992109876', 2, 4, '2024-11-30 14:00:00', 1),
(19, 'Rafael Gomes', '44991098765', 3, 6, '2024-11-30 15:00:00', 1),
(20, 'Beatriz Almeida', '44989987654', 1, 2, '2024-11-30 16:00:00', 1),
(21, 'Lucas Silva', '44998765432', 2, 5, '2024-12-02 08:00:00', 1),
(22, 'João Santos', '44997654321', 3, 1, '2024-12-02 09:00:00', 1),
(23, 'Ana Costa', '44996543210', 1, 7, '2024-12-02 10:00:00', 1),
(24, 'Pedro Almeida', '44995432109', 2, 4, '2024-12-02 11:00:00', 1),
(25, 'Carla Rocha', '44994321098', 3, 3, '2024-12-02 12:00:00', 1),
(26, 'Felipe Lima', '44993210987', 1, 6, '2024-12-02 13:00:00', 1),
(27, 'Isabela Martins', '44992109876', 2, 2, '2024-12-02 14:00:00', 1),
(28, 'Rafael Gomes', '44991098765', 3, 5, '2024-12-02 15:00:00', 1),
(29, 'Beatriz Almeida', '44989987654', 1, 1, '2024-12-02 16:00:00', 1),
(30, 'Lucas Silva', '44998765432', 2, 7, '2024-12-03 08:00:00', 1),
(31, 'João Santos', '44997654321', 3, 6, '2024-12-03 09:00:00', 1),
(32, 'Ana Costa', '44996543210', 1, 4, '2024-12-03 10:00:00', 1),
(33, 'Pedro Almeida', '44995432109', 2, 5, '2024-12-03 11:00:00', 1),
(34, 'Carla Rocha', '44994321098', 3, 2, '2024-12-03 12:00:00', 1),
(35, 'Felipe Lima', '44993210987', 1, 3, '2024-12-03 13:00:00', 1),
(36, 'Isabela Martins', '44992109876', 2, 6, '2024-12-03 14:00:00', 1),
(37, 'Rafael Gomes', '44991098765', 3, 7, '2024-12-03 15:00:00', 1),
(38, 'Beatriz Almeida', '44989987654', 1, 1, '2024-12-03 16:00:00', 1),
(39, 'Lucas Silva', '44998765432', 2, 5, '2024-12-04 08:00:00', 1),
(40, 'João Santos', '44997654321', 3, 3, '2024-12-04 09:00:00', 1),
(41, 'Ana Costa', '44996543210', 1, 4, '2024-12-04 10:00:00', 1),
(42, 'Pedro Almeida', '44995432109', 2, 7, '2024-12-04 11:00:00', 1),
(43, 'Carla Rocha', '44994321098', 3, 2, '2024-12-04 12:00:00', 1),
(44, 'Felipe Lima', '44993210987', 1, 1, '2024-12-04 13:00:00', 1),
(45, 'Isabela Martins', '44992109876', 2, 6, '2024-12-04 14:00:00', 1),
(46, 'Rafael Gomes', '44991098765', 3, 4, '2024-12-04 15:00:00', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `barbeiro`
--

CREATE TABLE `barbeiro` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `idsituacao` int(11) DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `barbeiro`
--

INSERT INTO `barbeiro` (`id`, `nome`, `telefone`, `idsituacao`, `criado_em`) VALUES
(1, 'Marcos Silva', '44988778432', 1, '2024-11-28 18:49:12'),
(2, 'Marcio Vinicius', '44999892388', 1, '2024-11-28 18:49:33'),
(3, 'Bruno Alonso Silva', '44999832981', 1, '2024-11-28 18:49:48');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `valor_compra` decimal(10,2) NOT NULL,
  `valor_venda` decimal(10,2) NOT NULL,
  `idsituacao` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id`, `nome`, `valor_compra`, `valor_venda`, `idsituacao`) VALUES
(1, 'Máquina de Cortar Cabelo', 150.00, 250.00, 1),
(2, 'Capa de Chuva', 25.00, 50.00, 1),
(3, 'Escova de Cabelo', 15.00, 30.00, 1),
(4, 'Pente Profissional', 5.00, 15.00, 1),
(5, 'Tesoura de Cabeleireiro', 40.00, 80.00, 1),
(6, 'Creme de Barba', 12.00, 25.00, 1),
(7, 'Espelho de Aumento', 35.00, 60.00, 1),
(8, 'Toalha para Barbearia', 8.00, 18.00, 1),
(9, 'Pomada Modeladora', 20.00, 40.00, 1),
(10, 'Óleo Pós Barba', 18.00, 35.00, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `servico`
--

CREATE TABLE `servico` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `tempo_minutos` int(11) NOT NULL,
  `idsituacao` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servico`
--

INSERT INTO `servico` (`id`, `nome`, `valor`, `tempo_minutos`, `idsituacao`) VALUES
(1, 'Corte de Cabelo', 50.00, 30, 1),
(2, 'Barba Completa', 30.00, 25, 1),
(3, 'Sobrancelha', 15.00, 10, 1),
(4, 'Corte de Cabelo + Barba', 70.00, 45, 1),
(5, 'Penteado', 40.00, 25, 1),
(6, 'Hidratação Capilar', 25.00, 20, 1),
(7, 'Shampoo e Secagem', 20.00, 15, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` bigint(20) UNSIGNED NOT NULL,
  `nome` varchar(200) NOT NULL,
  `login` varchar(200) NOT NULL,
  `senha` varchar(300) NOT NULL,
  `idsituacao` int(11) NOT NULL COMMENT '1 - Ativo, 2 - Inativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nome`, `login`, `senha`, `idsituacao`) VALUES
(1, 'Leonardo Nehara', 'Leonardo.Nehara', 'b4d2459a8fc2c8d3210aff517588962c', 1),
(2, 'Admin', 'Admin', '0e7517141fb53f21ee439b355b5a1d0a', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barbeiro_id` (`barbeiro_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `barbeiro`
--
ALTER TABLE `barbeiro`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `servico`
--
ALTER TABLE `servico`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD UNIQUE KEY `idusuario` (`idusuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de tabela `barbeiro`
--
ALTER TABLE `barbeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `servico`
--
ALTER TABLE `servico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`barbeiro_id`) REFERENCES `barbeiro` (`id`),
  ADD CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
