-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/11/2024 às 18:18
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
(1, 'José Santos', '988123456', 1, 1, '2024-11-23 10:00:00', 1),
(2, 'Maria Oliveira', '999234567', 2, 2, '2024-11-23 11:00:00', 1),
(3, 'Lucas Almeida', '977345678', 3, 3, '2024-11-23 12:00:00', 1),
(4, 'Fernanda Costa', '966456789', 4, 4, '2024-11-23 13:00:00', 1),
(5, 'Carlos Pereira', '955567890', 5, 5, '2024-11-23 14:00:00', 1),
(6, 'Ricardo Lima', '944678901', 6, 6, '2024-11-23 15:00:00', 1),
(7, 'Juliana Martins', '933789012', 7, 7, '2024-11-23 16:00:00', 1),
(8, 'Bruna Rocha', '922890123', 8, 8, '2024-11-23 17:00:00', 1),
(9, 'Thiago Souza', '911901234', 9, 9, '2024-11-23 18:00:00', 1),
(10, 'Carla Pereira', '900012345', 10, 10, '2024-11-23 19:00:00', 1),
(11, 'Ricardo Costa', '988123457', 11, 11, '2024-11-24 10:00:00', 1),
(12, 'Eduardo Rocha', '977234568', 12, 12, '2024-11-24 11:00:00', 1),
(13, 'Gustavo Oliveira', '966345679', 13, 13, '2024-11-24 12:00:00', 1),
(14, 'Patricia Lima', '955456780', 14, 14, '2024-11-24 13:00:00', 1),
(15, 'Tatiane Silva', '944567891', 15, 15, '2024-11-24 14:00:00', 1);

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
(1, 'João Silva', '999999999', 1, '2024-11-22 17:14:46'),
(2, 'Carlos Pereira', '988888888', 1, '2024-11-22 17:14:46'),
(3, 'Ana Souza', '977777777', 1, '2024-11-22 17:14:46'),
(4, 'Luciano Santos', '966666666', 1, '2024-11-22 17:14:46'),
(5, 'Marcos Oliveira', '955555555', 1, '2024-11-22 17:14:46'),
(6, 'Ricardo Costa', '944444444', 1, '2024-11-22 17:14:46'),
(7, 'Paula Lima', '933333333', 1, '2024-11-22 17:14:46'),
(8, 'Eduardo Rocha', '922222222', 1, '2024-11-22 17:14:46'),
(9, 'Renata Alves', '911111111', 1, '2024-11-22 17:14:46'),
(10, 'Fábio Costa', '900000000', 1, '2024-11-22 17:14:46'),
(11, 'Thiago Martins', '899999999', 1, '2024-11-22 17:14:46'),
(12, 'Camila Ferreira', '888888888', 1, '2024-11-22 17:14:46'),
(13, 'Juliana Gomes', '877777777', 1, '2024-11-22 17:14:46'),
(14, 'André Oliveira', '866666666', 1, '2024-11-22 17:14:46'),
(15, 'Felipe Martins', '855555555', 1, '2024-11-22 17:14:46'),
(16, 'Jorginho', '33333333333', 1, '2024-11-22 17:17:57');

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
(1, 'Shampoo', 10.00, 20.00, 1),
(2, 'Cera para cabelo', 15.00, 30.00, 1),
(3, 'Pente', 5.00, 10.00, 1),
(4, 'Tesoura', 20.00, 40.00, 1),
(5, 'Navalha', 25.00, 50.00, 1),
(6, 'Gel fixador', 7.00, 15.00, 1),
(7, 'Creme de barbear', 12.00, 25.00, 1),
(8, 'Pomada', 18.00, 35.00, 1),
(9, 'Óleo de cabelo', 8.00, 18.00, 1),
(10, 'Escova', 6.00, 12.00, 1),
(11, 'Cabelo sintético', 50.00, 100.00, 1),
(12, 'Spray fixador', 9.00, 18.00, 1),
(13, 'Tintura', 30.00, 60.00, 1),
(14, 'Loção pós-barba', 14.00, 28.00, 1),
(15, 'Condicionador', 11.00, 22.00, 1);

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
(1, 'Corte de cabelo', 30.00, 30, 1),
(2, 'Barba', 20.00, 20, 1),
(3, 'Corte e barba', 50.00, 45, 1),
(4, 'Sobrancelha', 15.00, 15, 1),
(5, 'Hidratação capilar', 40.00, 60, 1),
(6, 'Tinte de cabelo', 60.00, 90, 1),
(7, 'Corte infantil', 25.00, 25, 1),
(8, 'Corte masculino', 35.00, 40, 1),
(9, 'Corte feminino', 45.00, 50, 1),
(10, 'Shampoo e corte', 40.00, 40, 1),
(11, 'Lavagem de cabelo', 10.00, 10, 1),
(12, 'Barba e sobrancelha', 25.00, 30, 1),
(13, 'Corte e hidratação', 60.00, 70, 1),
(14, 'Corte e penteado', 50.00, 60, 1),
(15, 'Corte e coloração', 80.00, 100, 1);

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
(1, 'Administrador', 'admin', 'senha123', 1),
(2, 'João Silva', 'joao', 'senha123', 1),
(3, 'Carlos Pereira', 'carlos', 'senha123', 1),
(4, 'Ana Souza', 'ana', 'senha123', 1),
(5, 'Luciano Santos', 'luciano', 'senha123', 1),
(6, 'Marcos Oliveira', 'marcos', 'senha123', 1),
(7, 'Ricardo Costa', 'ricardo', 'senha123', 1),
(8, 'Paula Lima', 'paula', 'senha123', 1),
(9, 'Eduardo Rocha', 'eduardo', 'senha123', 1),
(10, 'Renata Alves', 'renata', 'senha123', 1),
(11, 'Fábio Costa', 'fabio', 'senha123', 1),
(12, 'Thiago Martins', 'thiago', 'senha123', 1),
(13, 'Camila Ferreira', 'camila', 'senha123', 1),
(14, 'Juliana Gomes', 'juliana', 'senha123', 1),
(15, 'André Oliveira', 'andre', 'senha123', 1),
(16, 'Administrador', 'admin', 'senha123', 1),
(17, 'João Silva', 'joao', 'senha123', 1),
(18, 'Carlos Pereira', 'carlos', 'senha123', 1),
(19, 'Ana Souza', 'ana', 'senha123', 1),
(20, 'Luciano Santos', 'luciano', 'senha123', 1),
(21, 'Marcos Oliveira', 'marcos', 'senha123', 1),
(22, 'Ricardo Costa', 'ricardo', 'senha123', 1),
(23, 'Paula Lima', 'paula', 'senha123', 1),
(24, 'Eduardo Rocha', 'eduardo', 'senha123', 1),
(25, 'Renata Alves', 'renata', 'senha123', 1),
(26, 'Fábio Costa', 'fabio', 'senha123', 1),
(27, 'Thiago Martins', 'thiago', 'senha123', 1),
(28, 'Camila Ferreira', 'camila', 'senha123', 1),
(29, 'Juliana Gomes', 'juliana', 'senha123', 1),
(30, 'André Oliveira', 'andre', 'senha123', 1),
(31, 'Leonardo Nehara', 'Leonardo.Nehara', 'b4d2459a8fc2c8d3210aff517588962c', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `barbeiro`
--
ALTER TABLE `barbeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `servico`
--
ALTER TABLE `servico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
