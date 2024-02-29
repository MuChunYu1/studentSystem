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

 Date: 29/02/2024 13:59:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for studentroleadmin
-- ----------------------------
DROP TABLE IF EXISTS `studentroleadmin`;
CREATE TABLE `studentroleadmin`  (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `roles` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '学生管理' COMMENT '权限管理',
  `state` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`roleId`) USING BTREE,
  UNIQUE INDEX `roleName`(`roleName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentroleadmin
-- ----------------------------
INSERT INTO `studentroleadmin` VALUES (1, '超级管理员', '账户管理,角色管理,学生信息管理,学生成绩管理,学生账号管理,反馈信息管理', 0);
INSERT INTO `studentroleadmin` VALUES (2, '学生管理', '学生信息管理,学生成绩管理,学生账号管理', 0);
INSERT INTO `studentroleadmin` VALUES (3, '权限管理', '账户管理,角色管理', 0);
INSERT INTO `studentroleadmin` VALUES (4, '课程管理', '课程管理,选课信息', 0);
INSERT INTO `studentroleadmin` VALUES (5, '信息管理', '反馈信息管理', 0);
INSERT INTO `studentroleadmin` VALUES (6, '学生', '个人信息管理,选课管理,反馈信息管理', 0);

SET FOREIGN_KEY_CHECKS = 1;
