-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: k10s208.p.ssafy.io    Database: bscard
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `businesscard`
--

DROP TABLE IF EXISTS `businesscard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businesscard` (
  `card_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `department` varchar(30) DEFAULT NULL,
  `fax_number` varchar(30) DEFAULT NULL,
  `job` varchar(30) DEFAULT NULL,
  `landline_number` varchar(30) DEFAULT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `domain_url` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `digital_picture` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `real_picture` varchar(255) DEFAULT NULL,
  `front_back` enum('FRONT','BACK') NOT NULL,
  PRIMARY KEY (`card_id`),
  KEY `FKp2xrywpqc31gtlx4k6rtj7qp8` (`user_id`),
  CONSTRAINT `FKp2xrywpqc31gtlx4k6rtj7qp8` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=408 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesscard`
--

LOCK TABLES `businesscard` WRITE;
/*!40000 ALTER TABLE `businesscard` DISABLE KEYS */;
INSERT INTO `businesscard` VALUES (151,'2024-05-16 04:52:52.271970','2024-05-16 04:52:52.271970',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(152,'2024-05-16 04:52:52.352740','2024-05-16 04:52:52.352740',NULL,'','8228807423','','8228807428','821023070369','ENGINEING National University','','dyshin@snu.ac.kr','Office of Information & Computing center','Gwanak-ro Gwanak-gu Seoul 08826, Korea',NULL,'Shin, Daeyong','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/69021f30-f5f3-48bf-95a1-c5c9bc1255de.jpg','FRONT'),(153,'2024-05-16 04:52:52.583247','2024-05-16 04:52:52.583247',NULL,'','','','','818·17-000951','경상대학교','','','총장','660-701 경남 진주시 진주대로 501',NULL,'권순기','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/06044a00-53c2-461e-9646-2b8e38c86ea3.jpg','FRONT'),(154,'2024-05-16 04:52:52.867918','2024-05-16 04:52:52.867918',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(155,'2024-05-16 04:52:53.182702','2024-05-16 15:02:22.717912',NULL,'Corporate Managernent Group','',NULL,'8227593782','821027843595','Oith POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Seung Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(157,'2024-05-16 14:59:31.267601','2024-05-16 14:59:31.267601',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(159,'2024-05-16 15:42:38.877478','2024-05-16 15:44:10.751205',NULL,'무역금융부 무역금융팀','',NULL,'02-6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krbank','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/bc4b6308-505d-48cd-8830-4ea3f824d6a9.jpg','FRONT'),(160,'2024-05-16 15:46:20.982634','2024-05-16 15:46:20.982634',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(162,'2024-05-16 15:46:21.046053','2024-05-16 15:46:21.046053',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(163,'2024-05-16 15:46:21.049945','2024-05-16 15:46:21.049945',NULL,'경영지원본부/인프라지원실정보시스템그룹','plus@poscointl.com',NULL,'02 759 3782','01027843595','POSCO','','korean','차장','인천광역시 연수구 컨벤시아대로165',NULL,'이승목','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/88d73020-b7fe-4d48-8c2b-1d343da1a22d.jpg','FRONT'),(165,'2024-05-16 15:46:21.069950','2024-05-16 15:46:21.069950',NULL,'','','','','818·17-000951','경상대학교','','','총장','660-701 경남 진주시 진주대로 501',NULL,'권순기','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/06044a00-53c2-461e-9646-2b8e38c86ea3.jpg','FRONT'),(166,'2024-05-16 15:46:21.073351','2024-05-16 15:46:21.073351',NULL,'','8228807423','','8228807428','821023070369','ENGINEING National University','','dyshin@snu.ac.kr','Office of Information & Computing center','Gwanak-ro Gwanak-gu Seoul 08826, Korea',NULL,'Shin, Daeyong','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/69021f30-f5f3-48bf-95a1-c5c9bc1255de.jpg','FRONT'),(167,'2024-05-16 15:46:21.076733','2024-05-16 15:46:21.076733',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(169,'2024-05-16 15:46:21.110328','2024-05-16 15:46:21.110328',NULL,'신경과','062-955-7581',NULL,'062-955-7580','062-955-7580','이세영 신경과','','test@test.com','원장','광주광역시 광산구 임방울대로327(세종문고 옆)',NULL,'이세영','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/59fb93bc-be02-4199-9faf-f8d8e26fe9a7.jpg','FRONT'),(175,'2024-05-16 17:00:51.129817','2024-05-16 17:00:51.129817',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(176,'2024-05-16 17:02:10.493920','2024-05-16 17:02:10.493920',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(177,'2024-05-16 17:02:15.767987','2024-05-16 17:02:15.767987',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(179,'2024-05-16 17:21:00.699627','2024-05-16 17:21:00.699627',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(182,'2024-05-16 23:55:15.741465','2024-05-16 23:55:15.741465',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4967e0c0-8d40-44c2-85d3-564122a059cc.jpg','FRONT'),(183,'2024-05-17 02:39:37.080372','2024-05-17 02:39:37.080372',NULL,'Corporate Managernent Group','',NULL,'8227593782','821027843595','Oith POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Seung Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(184,'2024-05-17 02:39:37.363659','2024-05-17 02:39:37.363659',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','08826 서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(185,'2024-05-17 02:51:39.503803','2024-05-17 02:51:39.503803',NULL,'','','','','010.2763.8342','SSAFY cial','','minju.kim98@kakao.com','','',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/5f9c9cd2-b2ff-45c4-8c5b-0f9b04766d4f.jpg','FRONT'),(186,'2024-05-17 02:54:33.962171','2024-05-17 02:54:33.962171',NULL,'','','','','010.2763.8342','SSAFY cial','','minju.kim98@kakao.com','','',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4851e837-88b3-4fd2-b0b8-2966fee506fb.jpg','FRONT'),(187,'2024-05-17 05:05:07.422357','2024-05-17 05:05:07.422357',NULL,'경영지원본부','','','027593782','01027843595','포스코 인터내셔널','','koreanplus@poscointl.com','차장','',NULL,'이승호','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/6ef26103-cc7e-43e2-a016-b61e0683620a.jpg','FRONT'),(188,'2024-05-17 05:19:57.857354','2024-05-17 05:19:57.857354',NULL,'경영지원본부','','','027593782','01027843595','포스코 인터내셔널','','koreanplus@poscointl.com','차장','',NULL,'이승호','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/f23efcc8-21b5-4454-87f4-b5bdb739cae8.jpg','FRONT'),(189,'2024-05-17 05:20:13.317347','2024-05-17 05:20:13.317347',NULL,'경영지원본부','','','027593782','01027843595','포스코 인터내셔널','','koreanplus@poscointl.com','차장','',NULL,'이승호','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/f23efcc8-21b5-4454-87f4-b5bdb739cae8.jpg','FRONT'),(192,'2024-05-17 07:00:31.810624','2024-05-17 07:00:31.810624',NULL,'솔루션 사업부문','025314600','','025314036(직통)','01086005926','한국마이크로소프트','https://www.microsoft.com/ko-kr','siyeonk@microsoft.com','매니저','서울특별시 종로구 종로1길 50 더케이트윈타워 A동 12층우03142',NULL,'김시연','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/a6cdde0a-5595-42ac-bbed-760e9905fc55.jpg','FRONT'),(193,'2024-05-17 07:00:45.618904','2024-05-17 07:00:45.618904',NULL,'경영지원본부/인프라지원실 정보시스템그룹','plus@poscointl.com','','027593782','01027843595','POSCO','','korean','차장','인천광역시 연수구 컨벤시아대로 165',NULL,'이승목','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/76f7a040-1917-4060-9bed-a3cba19383e2.jpg','FRONT'),(194,'2024-05-17 07:01:01.826347','2024-05-17 07:01:01.826347',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/eba03907-1966-4f49-991f-91fdac035e71.jpg','FRONT'),(195,'2024-05-17 07:02:02.522882','2024-05-17 07:02:02.522882',NULL,'경영지원본부','','','027593782','01027843595','포스코 인터내셔널','','koreanplus@poscointl.com','차장','',NULL,'이승호','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/501817e4-ce72-4704-8a55-d0c0fe9bbea1.jpg','FRONT'),(196,'2024-05-17 07:02:21.481340','2024-05-17 07:02:21.481340',NULL,'경영지원본부/인프라지원실 정보시스템그룹','plus@poscointl.com','','027593782','01027843595','POSCO','','korean','차장','인천광역시 연수구 컨벤시아대로 165',NULL,'이승목','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/0d871013-e2ab-44d7-9c71-4fe2ee0f0385.jpg','FRONT'),(197,'2024-05-17 07:02:38.613620','2024-05-17 07:02:38.613620',NULL,'','+6562121237','','+6562121137','+65 6212 1000 or','Bloomberge. Ltd.','bloomberg.com','adrianchua@bloomberg.net','Singapore Pt','23 Church Street, 12/F Capital Square Singapore049481',NULL,'Adrian Chua','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d9cc730b-826e-46e7-8f51-4c533c5f5124.jpg','FRONT'),(198,'2024-05-17 07:03:06.050283','2024-05-17 07:03:06.050283',NULL,'Corporate Management Group','','','8227593782','821027843595','Oith POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon, Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/2aa34b72-db94-4bdc-b54d-386dda3ca05f.jpg','FRONT'),(199,'2024-05-17 07:04:08.814344','2024-05-17 07:04:08.814344',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/3f6a3003-5b34-4a06-840e-f63e29cc389d.jpg','FRONT'),(200,'2024-05-17 07:55:48.836804','2024-05-17 07:55:48.836804',NULL,'','','','010.2763.8342','010.2763.8342','SSAFY cial','','minju.kim98@kakao.com','','',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4a4457a8-509b-4943-87c3-ea9b4a9f71f2.jpg','FRONT'),(201,'2024-05-17 07:55:57.025754','2024-05-17 07:55:57.025754',NULL,'','','','010.2763.8342','010.2763.8342','SSAFY cial','','minju.kim98@kakao.com','','',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4a4457a8-509b-4943-87c3-ea9b4a9f71f2.jpg','FRONT'),(202,'2024-05-17 07:56:50.318647','2024-05-17 07:56:50.318647',NULL,'','','','010.2763.8342','010.2763.8342','SSAFY cial','','minju.kim98@kakao.com','','',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d20004ec-b4de-4216-8572-db7af6254882.jpg','FRONT'),(203,'2024-05-17 07:56:56.582287','2024-05-17 07:56:56.582287',NULL,'','','','010.2763.8342','010.2763.8342','SSAFY cial','','minju.kim98@kakao.com','','',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d20004ec-b4de-4216-8572-db7af6254882.jpg','FRONT'),(206,'2024-05-18 12:27:34.459230','2024-05-18 12:29:23.838278',NULL,'이천DRAM Middle Etch기술','',NULL,'031-5185-54352','010-9926-8962','SK 하이닉스','www.skhynix.com','yongjun.ahn@sk.com','사원','경기도 이천시 부발읍 경충대로 209',NULL,'안용준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/bc22c477-0de9-473c-bea8-c09e12eed121.jpg','FRONT'),(207,'2024-05-18 12:32:40.992114','2024-05-18 12:33:21.378060',NULL,'','05040252233',NULL,'0220513958','01051712233','오렌지라이프생명보험(주)','','mjcrow@naver.com','Financial Consultant','서울특별시 강남구 테헤란로318 (역삼동,오렌지타워)16층',NULL,'김인재','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4ee05a49-1684-4a28-9826-cbee21437d17.jpg','FRONT'),(208,'2024-05-18 12:34:05.319402','2024-05-18 12:35:13.895273',NULL,'중앙집행위원회','',NULL,'','+821028738342','서울대학교 총학생회','we.snu.ac.kr','ducco705@snu.ac.kr','사무행정국원/교육자치국원','서울특별시관악구 관악로1,서울대학교 63동 436호',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/e6c3c627-b8b5-436a-bfc3-e1d7eface2f2.jpg','FRONT'),(209,'2024-05-18 12:36:39.636605','2024-05-18 12:37:22.853709',NULL,'대기환경측정실','031-407-2086',NULL,'031-407-2084','010-2693-8342','한국 EHS 연구소','www.kehs.kr','yjh19750@naver.com','과장','경기도 안산시 광덕1로 312 3층',NULL,'김경열','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/937e923d-8b2f-4915-9f96-ae6c1eaf9fcc.jpg','FRONT'),(210,'2024-05-18 12:38:37.120865','2024-05-18 12:39:20.749294',NULL,'BioMedical AI Development Team','',NULL,'','+821090448465','SK telecom','','ajy8456@sktelecom.com','Manager','',NULL,'Jiyong Ahn','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/839a4c9e-ce98-4ed0-801f-b4860f5912ec.jpg','FRONT'),(211,'2024-05-18 12:40:07.252149','2024-05-18 12:40:41.511264',NULL,'SSAFY개발운영그룹','',NULL,'','010.9632.1144','(주) 멀티캠퍼스','','hyunbum.oh@multicampus.com','Senior Professional','광주광역시 광산구 하남산단6번로 107, 삼성전자그린시티2캠퍼스 GTC동 2층',NULL,'오현범','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/15817907-07a7-4296-8de3-ed1613d85c64.jpg','FRONT'),(212,'2024-05-18 12:41:39.748522','2024-05-18 12:42:54.109711',NULL,'','8228807423',NULL,'8228807428','821023070369','COLLEGE OF ENGINEERING SEOUL NATIONAL UNIVERSITY','','dyshin@snu.ac.kr','Office of Information & Computing center','1 Gwanak-ro Gwanak-gu Seoul',NULL,'Shin, Daeyong','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/c6bbec39-1558-4724-b94d-d8d1bd35681d.jpg','FRONT'),(215,'2024-05-18 13:05:23.606073','2024-05-18 13:09:57.366599',NULL,'이천DRAM Middle Etch기술','','장비정비','031-5185-54352','010-9926-8962','SK 하이닉스','www.skhynix.com','yongjun.ahn@sk.com','사원','경기도 이천시 부발읍 경충대로 209',NULL,'안용준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/87f9aca2-553a-46d2-8683-a969101b042b.jpg','FRONT'),(216,'2024-05-18 13:05:48.819604','2024-05-18 13:11:35.296858',NULL,'','0504 025 2233','Financial Consultant / 반포지점','02 2051 3958','010 5171 2233','오렌지라이프생명보험(주)','','mjcrow@naver.com','Lions Club, 증권/펀드투자권유','서울특별시 강남구 테헤란로 318 (역삼동, 오렌지타워) 16층',NULL,'김인재','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/31e38d7a-e50a-4c72-92ee-3ec08917857b.jpg','FRONT'),(217,'2024-05-18 13:06:29.257033','2024-05-18 13:12:53.322358',NULL,'중앙집행위원회','','','','+82 10 2873 8342','서울대학교 총학생회','www.we.snu.ac.kr','ducco705@snu.ac.kr','사무행정국원/교육자치국원','서울특별시 관악구 관악로 1, 서울대학교 63동 436호(총학생회실)',NULL,'김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/ae0ed022-8910-43e8-999c-fec482e5cda9.jpg','FRONT'),(218,'2024-05-18 13:07:08.163658','2024-05-18 13:13:30.220841',NULL,'대기환경측정실','031-407-2086','','031-407-2084','010-2693-8342','한국 EHS 연구소','www.kehs.kr','yjh19750@naver.com','과장','경기도 안산시 광덕1로 312 3층',NULL,'김 경 열','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/82716ac8-e682-4131-a0c1-778867c0864b.jpg','FRONT'),(219,'2024-05-18 13:07:32.483772','2024-05-18 13:14:15.184744',NULL,'BioMedical AI Development Team','','','','+82 10 9044 8465','SK telecom','','aiy8456@sktelecom.com','Manager','',NULL,'Jiyong Ahn','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/618f48c6-8365-49df-bb9c-710437459c96.jpg','FRONT'),(220,'2024-05-18 13:07:50.236905','2024-05-18 13:14:54.277740',NULL,'IT사업부문','','','','010-8844-1363','CJ 올리브네트웍스','','lmg2738@ontlee.com','','서울시 종로구 종로6 광화문우체국 스타트업빌리지(인큐베이팅센터),5층',NULL,'이민규','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/6c5ecc70-165a-4877-8fa0-9bd03eb7057a.jpg','FRONT'),(221,'2024-05-18 13:08:10.384493','2024-05-18 13:15:28.764662',NULL,'','041.542.5745','','1899-5204','010.2693.8342','(주)신성생명환경연구원','http://www.shin-sung.kr','ducc0705@naver.com','이사','충남 당진시 서해로 6163-36',NULL,'김경열','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/f58291f9-3a42-4356-a572-9ad6322b6b55.jpg','FRONT'),(222,'2024-05-18 13:08:25.197194','2024-05-18 13:15:48.362477',NULL,'SSAFY개발운영그룹 SSAFY 교육장','','','','010.9632.1144','(주) 멀티캠퍼스','','hyunbum.oh@multicamous.com','Senior Professional','광주광역시 광산구 하남산단6번로 107',NULL,'오현범','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/73ce43cc-8598-438f-a57c-0d9cebcc9f6a.jpg','FRONT'),(223,'2024-05-18 13:08:44.525313','2024-05-18 13:08:44.525313',NULL,'','8228807423','','8228807428','821023070369','GINEING','','drshin@snuackr','ENER','1Gwanak-ro Gwanak-gu Seoul08826 Korea',NULL,'Shin, Daeyong','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/45a2817f-1ea3-4eb1-93b0-3262c1da75e3.jpg','FRONT'),(224,'2024-05-18 13:18:53.787573','2024-05-18 13:19:21.795559',NULL,'','','','','010-4137-1131','SSAFY','','junwon1131@naver.com','백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'정준원','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/20031613-698f-4011-a65e-6ff5c4983f7e.jpg','FRONT'),(225,'2024-05-18 13:21:34.109865','2024-05-18 13:21:51.373816',NULL,'','062-123-4568','','062-123-4567','010-4151-7264','SSAFY','','xogns5@naver.com','팀장 / 백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'김태훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/9ec68695-1bab-4f50-9124-0d2aa86dcab3.jpg','FRONT'),(226,'2024-05-18 13:22:55.768625','2024-05-18 13:23:22.567470',NULL,'포인트','','','','010.4047.7616','SSAFY','','bwook4232@hotmail.com','프론트앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'유병욱','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/1df013c9-ccd3-4cde-9404-51a5b52d548a.jpg','FRONT'),(227,'2024-05-18 13:24:47.879608','2024-05-18 13:24:47.879608',NULL,'','','','','','감주과덕시합산구하남산단속신문1월','','','백앤드개발자','',NULL,'강대수','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/b27da3f4-51a4-4087-83ae-6013d4b21d5d.jpg','FRONT'),(228,'2024-05-18 14:25:32.145582','2024-05-18 14:25:32.145582',NULL,'포인트','','','','010.4047.7616','SSAFY','','bwook4232@hotmail.com','프론트앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'유병욱','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/1df013c9-ccd3-4cde-9404-51a5b52d548a.jpg','FRONT'),(229,'2024-05-18 14:25:32.148483','2024-05-18 14:25:32.148483',NULL,'','062-123-4568','','062-123-4567','010-4151-7264','SSAFY','','xogns5@naver.com','팀장 / 백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'김태훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/9ec68695-1bab-4f50-9124-0d2aa86dcab3.jpg','FRONT'),(233,'2024-05-18 17:29:47.369449','2024-05-18 17:29:47.369449',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(234,'2024-05-18 17:30:58.707905','2024-05-18 17:30:58.707905',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(235,'2024-05-18 17:31:10.037134','2024-05-18 17:31:10.037134',NULL,'경영지원본부/인프라지원실정보시스템그룹','plus@poscointl.com',NULL,'02 759 3782','01027843595','POSCO','','korean','차장','인천광역시 연수구 컨벤시아대로165',NULL,'이승목','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/88d73020-b7fe-4d48-8c2b-1d343da1a22d.jpg','FRONT'),(236,'2024-05-18 17:31:19.884782','2024-05-18 17:32:05.201855',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(237,'2024-05-18 17:31:31.267221','2024-05-18 17:31:49.309098',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(238,'2024-05-18 17:34:24.383341','2024-05-18 17:34:24.383341',NULL,'','0505.178.5315','','02.6023.9594','02.6023.9594','신한금융그룹','','jaeyounjo@shinhan.com','행원','서울특별시 관악구 관악로1 (신림동, 서울대학교 학생회관 1층)',NULL,'조제윤','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/4115c17a-0649-4d71-a5ee-f2f4b2713015.jpg','FRONT'),(239,'2024-05-18 17:34:24.402476','2024-05-18 17:34:24.402476',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(240,'2024-05-18 17:34:24.437000','2024-05-18 17:34:24.437000',NULL,'경영지원본부/인프라지원실정보시스템그룹','plus@poscointl.com',NULL,'02 759 3782','01027843595','POSCO','','korean','차장','인천광역시 연수구 컨벤시아대로165',NULL,'이승목','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/88d73020-b7fe-4d48-8c2b-1d343da1a22d.jpg','FRONT'),(241,'2024-05-18 17:34:24.454513','2024-05-18 17:34:24.454513',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(242,'2024-05-18 17:34:24.468946','2024-05-18 17:34:24.468946',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(245,'2024-05-18 18:06:31.834566','2024-05-18 18:06:31.834566',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(246,'2024-05-18 18:09:38.134795','2024-05-18 18:09:38.134795',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/7d96a00b-da77-41fc-b4e6-9f647c6ec0cc.jpg','FRONT'),(247,'2024-05-18 18:11:16.924141','2024-05-18 18:11:16.924141',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/7d96a00b-da77-41fc-b4e6-9f647c6ec0cc.jpg','FRONT'),(248,'2024-05-18 18:11:16.942439','2024-05-18 18:11:16.942439',NULL,'','','','','010-4137-1131','SSAFY','','junwon1131@naver.com','백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'정준원','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/20031613-698f-4011-a65e-6ff5c4983f7e.jpg','FRONT'),(249,'2024-05-18 18:13:54.928177','2024-05-18 18:13:54.928177',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(250,'2024-05-18 18:13:55.091622','2024-05-18 18:13:55.091622',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(251,'2024-05-18 18:14:31.667394','2024-05-18 18:14:31.667394',NULL,'경영지원본부/인프라지원실정보시스템그룹','plus@poscointl.com',NULL,'02 759 3782','01027843595','POSCO','','korean','차장','인천광역시 연수구 컨벤시아대로165',NULL,'이승목','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/88d73020-b7fe-4d48-8c2b-1d343da1a22d.jpg','FRONT'),(263,'2024-05-19 07:45:32.976297','2024-05-19 07:45:35.645269',15,'',NULL,NULL,'021234 5678','01012347654','포스코인터네셔널',NULL,'gildong@poscointl.com','프론트앤드 개발자',NULL,'https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/0b917fd6-dff6-45f7-9423-22a119bcb0d9.jpg','홍길동','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/bfe38c4f-7b33-41ae-8e73-f8382d4fc552.jpg','FRONT'),(264,'2024-05-19 07:52:26.876375','2024-05-19 08:01:47.278844',15,'Dev Team',NULL,NULL,'02 123 1234','82 10 4821 1234','Posco International',NULL,'Gildong@naver.com','Leader',NULL,'https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/bf616860-2f77-4a79-a35f-ec4cc9a2126a.jpg','Hong gildong',NULL,'BACK'),(268,'2024-05-19 08:24:31.475599','2024-05-19 08:24:31.475599',NULL,'','','','021234 5678','01012347654','포스코인터네셔널','','gildong@poscointl.com','프론트앤드 개발자','',NULL,'홍길동','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/b57cb567-5987-40c2-ac1e-a26007970d51.jpg','FRONT'),(269,'2024-05-19 08:49:17.036658','2024-05-19 08:49:17.036658',NULL,'','','','021234 5678','01012347654','포스코인터네셔널','','gildong@poscointl.com','프론트앤드 개발자','',NULL,'홍길동','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/c6576f9f-5269-426a-ae8f-1d20fc524a24.jpg','FRONT'),(270,'2024-05-19 08:49:32.200581','2024-05-19 08:49:32.200581',NULL,'','','','021234 5678','01012347654','포스코인터네셔널','','gildong@poscointl.com','프론트앤드 개발자','',NULL,'홍길동','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/c6576f9f-5269-426a-ae8f-1d20fc524a24.jpg','FRONT'),(271,'2024-05-19 08:49:50.071544','2024-05-19 08:49:50.071544',NULL,'포인트팀','','','','010.4151.7264','삼성 청년 소프트웨어 아카데미','','xogns5@naver.com','팀장','광주광역시 광산구 하남산단6번로 107 삼성 청년 SW 아카데미',NULL,'김태훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/beb2ecf6-dc12-4943-9336-02c7b117f21d.jpg','FRONT'),(361,'2024-05-19 15:23:14.784885','2024-05-19 15:23:14.784885',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/69c155a2-5e10-4fe1-82ed-0078e16f3b65.jpg','FRONT'),(362,'2024-05-19 15:24:17.975525','2024-05-19 15:24:17.975525',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/69c155a2-5e10-4fe1-82ed-0078e16f3b65.jpg','FRONT'),(363,'2024-05-19 15:24:17.977915','2024-05-19 15:24:17.977915',NULL,'','','','','010-4137-1131','SSAFY','','junwon1131@naver.com','백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'정준원','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/20031613-698f-4011-a65e-6ff5c4983f7e.jpg','FRONT'),(364,'2024-05-19 15:25:27.916251','2024-05-19 15:25:27.916251',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(365,'2024-05-19 15:25:27.928098','2024-05-19 15:25:27.928098',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(366,'2024-05-19 15:25:58.521342','2024-05-19 15:25:58.521342',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(372,'2024-05-19 15:49:41.052424','2024-05-19 15:49:41.052424',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/2c805db3-eeb8-4413-868d-2ee25b609677.jpg','FRONT'),(373,'2024-05-19 15:51:04.331266','2024-05-19 15:51:04.331266',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/2c805db3-eeb8-4413-868d-2ee25b609677.jpg','FRONT'),(374,'2024-05-19 15:51:04.333516','2024-05-19 15:51:04.333516',NULL,'','','','','010-4137-1131','SSAFY','','junwon1131@naver.com','백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'정준원','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/20031613-698f-4011-a65e-6ff5c4983f7e.jpg','FRONT'),(375,'2024-05-19 15:52:20.986479','2024-05-19 15:52:20.986479',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(376,'2024-05-19 15:52:21.099837','2024-05-19 15:52:21.099837',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(377,'2024-05-19 15:52:58.874542','2024-05-19 15:52:58.874542',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(387,'2024-05-19 17:06:32.595030','2024-05-19 17:06:32.595030',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/ab3b18f5-d4cb-402d-82b5-c1825b02469b.jpg','FRONT'),(388,'2024-05-19 17:07:56.880948','2024-05-19 17:07:56.880948',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/ab3b18f5-d4cb-402d-82b5-c1825b02469b.jpg','FRONT'),(389,'2024-05-19 17:07:56.895574','2024-05-19 17:07:56.895574',NULL,'','','','','010-4137-1131','SSAFY','','junwon1131@naver.com','백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'정준원','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/20031613-698f-4011-a65e-6ff5c4983f7e.jpg','FRONT'),(390,'2024-05-19 17:09:10.852463','2024-05-19 17:09:10.852463',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(391,'2024-05-19 17:09:10.892972','2024-05-19 17:09:10.892972',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(392,'2024-05-19 17:09:48.857015','2024-05-19 17:09:48.857015',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(398,'2024-05-20 00:18:36.707633','2024-05-20 00:20:14.724734',23,'Team',NULL,NULL,'82212345678','821027638342','POSCO INTERNATIONAL',NULL,'ducco705@pescointicom','POINT',NULL,'https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/86122a89-f40e-4e65-a75f-69a6c415039c.jpg','Kim Minju','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/68753fb5-e18b-47f9-a86d-b979979af37d.jpg','FRONT'),(399,'2024-05-20 00:19:07.423706','2024-05-20 00:20:11.511903',23,'포인트팀/프론트앤드',NULL,NULL,'','01027638342','포스코인터네셔널',NULL,'ducco705@poscointi.com','개발자',NULL,'https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/04b03bff-d3b5-4bac-993d-db2136b3ecd1.jpg','김민주','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/96736279-249a-4ef9-8f40-af245365814a.jpg','BACK'),(400,'2024-05-20 00:21:29.969290','2024-05-20 00:21:29.969290',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/dde46303-cce5-4de0-9368-802267a9f4d6.jpg','FRONT'),(401,'2024-05-20 00:22:51.502323','2024-05-20 00:22:51.502323',NULL,'무역금융부 무역금융팀','','','(02)6252-3537','010-5387-5538','한국수출입은행','www.koreaexim.go.krebank-koreaexim.go kr','khjjxj@naver.com','인턴','서울시 영등포구 은행로 30',NULL,'김효준','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/dde46303-cce5-4de0-9368-802267a9f4d6.jpg','FRONT'),(402,'2024-05-20 00:22:51.521303','2024-05-20 00:22:51.521303',NULL,'','','','','010-4137-1131','SSAFY','','junwon1131@naver.com','백앤드 개발자','광주광역시 광산구 하남산단6번로 107',NULL,'정준원','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/20031613-698f-4011-a65e-6ff5c4983f7e.jpg','FRONT'),(403,'2024-05-20 00:23:59.830652','2024-05-20 00:23:59.830652',NULL,'컨설팅팀프리세일즈','0505-991-7799','','1599-4855','010-2294-8647','(주)에이프리카','www.aifrica.co.kr','jh.heo@aifrica.co.kr','사원','서울특별시 성동구 아차산로 103,1209호 (클라우드 서비스센터)',NULL,'허재훈','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/d7d653b7-0ff5-44d8-8984-b647f10db058.jpg','FRONT'),(404,'2024-05-20 00:23:59.873551','2024-05-20 00:23:59.873551',NULL,'Corporate Managernent Group','','','8227593782','821027843595','POSCO INTERNATIONAL','','koreanpius@poscointl.com','Senior Manager','165, Convensia-daero, Yeonsu-gu, Incheon Korea',NULL,'Mok','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/be2ab893-e8fe-4ea6-872e-2f2108056064.jpg','FRONT'),(405,'2024-05-20 00:24:36.782829','2024-05-20 00:24:36.782829',NULL,'','070-4015-3929','','070-4680-6090','010-2017-3318','(주)레인보우브레인','','jh.kim@rbrain.co.kr','부장','(07238) 서울시 영등포구 은행로 37,4층(여의도동, 기계산업진흥회 본관)',NULL,'김정희','https://ssafybizcard.s3.ap-northeast-2.amazonaws.com/98c1902e-f5d1-444a-80a1-081e969262dc.jpg','FRONT'),(406,'2024-05-20 00:24:58.467208','2024-05-20 00:24:58.467208',NULL,'삼성 청년 sw아카데미 기자단',NULL,'',NULL,'010-2763-8342','SSAFY cial','','minju.kim98@kakao.com',NULL,' ',NULL,'김민주','','FRONT'),(407,'2024-05-20 00:24:58.484195','2024-05-20 00:24:58.484195',NULL,'환지팀','063-224-0147','','063-224-0146','010-8389-3697','바른도시','','kials1@naver.com','사원','전주시 완산구 홍산북로 59-11 주상빌딩, 5층 501호',NULL,'이승호','','FRONT');
/*!40000 ALTER TABLE `businesscard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filter`
--

DROP TABLE IF EXISTS `filter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filter` (
  `filter_id` bigint NOT NULL AUTO_INCREMENT,
  `filter_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`filter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filter`
--

LOCK TABLES `filter` WRITE;
/*!40000 ALTER TABLE `filter` DISABLE KEYS */;
INSERT INTO `filter` VALUES (2,'광주'),(3,'1반'),(4,'S208'),(5,'1반');
/*!40000 ALTER TABLE `filter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_album`
--

DROP TABLE IF EXISTS `private_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_album` (
  `favorite` bit(1) NOT NULL,
  `card_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `private_album_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `memo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`private_album_id`),
  KEY `FK4hypglap45g4johkx3pe6wvoj` (`card_id`),
  KEY `FK6gfw4iwd4hrat59k6cqvf5hfc` (`user_id`),
  CONSTRAINT `FK4hypglap45g4johkx3pe6wvoj` FOREIGN KEY (`card_id`) REFERENCES `businesscard` (`card_id`),
  CONSTRAINT `FK6gfw4iwd4hrat59k6cqvf5hfc` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_album`
--

LOCK TABLES `private_album` WRITE;
/*!40000 ALTER TABLE `private_album` DISABLE KEYS */;
INSERT INTO `private_album` VALUES (_binary '\0',215,'2024-05-18 13:05:23.609543',100,'2024-05-18 13:05:23.609543',23,NULL),(_binary '\0',216,'2024-05-18 13:05:48.821622',101,'2024-05-18 13:05:48.821622',23,NULL),(_binary '\0',217,'2024-05-18 13:06:29.258991',102,'2024-05-18 13:06:29.258991',23,NULL),(_binary '\0',218,'2024-05-18 13:07:08.165565',103,'2024-05-18 13:07:08.165565',23,NULL),(_binary '\0',219,'2024-05-18 13:07:32.507834',104,'2024-05-18 13:07:32.507834',23,NULL),(_binary '\0',220,'2024-05-18 13:07:50.238931',105,'2024-05-18 13:07:50.238931',23,NULL),(_binary '\0',221,'2024-05-18 13:08:10.390579',106,'2024-05-18 13:08:10.390579',23,NULL),(_binary '\0',222,'2024-05-18 13:08:25.231426',107,'2024-05-18 13:08:25.231426',23,NULL),(_binary '\0',223,'2024-05-18 13:08:44.559879',108,'2024-05-18 13:08:44.559879',23,NULL),(_binary '\0',224,'2024-05-18 13:18:53.822490',109,'2024-05-18 13:18:53.822490',23,NULL),(_binary '\0',400,'2024-05-20 00:21:29.970826',207,'2024-05-20 00:21:29.970826',23,NULL),(_binary '\0',403,'2024-05-20 00:23:59.866686',208,'2024-05-20 00:23:59.866686',23,NULL),(_binary '\0',404,'2024-05-20 00:23:59.884779',209,'2024-05-20 00:23:59.884779',23,NULL),(_binary '\0',405,'2024-05-20 00:24:36.793679',210,'2024-05-20 00:24:36.793679',23,NULL),(_binary '\0',406,'2024-05-20 00:24:58.481181',211,'2024-05-20 00:24:58.481181',23,NULL),(_binary '\0',407,'2024-05-20 00:24:58.513606',212,'2024-05-20 00:24:58.513606',23,NULL);
/*!40000 ALTER TABLE `private_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_album_member`
--

DROP TABLE IF EXISTS `private_album_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_album_member` (
  `filter_id` bigint DEFAULT NULL,
  `private_album_id` bigint DEFAULT NULL,
  `private_album_member_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`private_album_member_id`),
  KEY `FKtj7q219x8ipntd5dey1yevywg` (`filter_id`),
  KEY `FK15m1fy5bcunshohqqyupuyfe1` (`private_album_id`),
  KEY `FKlc2ycr04yd8eti64r0nk90wuf` (`user_id`),
  CONSTRAINT `FK15m1fy5bcunshohqqyupuyfe1` FOREIGN KEY (`private_album_id`) REFERENCES `private_album` (`private_album_id`),
  CONSTRAINT `FKlc2ycr04yd8eti64r0nk90wuf` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKtj7q219x8ipntd5dey1yevywg` FOREIGN KEY (`filter_id`) REFERENCES `filter` (`filter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_album_member`
--

LOCK TABLES `private_album_member` WRITE;
/*!40000 ALTER TABLE `private_album_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `private_album_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_album`
--

DROP TABLE IF EXISTS `team_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_album` (
  `team_album_id` bigint NOT NULL AUTO_INCREMENT,
  `team_owner` bigint DEFAULT NULL,
  `team_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`team_album_id`),
  KEY `FKao98oi2qe6v561pfhsv6l7eb6` (`team_owner`),
  CONSTRAINT `FKao98oi2qe6v561pfhsv6l7eb6` FOREIGN KEY (`team_owner`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_album`
--

LOCK TABLES `team_album` WRITE;
/*!40000 ALTER TABLE `team_album` DISABLE KEYS */;
INSERT INTO `team_album` VALUES (35,15,'포인트'),(53,9,'경영팀'),(55,3,'포스코'),(58,23,'개발팀'),(71,23,'ssafy');
/*!40000 ALTER TABLE `team_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_album_detail`
--

DROP TABLE IF EXISTS `team_album_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_album_detail` (
  `card_id` bigint DEFAULT NULL,
  `team_album_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `team_album_id` bigint DEFAULT NULL,
  `memo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`team_album_detail_id`),
  KEY `FK6wqvyuvf3yx0ncb8cj6dg3h4i` (`card_id`),
  KEY `FK4qfauh992n3bnh4igg8y4olxa` (`team_album_id`),
  CONSTRAINT `FK4qfauh992n3bnh4igg8y4olxa` FOREIGN KEY (`team_album_id`) REFERENCES `team_album` (`team_album_id`),
  CONSTRAINT `FK6wqvyuvf3yx0ncb8cj6dg3h4i` FOREIGN KEY (`card_id`) REFERENCES `businesscard` (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_album_detail`
--

LOCK TABLES `team_album_detail` WRITE;
/*!40000 ALTER TABLE `team_album_detail` DISABLE KEYS */;
INSERT INTO `team_album_detail` VALUES (186,75,55,NULL),(195,76,53,NULL),(196,77,53,NULL),(197,78,53,NULL),(199,80,53,NULL),(203,82,53,NULL),(228,83,58,NULL),(229,84,58,NULL),(238,85,58,NULL),(239,86,58,NULL),(240,87,58,NULL),(241,88,58,NULL),(242,89,58,NULL),(270,92,35,NULL),(401,113,58,NULL),(402,114,58,NULL);
/*!40000 ALTER TABLE `team_album_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_album_member`
--

DROP TABLE IF EXISTS `team_album_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_album_member` (
  `filter_id` bigint DEFAULT NULL,
  `team_album_detail_id` bigint DEFAULT NULL,
  `team_album_id` bigint DEFAULT NULL,
  `team_album_member_id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`team_album_member_id`),
  KEY `FKexc6tg7ievkmm7dk2ueo8euyt` (`filter_id`),
  KEY `FK7ewg8rw7n538x834xdc2wgch0` (`team_album_id`),
  KEY `FKlqphe4767jql74b90gdfxod47` (`team_album_detail_id`),
  CONSTRAINT `FK7ewg8rw7n538x834xdc2wgch0` FOREIGN KEY (`team_album_id`) REFERENCES `team_album` (`team_album_id`),
  CONSTRAINT `FKexc6tg7ievkmm7dk2ueo8euyt` FOREIGN KEY (`filter_id`) REFERENCES `filter` (`filter_id`),
  CONSTRAINT `FKlqphe4767jql74b90gdfxod47` FOREIGN KEY (`team_album_detail_id`) REFERENCES `team_album_detail` (`team_album_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_album_member`
--

LOCK TABLES `team_album_member` WRITE;
/*!40000 ALTER TABLE `team_album_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_album_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_member`
--

DROP TABLE IF EXISTS `team_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_member` (
  `team_album_id` bigint DEFAULT NULL,
  `team_member_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`team_member_id`),
  KEY `FK4gwidx1x1hh9agavmh2u08fg4` (`team_album_id`),
  KEY `FKg24qjftfifisxhilscl0vmrb1` (`user_id`),
  CONSTRAINT `FK4gwidx1x1hh9agavmh2u08fg4` FOREIGN KEY (`team_album_id`) REFERENCES `team_album` (`team_album_id`),
  CONSTRAINT `FKg24qjftfifisxhilscl0vmrb1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_member`
--

LOCK TABLES `team_member` WRITE;
/*!40000 ALTER TABLE `team_member` DISABLE KEYS */;
INSERT INTO `team_member` VALUES (53,63,9),(55,65,3),(55,66,15),(53,72,3),(53,73,15),(53,74,6),(53,77,7),(58,78,23),(58,81,6),(58,83,7),(58,87,2),(58,93,15),(71,96,23);
/*!40000 ALTER TABLE `team_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (NULL,NULL,2,'김민주','ducco705@ssafys208.onmicrosoft.com'),(NULL,NULL,3,'정 준원','junwon1131@ssafys208.onmicrosoft.com'),(NULL,NULL,6,'강 대수','sore503@ssafys208.onmicrosoft.com'),(NULL,NULL,7,'김 태훈','lpgsksss@ssafys208.onmicrosoft.com'),('2024-05-10 03:30:41.000000',NULL,9,'이 승호','kials1@ssafys208.onmicrosoft.com'),(NULL,NULL,15,'유 병욱','tls19190@ssafys208.onmicrosoft.com'),(NULL,NULL,23,'김민주','ducco705@s208point.onmicrosoft.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  9:57:16
