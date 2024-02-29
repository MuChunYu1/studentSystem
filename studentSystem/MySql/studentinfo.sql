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

 Date: 29/02/2024 13:59:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for studentinfo
-- ----------------------------
DROP TABLE IF EXISTS `studentinfo`;
CREATE TABLE `studentinfo`  (
  `studentId` int NOT NULL AUTO_INCREMENT COMMENT '学生Id',
  `studentNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学号',
  `studentName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生姓名',
  `sex` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '性别',
  `studentTel` bigint NOT NULL COMMENT '联系方式',
  `region` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '家庭地址',
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '系部',
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '年级',
  `major` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '专业',
  `className` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '班级',
  `studentQQ` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '联系QQ',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `roles` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限',
  `studentPhoto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学生照片',
  `state` int NOT NULL DEFAULT 0 COMMENT '删除状态',
  PRIMARY KEY (`studentId`, `studentNumber`) USING BTREE,
  UNIQUE INDEX `studentNumber`(`studentNumber` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentinfo
-- ----------------------------
INSERT INTO `studentinfo` VALUES (6, '202041001307', '陆子荣', '男', 18574803682, '河北省-秦皇岛市-北戴河区', '自动化工程系', '2020级', '智能制造工程', '5班', '1634092775', '112233', '学生', 'blob:http://localhost:8080/adcf711a-e050-4d3f-ab41-ba6dccc25f06', 0);
INSERT INTO `studentinfo` VALUES (7, '202041000109', '蒋珂铭', '男', 17673987152, '宁夏回族自治区-中卫市-海原县', '核工程与新能技术系', '2020级', '新能源材料与器件', '4班', '996632945', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (8, '202041001754', '张涛', '男', 18548506253, '山西省-大同市-平城区', '经济系', '2020级', '财务管理', '4班', '1484383553', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (10, '202041001363', '袁忠', '男', 18574814110, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2096584554', '11223344', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (11, '202041000951', '杨招', '男', 18573930922, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2872160350', '123123', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (12, '202041000344', '周子凯', '男', 13787702881, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2806887907', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (13, '202041000415', '刘源', '男', 19958782458, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '1772342445', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (14, '202041001011', '肖江平', '男', 15673581282, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '952826245', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (15, '202041000101', '樊威', '男', 13272293389, '北京市-市辖区-平谷区', '管理与传媒系', '2020级', '网络与新媒体', '3班', '623823924', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (16, '202041001757', '黄莹', '女', 18569760503, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2859564473', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (17, '202041000423', '易涛', '男', 18175864263, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '3196479956', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (18, '202041000950', '李志刚', '男', 15180933472, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2775576754', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (20, '202041000875', '谭慧玲', '女', 15575575018, '河北省-秦皇岛市-北戴河区', '外语系', '2020级', '日语', '5班', '2673722263', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (21, '202041001410', '刘斌', '男', 18175544028, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '1258979014', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (22, '202041000949', '马志文', '男', 15842976970, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2741066527', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (23, '202041001684', '文淼', '女', 19176757043, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2389668744', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (24, '202041000956', '林妮妮', '女', 17673816680, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '484767370', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (25, '202041000947', '刘杰', '男', 18307391456, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '4班', '3176674303', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (26, '202041001683', '李明月', '女', 15812433995, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2138988371', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (27, '202041000876', '曹佳盈', '女', 17673987152, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '2班', '2945045849', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (28, '202041001046', '郭佳鸿', '男', 15080935585, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '人工智能', '5班', '1783721310', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (29, '202041000824', '周赞清', '男', 18188967956, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '6班', '743526761', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (31, '202041001780', '龙科全', '男', 13272293389, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '210627634', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (32, '202041000840', '肖腊梅', '女', 18570467370, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '1班', '3165873838', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (33, '202041000664', '成绣荣', '女', 15570954972, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2895270597', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (34, '202041000094', '张元', '男', 18711493898, '天津市-市辖区-河东区', '外语系', '2020级', '英语', '2班', '2105191726', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (35, '202041000690', '周海斌', '男', 18674728924, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2730396924', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (36, '202041000656', '陈城', '女', 18774617962, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2830268520', '11223344', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (37, '202041000491', '唐婷', '女', 18373488101, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2895866578', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (38, '202041001782', '唐林', '男', 18932193664, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2548228775', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (39, '202041000340', '郑涛', '男', 18627474269, '河北省-秦皇岛市-北戴河区', '外语系', '2020级', '英语', '4班', '1171191650', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (40, '202041001263', '曾雯', '女', 15898424619, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '951208764', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (42, '205041000178', '吴吉祥', '男', 17374382370, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2687894674', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (43, '202041001256', '刘懿', '男', 18573711665, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '1696239876', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (44, '202041001360', '伍俊杰', '男', 17508453912, '河北省-秦皇岛市-北戴河区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '2930037485', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (45, '202041000294', '肖智愚', '男', 19158161554, '山西省-阳泉市-郊区', '艺术系', '2020级', '视觉传达设计', '6班', '3318797717', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (46, '202020205501', '帅哥', '男', 15543827777, '天津市-市辖区-河东区', '电子信息与计算机工程系', '2020级', '软件工程', '5班', '1103551466', '112233', '学生', 'blob:http://localhost:8080/e8e7bfb6-28ab-45ce-ab85-38287ce10d8e', 0);
INSERT INTO `studentinfo` VALUES (47, '202020205504', '牛牛', '男', 15546567864, '内蒙古自治区-包头市-昆都仑区', '经济系', '2020级', '会计学', '2班', '123456789', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (48, '202020205505', '穆春雨', '男', 15546784565, '天津市-市辖区-河西区', '核工程与新能技术系', '2020级', '核工程与核技术', '5班', '123456789', '112233', '学生', NULL, 0);
INSERT INTO `studentinfo` VALUES (49, '202020205508', '木木', '男', 15546324565, '内蒙古自治区-包头市-昆都仑区', '核工程与新能技术系', '2020级', '新能源材料与器件', '5班', '789456', '112233', '学生', NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
