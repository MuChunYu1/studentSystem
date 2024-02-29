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

 Date: 29/02/2024 13:59:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for studentadminaccount
-- ----------------------------
DROP TABLE IF EXISTS `studentadminaccount`;
CREATE TABLE `studentadminaccount`  (
  `num` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `userPassword` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `roles` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '学生管理' COMMENT '权限管理',
  `state` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`num`, `id`) USING BTREE,
  UNIQUE INDEX `userName`(`userName` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentadminaccount
-- ----------------------------
INSERT INTO `studentadminaccount` VALUES (2, 'admin', 'admin', '112233', '超级管理员,学生管理,课程管理,信息管理,权限管理', 0);
INSERT INTO `studentadminaccount` VALUES (3, 'mcy', '穆春雨', '112233', '学生管理,信息管理,权限管理', 0);
INSERT INTO `studentadminaccount` VALUES (4, '123', '伍六七', '112233', '权限管理,课程管理,信息管理,学生管理', 0);

SET FOREIGN_KEY_CHECKS = 1;
