-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18/11/2024 às 16:08
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
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL,
  `barbeiro_id` int(11) NOT NULL,
  `servico_id` int(11) NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(74, 'JOSÉ MARCOS', '44984465435', 1, '2024-11-18 00:55:25'),
(75, 'JOSÉ MARCOS', '44984465435', 1, '2024-11-18 00:56:44'),
(76, 'JOSÉ MARCOS', '44984465435', 1, '2024-11-18 01:00:25'),
(77, 'JOSÉ MARCOS', '44984465435', 1, '2024-11-18 01:00:32'),
(78, 'JOSÉ MARCOS', '44984465435', 1, '2024-11-18 01:10:00'),
(79, 'Leonardo', '44984465435', 1, '2024-11-18 01:16:42'),
(80, 'Leonardo', '44984465435', 1, '2024-11-18 01:17:01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `filial`
--

CREATE TABLE `filial` (
  `idfilial` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `cnpj_cpf` varchar(14) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `idsituacao` smallint(6) NOT NULL COMMENT '1 - Ativo\r\n2 - Inativo',
  `idtipofilial` smallint(6) NOT NULL COMMENT '1 - ADMIN\r\n2 - TRANSPORTADORA\r\n3 - CD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `filial`
--

INSERT INTO `filial` (`idfilial`, `nome`, `cnpj_cpf`, `email`, `telefone`, `idsituacao`, `idtipofilial`) VALUES
(1, 'Matriz', '11331494990123', 'lucas.dossantos@gazin.com.br', '44998487185', 1, 1),
(22, 'IDH', '11111111111111', 'idh@transportes.com', '44111111111', 1, 2),
(23, 'ALFA', '22222222222222', 'alfa@transportes.com', '44222222222', 1, 2),
(24, 'RODONAVES', '33333333333333', 'rodonaves@transportes.com', '44333333333', 1, 2),
(25, 'DOURADINA', '44444444444444', 'douradina@transportes.com', '44444444444', 1, 3),
(26, 'IPAMERI', '55555555555555', 'ipameri@transportes.com', '55555555555', 1, 3),
(27, 'FEIRA DE SANTANA', '66666666666666', 'feira@transportes.com', '66666666666', 1, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupos`
--

CREATE TABLE `grupos` (
  `idgrupo` int(11) NOT NULL,
  `descricao` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `grupos`
--

INSERT INTO `grupos` (`idgrupo`, `descricao`) VALUES
(1, 'ADMIN'),
(2, 'TRANSPORTADORA'),
(3, 'CD');

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
(1, 'Shampoo para Barba', 10.50, 20.00, 1),
(2, 'Cera de Cabelo', 8.00, 15.00, 1),
(3, 'Óleo para Barba', 12.00, 25.00, 1),
(4, 'Máquina de Corte', 50.00, 100.00, 1),
(5, 'Creme de Barbear', 5.00, 12.00, 1),
(6, 'Pente de Madeira', 3.00, 7.00, 1);

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

-- --------------------------------------------------------

--
-- Estrutura para tabela `situacao`
--

CREATE TABLE `situacao` (
  `idsituacao` int(11) NOT NULL,
  `situacao` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `situacao`
--

INSERT INTO `situacao` (`idsituacao`, `situacao`) VALUES
(1, 'PEDENTE CONFIRMAÇÂO'),
(2, 'EM ANDAMENTO'),
(3, 'FINALIZADO'),
(4, 'RECUSADO'),
(5, 'CANCELADO');

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
(28, 'Lucas Gabriel', 'lucas.gabriel', '28284886917f9a2fa6952251e64ebea3', 1),
(29, 'Lucas Rico', 'lucas.bonfim', '7e246b7e60e825d99c65351fdd25752d', 1),
(30, 'Robson Alves', 'robson.alves', '7e246b7e60e825d99c65351fdd25752d', 1),
(31, 'Amanda Dias', 'amanda.dias', '7e246b7e60e825d99c65351fdd25752d', 1),
(32, 'Luana Delgado', 'luana.delgado', '28284886917f9a2fa6952251e64ebea3', 1),
(33, 'Altair Neves', 'altair.neves', '7e246b7e60e825d99c65351fdd25752d', 1),
(34, 'Tenisson Ben', 'ben.tenisson', '7e246b7e60e825d99c65351fdd25752d', 1),
(35, 'Tailan Loro', 'tailan.loro', '7e246b7e60e825d99c65351fdd25752d', 1),
(36, 'Leonardo', 'nehara', '6e5cb51c0581b4e0cd68b3127505fdb6', 1),
(37, 'Leonardo Saraiva Ferreira Nehara', 'Leonardo.Nehara', 'b4d2459a8fc2c8d3210aff517588962c', 1),
(38, 'Jorginho', 'Leonardo.Nehara', 'b4d2459a8fc2c8d3210aff517588962c', 1),
(39, 'Jorginho', 'Leonardo.Nehara333', 'b4d2459a8fc2c8d3210aff517588962c', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barbeiro_id` (`barbeiro_id`),
  ADD KEY `servico_id` (`servico_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `barbeiro`
--
ALTER TABLE `barbeiro`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `filial`
--
ALTER TABLE `filial`
  ADD PRIMARY KEY (`idfilial`);

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
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `barbeiro`
--
ALTER TABLE `barbeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de tabela `filial`
--
ALTER TABLE `filial`
  MODIFY `idfilial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `servico`
--
ALTER TABLE `servico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`barbeiro_id`) REFERENCES `barbeiro` (`id`),
  ADD CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servico` (`id`),
  ADD CONSTRAINT `agendamentos_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`idusuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
