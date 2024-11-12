-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12-Nov-2024 às 02:33
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dados_forms`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `dados_clientes`
--

CREATE TABLE `dados_clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `dataNascimento` date NOT NULL,
  `endereco` varchar(40) NOT NULL,
  `genero` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `dados_clientes`
--

INSERT INTO `dados_clientes` (`id`, `nome`, `dataNascimento`, `endereco`, `genero`) VALUES
(1, 'Amanda', '2024-11-10', 'Rua almirante 123', 1),
(2, 'Carlos', '2024-11-29', 'Avenida Olegário', 0),
(3, 'Marelo Santos', '2024-11-03', 'Rua das Couves, 1001', 0),
(4, 'Samara', '2024-11-21', 'dwdwdwdwdwdwdw', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `dados_clientes`
--
ALTER TABLE `dados_clientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `dados_clientes`
--
ALTER TABLE `dados_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
