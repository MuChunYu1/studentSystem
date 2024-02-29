/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : studentsystem

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 29/02/2024 13:59:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `courseId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课程号',
  `course` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课程',
  `xf` float NOT NULL COMMENT '学分',
  `teacher` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '教师',
  PRIMARY KEY (`courseId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('3', 'JavaScript', 1, '刘明');
INSERT INTO `course` VALUES ('4', 'HTML+CSS', 1.5, '朱波');
INSERT INTO `course` VALUES ('5', '数据结构（1）', 3, '秦天');
INSERT INTO `course` VALUES ('6', '算法', 2, '朱古力');
INSERT INTO `course` VALUES ('7', 'JAVA', 2, '马天放');
INSERT INTO `course` VALUES ('8', 'C++', 1, '崔星');
INSERT INTO `course` VALUES ('gd01', '高等数学', 2, '宋丽丽');
INSERT INTO `course` VALUES ('ui56', 'c语言', 1, '刘德华');
INSERT INTO `course` VALUES ('ui78', 'jsp', 2.1, '柳柳');

SET FOREIGN_KEY_CHECKS = 1;
