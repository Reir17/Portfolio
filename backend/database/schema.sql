-- SQL Query to Create Database and Tables for Portfolio
-- Database Name: portfolio_db

-- Drop the database if it already exists to ensure a clean slate
DROP DATABASE IF EXISTS portfolio_db;

-- Create the new database
CREATE DATABASE portfolio_db;

-- Use the newly created database
USE portfolio_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `about_me`
--

DROP TABLE IF EXISTS `about_me`;
CREATE TABLE `about_me` (
  `id` int NOT NULL,
  `deskripsi` text NOT NULL,
  `gambar_url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `about_me`
--

INSERT INTO `about_me` (`id`, `deskripsi`, `gambar_url`) VALUES
(1, 'No about me data available.', 'https://tse1.mm.bing.net/th/id/OIP.GAY6V1Y7zQqqEPTZkR5SJQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3');

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `id` int NOT NULL,
  `deskripsi` text,
  `title` varchar(255) NOT NULL,
  `time` varchar(100) NOT NULL,
  `image` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `deskripsi`, `title`, `time`, `image`) VALUES
(4, 'ayam', '', '', NULL),
(5, 'zscvavckcv', '', '', NULL),
(6, 'dies natalis ini sanagt keren', 'dies natalis', 'june 2025', 'https://www.msn.com/en-us/money/markets/trump-says-he-has-terminated-trade-talks-with-canada/ar-AA1HywDI?ocid=msedgntp&pc=CNNDDB&cvid=ce67e0e44ffe4e7aa5bb7a7d05c0928b&ei=10');

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
  `id` int NOT NULL,
  `jurusan` varchar(100) DEFAULT NULL,
  `institusi` varchar(100) DEFAULT NULL,
  `tahun` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `jurusan`, `institusi`, `tahun`) VALUES
(1, 'tenik ', 'usnsbj', '21342'),
(2, 'seko', 'j', 'y'),
(3, 'SCIENCE', 'SMAN 1 SIANTAN', '2019 - 2022');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
CREATE TABLE `experiences` (
  `id` int NOT NULL,
  `posisi` varchar(100) DEFAULT NULL,
  `tempat` varchar(100) DEFAULT NULL,
  `tahun` varchar(50) DEFAULT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `posisi`, `tempat`, `tahun`, `deskripsi`) VALUES
(1, 'tanjungpinang', 'ascs ajcac', '202', 'asc ajc c');

-- --------------------------------------------------------

--
-- Table structure for table `hero_text`
--

DROP TABLE IF EXISTS `hero_text`;
CREATE TABLE `hero_text` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hero_text`
--

INSERT INTO `hero_text` (`id`, `name`, `description`) VALUES
(1, 'IRPAN HARIS', 'A passionate frontend developer with a focus on user experience and clean design. I love building web interfaces that are accessible, responsive, and performance-focused.');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int NOT NULL,
  `nama_project` varchar(100) DEFAULT NULL,
  `deskripsi` text,
  `link` varchar(255) DEFAULT NULL,
  `gambar` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `nama_project`, `deskripsi`, `link`, `gambar`) VALUES
(1, 'kecap', 'kecap kecup K*ont*ol', 'aksbciabcib', 'https://th.bing.com/th/id/OIP.5sBhMGO1p2iQlTkap1e5-wHaG3?w=195&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),
(2, 'a', 'A', 'A', NULL),
(3, 'v', '', '', ''),
(4, 'projeck imk', 'asdasddad', 'asdsad', 'adadas');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `id` int NOT NULL,
  `nama_skill` varchar(100) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `nama_skill`, `level`) VALUES
(1, 'Cooking', '25'),
(2, 'driftiff', '34'),
(4, 'b', '63'),
(5, 'g', '80'),
(6, 'HTML', '70');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_me`
--
ALTER TABLE `about_me`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_text`
--
ALTER TABLE `hero_text`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_me`
--
ALTER TABLE `about_me`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;