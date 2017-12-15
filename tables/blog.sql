/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-09-11 14:39:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(32) NOT NULL,
  `login_account` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `is_deleted` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------

-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` varchar(32) NOT NULL,
  `class_name` varchar(50) DEFAULT NULL,
  `class_code` varchar(20) DEFAULT NULL,
  `parent_id` varchar(32) DEFAULT NULL,
  `class_level` varchar(20) DEFAULT NULL,
  `enabled` char(1) DEFAULT NULL,
  `catalog_order` int(11) DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_deleted` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('1', 'UI', '10', '0', '1', '', null, null, null, null, null, '0');
INSERT INTO `class` VALUES ('2', 'H5/Css3', '11', '0', '1', null, null, null, null, null, null, '0');
INSERT INTO `class` VALUES ('3', 'javascript', '12', '0', '1', null, null, null, null, null, null, '0');
INSERT INTO `class` VALUES ('4', 'es6', '13', '0', '1', null, null, null, null, null, null, '0');
INSERT INTO `class` VALUES ('5', 'vuejs', '14', '0', '1', null, null, null, null, null, null, '0');
INSERT INTO `class` VALUES ('6', 'nodejs', '15', '0', '1', null, null, null, null, null, null, '0');

-- ----------------------------
-- Table structure for `info`
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `id` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `content` longtext,
  `brief` text,
  `status` char(1) DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_deleted` char(1) DEFAULT NULL,
  `zan` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info
-- ----------------------------

-- ----------------------------
-- Table structure for `life`
-- ----------------------------
DROP TABLE IF EXISTS `life`;
CREATE TABLE `life` (
  `id` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `content` longtext,
  `brief` text,
  `status` char(1) DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_deleted` char(1) DEFAULT NULL,
  `zan` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of life
-- ----------------------------

-- ----------------------------
-- Table structure for `technicalfile`
-- ----------------------------
DROP TABLE IF EXISTS `technicalfile`;
CREATE TABLE `technicalfile` (
  `id` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `content` longtext,
  `brief` text,
  `status` char(1) DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_deleted` char(1) DEFAULT NULL,
  `zan` int(255) DEFAULT NULL,
  `class_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of technicalfile
-- ----------------------------

-- ----------------------------
-- Table structure for `works`
-- ----------------------------
DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `id` varchar(32) NOT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `order_by` int(11) DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_deleted` char(1) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of works
-- ----------------------------
