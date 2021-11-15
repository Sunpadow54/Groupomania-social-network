-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 09 sep. 2021 à 17:41
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `date_comment` datetime NOT NULL,
  `content_comment` text NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `fk_id_post_c` (`id_post`),
  KEY `fk_id_user_c` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id_comment`, `id_post`, `id_user`, `is_active`, `date_comment`, `content_comment`) VALUES
(1, 1, 3, 1, '2021-09-09 18:10:56', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'),
(2, 2, 3, 1, '2021-09-09 18:11:40', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
(3, 2, 5, 1, '2021-09-09 18:12:20', 'sunt in culpa qui officia deserunt mollit anim id est laborum'),
(4, 2, 6, 1, '2021-09-09 18:15:11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'),
(5, 3, 6, 1, '2021-09-09 18:15:30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'),
(6, 3, 3, 1, '2021-09-09 18:42:28', 'Lorem ipsum dolor sit amet. Qui voluptatem consequatur in quia quis qui praesentium blanditiis. Qui voluptates nihil id voluptatem animi ut tempora recusandae eos deleniti voluptatem ea temporibus labore non distinctio veniam non vero nihil.'),
(7, 2, 4, 1, '2021-09-09 19:37:38', 'Qui veritatis quas est beatae error qui dignissimos dicta ad illum porro. Ad galisum'),
(8, 2, 3, 1, '2021-09-09 19:38:25', 'Qui tempore officia eos tenetur consequatur et neque ipsa.');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `date_post` datetime NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text DEFAULT NULL,
  `img` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `fk_id_user_p` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `is_active`, `date_post`, `title`, `content`, `img`) VALUES
(1, 4, 1, '2021-09-09 18:07:18', 'Première publication', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ...', 'http://localhost:3000/images/yiran-yang-lo_pwIr9U1k-unsplash_1631203638131.jpg'),
(2, 4, 1, '2021-09-09 18:09:21', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'http://localhost:3000/images/ardalan-hamedani-stHJWyuclTA-unsplash_1631203761511.jpg'),
(3, 6, 1, '2021-09-09 18:14:53', 'Sed ut perspiciatis unde omnis iste natus error', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse', 'http://localhost:3000/images/thor-alvis-sgrCLKYdw5g-unsplash_1631204093622.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `email`, `pass`, `is_admin`, `is_active`, `lastname`, `firstname`) VALUES
(1, 'XuUGXCyDnb4NfSVk3OeDxXjM6s7qC3Coz4SYUyiCYic=', '$2b$10$9OkKjBuMTQpGr/f1YQFysusiE2r9QvfMrKSSUY7bBdsr5Wu/hLG12', 1, 1, 'admin', '1'),
(2, 'ah/1zOginBbx+i2b3HTdkOf78aTINQ6pYuMvSHiMnHE=', '$2b$10$huBk.26upIA5skgc3SQZFumkl2ZlX.FFTKFfHRGU28mg8FvjChKYS', 1, 1, 'admin', '2'),
(3, 'F2eGJOkrQlJzIXMPyjdNiQ==', '$2b$10$iglJ.FpR0bOwySVdP0Kf6u8GKC4q4wQ3FHUcRWXsvtvt.Ar08TWrq', 0, 1, 'Rodolfo', 'Elmer '),
(4, 'z5NxRw2fa6yJkKwiXmQNWw==', '$2b$10$iCwmjkBOR/ocmRdaICabG.Hbglmfa.Hf6wvTdR3u8xLKBNPedwwbi', 0, 1, 'Evalyn ', 'Erik'),
(5, 'FjYu/zDV/lH1h3uX5Umlig==', '$2b$10$4HtjMvPWQ5YK3mxadqAqu.MUMNn6plPyqRcEi.ve7iasvqEAgZwpW', 0, 1, 'Boniface', 'Jeanne'),
(6, 'dNSinklgXyyshB22FN6+Tg==', '$2b$10$WUj0yDgXNJvQxUScUiU7..0PfVxO/nWDFWnaxlX9TalYQNmSTKr2i', 0, 1, 'Jayson ', 'Francis ');

-- --------------------------------------------------------

--
-- Structure de la table `votes`
--

DROP TABLE IF EXISTS `votes`;
CREATE TABLE IF NOT EXISTS `votes` (
  `id_vote` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `vote` enum('like','dislike') NOT NULL,
  PRIMARY KEY (`id_vote`),
  UNIQUE KEY `unique_vote` (`id_post`,`id_user`),
  KEY `fk_id_user_v` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `votes`
--

INSERT INTO `votes` (`id_vote`, `id_post`, `id_user`, `vote`) VALUES
(9, 2, 6, 'like'),
(10, 1, 6, 'dislike'),
(12, 3, 6, 'dislike'),
(24, 3, 5, 'like'),
(32, 1, 3, 'like'),
(34, 3, 3, 'like'),
(35, 2, 3, 'dislike'),
(36, 3, 4, 'like'),
(37, 1, 5, 'like'),
(38, 2, 5, 'dislike'),
(41, 3, 1, 'like'),
(42, 3, 2, 'like');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_id_post_c` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_id_user_c` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_id_user_p` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `fk_id_post_v` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_id_user_v` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
