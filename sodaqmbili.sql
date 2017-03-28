-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 24, 2017 at 02:03 PM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sodaqmbili`
--
CREATE DATABASE IF NOT EXISTS `sodaqmbili` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sodaqmbili`;

-- --------------------------------------------------------

--
-- Table structure for table `airsensor`
--

CREATE TABLE IF NOT EXISTS `airsensor` (
  `air_s_id` int(11) NOT NULL AUTO_INCREMENT,
  `air_s_date` date NOT NULL,
  `air_s_value` int(11) NOT NULL,
  PRIMARY KEY (`air_s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `humiditysensor`
--

CREATE TABLE IF NOT EXISTS `humiditysensor` (
  `humidity_s_id` int(11) NOT NULL AUTO_INCREMENT,
  `humidity_s_date` date NOT NULL,
  `humidity_s_value` float NOT NULL,
  PRIMARY KEY (`humidity_s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `lightsensor`
--

CREATE TABLE IF NOT EXISTS `lightsensor` (
  `light_s_id` int(11) NOT NULL AUTO_INCREMENT,
  `light_s_date` date NOT NULL,
  `light_s_value` float NOT NULL,
  PRIMARY KEY (`light_s_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `lightsensor`
--

INSERT INTO `lightsensor` (`light_s_id`, `light_s_date`, `light_s_value`) VALUES
(5, '2001-03-10', 30.2),
(6, '2001-03-10', 30.2),
(7, '2001-03-10', 30.2),
(8, '2001-03-10', 30.2),
(9, '2001-03-10', 30.2),
(10, '2001-03-10', 30.2);

-- --------------------------------------------------------

--
-- Table structure for table `loudsensor`
--

CREATE TABLE IF NOT EXISTS `loudsensor` (
  `loud_s_id` int(11) NOT NULL AUTO_INCREMENT,
  `loud_s_date` date NOT NULL,
  `loud_s_value` int(11) NOT NULL,
  PRIMARY KEY (`loud_s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pressuresensor`
--

CREATE TABLE IF NOT EXISTS `pressuresensor` (
  `pressure_s_id` int(11) NOT NULL AUTO_INCREMENT,
  `pressure_s_date` date NOT NULL,
  `pressure_s_value` float NOT NULL,
  PRIMARY KEY (`pressure_s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tempsensor`
--

CREATE TABLE IF NOT EXISTS `tempsensor` (
  `temp_s_id` int(11) NOT NULL AUTO_INCREMENT,
  `temp_s_date` date NOT NULL,
  `temp_s_value` float NOT NULL,
  PRIMARY KEY (`temp_s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
