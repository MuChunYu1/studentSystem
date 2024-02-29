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

 Date: 29/02/2024 14:00:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for studentscore
-- ----------------------------
DROP TABLE IF EXISTS `studentscore`;
CREATE TABLE `studentscore`  (
  `studentId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学号',
  `courseId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课程号',
  `score` int NOT NULL COMMENT '成绩',
  PRIMARY KEY (`studentId`, `courseId`) USING BTREE,
  INDEX `courseId`(`courseId` ASC) USING BTREE,
  CONSTRAINT `courseId` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `studentId` FOREIGN KEY (`studentId`) REFERENCES `studentinfo` (`studentNumber`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentscore
-- ----------------------------
INSERT INTO `studentscore` VALUES ('202020205501', '3', 79);
INSERT INTO `studentscore` VALUES ('202020205501', '4', 87);
INSERT INTO `studentscore` VALUES ('202020205501', '5', 0);
INSERT INTO `studentscore` VALUES ('202020205501', '7', 100);
INSERT INTO `studentscore` VALUES ('202020205501', '8', 100);
INSERT INTO `studentscore` VALUES ('202020205501', 'gd01', 100);
INSERT INTO `studentscore` VALUES ('202020205501', 'ui56', 100);
INSERT INTO `studentscore` VALUES ('202020205501', 'ui78', 10);
INSERT INTO `studentscore` VALUES ('202041000951', '3', 0);
INSERT INTO `studentscore` VALUES ('202041000951', '4', 0);
INSERT INTO `studentscore` VALUES ('202041000951', '6', 0);

SET FOREIGN_KEY_CHECKS = 1;
