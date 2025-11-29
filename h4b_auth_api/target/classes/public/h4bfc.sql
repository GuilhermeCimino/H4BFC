-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/10/2025 às 23:14
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
-- Banco de dados: `h4bfc`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `camisa`
--

CREATE TABLE `camisa` (
  `id_camisa` int(11) NOT NULL,
  `nome_camisa` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cantratos`
--

CREATE TABLE `cantratos` (
  `id_contrato` int(11) NOT NULL,
  `id_time` int(11) NOT NULL,
  `id_patrocinio` int(11) NOT NULL,
  `dt_contrato` date NOT NULL,
  `vl_contrato` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogadores`
--

CREATE TABLE `jogadores` (
  `id_jogador` int(11) NOT NULL,
  `nm_jogador` varchar(150) NOT NULL,
  `nm_posicao` varchar(150) NOT NULL,
  `cd_jogador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `jogadores`
--

INSERT INTO `jogadores` (`id_jogador`, `nm_jogador`, `nm_posicao`, `cd_jogador`) VALUES
(1, 'Ruan Bauer', 'Atacante', 16),
(2, 'Natan Correa', 'Zagueiro', 66),
(17, 'Guilherme Cimino', 'Meio Campista', 10),
(18, 'Cristiano Ronaldo', 'Atacante', 7),
(22, 'Miguel Luizatto', 'Lateral Direito', 13),
(23, 'Miguel Luizatto', 'Lateral Direito', 13),
(24, 'Robert Lewandowski', 'Atacante', 9),
(25, 'Robert Lewandowski', 'Atacante', 9),
(26, 'Cleber Baiano', 'Lateral Esquerdo', 54),
(27, 'Eduardo Pereira Rodrigues', 'Meio Campista', 77),
(28, 'Diego', 'Meio Campista', 69),
(29, 'Matheus Oliveira', 'Meio Campista', 5),
(30, 'Gabriel Cerejo', 'Zagueiro', 30),
(31, 'Marcos', 'Goleiro', 1),
(32, 'Caio Goiaba', 'Lateral Esquerdo', 32),
(33, 'Abdallah habib', 'Atacante', 11);

-- --------------------------------------------------------

--
-- Estrutura para tabela `patrocinio`
--

CREATE TABLE `patrocinio` (
  `id_patrocinio` int(11) NOT NULL,
  `nm_patrocinio` varchar(150) NOT NULL,
  `nm_tipo_patrocinio` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `time`
--

CREATE TABLE `time` (
  `id_time` int(11) NOT NULL,
  `nm_time` varchar(150) NOT NULL,
  `dt_criacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `camisa`
--
ALTER TABLE `camisa`
  ADD PRIMARY KEY (`id_camisa`);

--
-- Índices de tabela `cantratos`
--
ALTER TABLE `cantratos`
  ADD PRIMARY KEY (`id_contrato`),
  ADD KEY `id_contrato` (`id_contrato`,`id_time`),
  ADD KEY `id_contrato_2` (`id_contrato`,`id_time`,`id_patrocinio`);

--
-- Índices de tabela `jogadores`
--
ALTER TABLE `jogadores`
  ADD PRIMARY KEY (`id_jogador`);

--
-- Índices de tabela `patrocinio`
--
ALTER TABLE `patrocinio`
  ADD PRIMARY KEY (`id_patrocinio`);

--
-- Índices de tabela `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id_time`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `camisa`
--
ALTER TABLE `camisa`
  MODIFY `id_camisa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cantratos`
--
ALTER TABLE `cantratos`
  MODIFY `id_contrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `jogadores`
--
ALTER TABLE `jogadores`
  MODIFY `id_jogador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `patrocinio`
--
ALTER TABLE `patrocinio`
  MODIFY `id_patrocinio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `time`
--
ALTER TABLE `time`
  MODIFY `id_time` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
