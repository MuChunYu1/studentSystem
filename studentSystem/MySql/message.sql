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

 Date: 29/02/2024 13:59:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `messageId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发布人账号',
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发布人姓名',
  `issue` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型',
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '详情',
  `createTime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `state` int NOT NULL DEFAULT 0 COMMENT '状态',
  PRIMARY KEY (`messageId`, `userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (26, '202020205501', '帅哥', '忘记密码', '忘记密码', '2024-02-28 16:26:45', 0);
INSERT INTO `message` VALUES (27, '202020205501', '帅哥', '忘记密码', '忘记密码', '2024-02-28 16:26:45', 0);
INSERT INTO `message` VALUES (29, '202020205501', '帅哥', '忘记密码', '忘记密码', '2024-02-28 16:26:46', 0);
INSERT INTO `message` VALUES (30, '202020205501', '帅哥', '忘记密码', '忘记密码', '2024-02-28 16:26:48', 0);
INSERT INTO `message` VALUES (41, '202041000951', '杨招', '选课信息错误', '多选了一门课', '2024-02-28 22:20:36', 0);

SET FOREIGN_KEY_CHECKS = 1;
