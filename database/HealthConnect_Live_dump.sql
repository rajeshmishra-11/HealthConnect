/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: HealthConnect_Live
-- ------------------------------------------------------
-- Server version	11.8.3-MariaDB-1+b1 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `experience` varchar(100) DEFAULT 'N/A',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `doctors` VALUES
(2,'Dr. Rao','Dermatologist','rao@hospital.com',NULL,'2026-03-28 19:58:05','N/A'),
(3,'Dr. Sharma','Neurologist','sharma@hospital.com',NULL,'2026-03-28 19:58:05','N/A'),
(7,'Dr. Kumar','Orthopedic','kumar@hospital.com',NULL,'2026-03-28 19:58:05','N/A'),
(8,'Dr. Health','General Physician','doctor@gmail.com','scrypt:32768:8:1$3s3qODF03Oq6trI0$d7ffa1bdfc2e90335c73de2ee8c4391345066e1dc9ff1202bd380696040c44377c077adc36002b80ef2c5d0c47f27948fe3e37fdf3698c9814926629d3ce4d93','2026-03-28 19:58:05','N/A'),
(10,'Aakash Modi','Emergency Medicine','aakashmodi@gmail.com','scrypt:32768:8:1$wyqLBpoaBzCIzplq$a33f306971770ec203fe2148b804202e12d5137292a3134ac02cbe3a32bc1a0ac82882b3b4f06ede3d554199181c94020ef3fcbbf91d92c310d8417353481853','2026-03-28 15:05:00','5'),
(11,'test','General Surgery','test@gmail.com','scrypt:32768:8:1$uAFm6GJLYAtYMzGL$24b094348ec83e4d98081095c17f85113ad5a24bb0bf506b63a55268653481cc2352b462b7ca2483f570f49e1d38482bcbef0e01d6bac79f6d7e7feacba758f7','2026-04-01 16:49:21','4'),
(12,'Hello','Gynecology','hello@gmail.com','scrypt:32768:8:1$FePBmGqVq4V6UUfO$92af71ca31ef4dec76e8613e6a09ea68722d155597cd3505636694854b24de85b69b2c5eb47e3d9294cb57235fe67b5b74822122219837d55bd0d16d79dd702a','2026-04-04 17:54:28','5');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `hospital_staff`
--

DROP TABLE IF EXISTS `hospital_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_staff`
--

LOCK TABLES `hospital_staff` WRITE;
/*!40000 ALTER TABLE `hospital_staff` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `hospital_staff` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `file_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `medical_records` VALUES
(1,1,'2026-03-10','Dr. Mehta','Apollo Hospital','LAB','Blood Test','High Cholesterol',NULL,'2026-03-13 13:16:26'),
(2,2,'2026-03-11','Dr. Rao','City Hospital','SCAN','Skin Scan','Dermatitis',NULL,'2026-03-13 13:16:26'),
(3,3,'2026-03-12','Dr. Sharma','AIIMS','LAB','MRI Scan','Brain Scan',NULL,'2026-03-13 13:16:26'),
(7,9,'2026-04-04','','apollo','LAB','Blood Test','','/api/uploads/6c77d8a907b5445fb47052928449cc73_Screenshot_2026-04-04_at_17-27-59_JPEG_Image_201_251_pixels.png','2026-04-04 06:28:11');
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `pharmacies`
--

DROP TABLE IF EXISTS `pharmacies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `license_no` varchar(100) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `pharmacist_in_charge` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `gst_no` varchar(50) DEFAULT NULL,
  `drug_license_no` varchar(100) DEFAULT NULL,
  `operating_hours` varchar(255) DEFAULT NULL,
  `services` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`services`)),
  `registration_date` date DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacies`
--

LOCK TABLES `pharmacies` WRITE;
/*!40000 ALTER TABLE `pharmacies` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `pharmacies` VALUES
(1,'City Medical Store','pharmacy@healthconnect.com','scrypt:32768:8:1$7MouEA0X7tXqVH79$ca7a5ce7eaf9f9cc04cf40c50218e1b07fa82663763f87d6cfeeda407990fa2b08969aa4f17422777ffe17fd52f0179caf2c71c297ce3eae39464fb059d61f39','PH-MH-2024-00451','Rajesh Kumar','Dr. Meena Sharma (Regd. No: MPC-45892)','Retail Pharmacy','Shop No. 12, Ground Floor, Sunrise Complex, MG Road, Pune - 411001','Pune','Maharashtra','411001','+91 20 2567 8901','+91 98765 43210','www.citymedicalstore.in','27AABCU9603R1ZM','MH-20B-123456 / MH-21B-654321','Mon-Sat: 8:00 AM - 10:00 PM | Sun: 9:00 AM - 2:00 PM','[\"Prescription Dispensing\", \"OTC Medicines\", \"Health Supplies\", \"Home Delivery\", \"Digital RX Verification\"]','2018-06-15',4.8,NULL),
(2,'Nano','aakashmodi@gmail.com','scrypt:32768:8:1$QKmXP0uRfcX2PV4W$45fa77587448fd93fcd3bce0f047d2830f5b092af2f4d054cc067d4e9e2681c870ce583a3c58bca8e102634e98652a0737917ff17371e1c8aaf73b61350d9f93','PH-1','Aakash',NULL,NULL,'Gangtok','Gangtok',NULL,NULL,'1234567891',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-03-28 15:20:07');
/*!40000 ALTER TABLE `pharmacies` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `rx_code` varchar(20) NOT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `medicines` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`medicines`)),
  `pharmacy_note` text DEFAULT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `file_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `doctor_id` int(11) DEFAULT NULL,
  `dispensed_at` datetime DEFAULT NULL,
  `dispensed_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rx_code` (`rx_code`),
  KEY `patient_id` (`patient_id`),
  KEY `fk_doctor` (`doctor_id`),
  KEY `fk_dispensed_by` (`dispensed_by`),
  CONSTRAINT `fk_dispensed_by` FOREIGN KEY (`dispensed_by`) REFERENCES `pharmacies` (`id`),
  CONSTRAINT `fk_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `prescriptions` VALUES
(2,1,'RX1001',NULL,NULL,'2026-03-15',NULL,NULL,'pending','[{\"name\": \"Paracetamol\", \"dosage\": \"500mg\"}]',NULL,NULL,NULL,'2026-03-13 13:48:50',2,NULL,NULL),
(3,4,'RXG3CUDS','Dr. Health','HealthConnect Clinic','2026-03-21',NULL,'General Consultation','dispensed','[{\"name\": \"aa\", \"dosage\": \"1-0-1\", \"duration\": \"5\", \"instructions\": \"sadasd\"}]',NULL,'TXN652VA25R',NULL,'2026-03-21 10:04:55',8,'2026-03-21 16:25:03',1),
(4,4,'RXO3Q3BO','Dr. Health','HealthConnect Clinic','2026-03-21',NULL,'General Consultation','pending','[{\"name\": \"aaa\", \"dosage\": \"0-1-1\", \"duration\": \"3\", \"instructions\": \"wqead\"}]',NULL,NULL,NULL,'2026-03-21 10:11:17',8,NULL,NULL),
(5,4,'RXA3G1WQ','Dr. Health','HealthConnect Clinic','2026-03-22',NULL,'General Consultation','dispensed','[{\"name\": \"test\", \"dosage\": \"1-1-1\", \"duration\": \"5\", \"instructions\": \"nanoqqqqq\"}]',NULL,'TXNGJ5JJ9DM',NULL,'2026-03-22 07:07:40',8,'2026-03-22 12:39:01',1),
(6,5,'RXBFUX4Y','Dr. Health','HealthConnect Clinic','2026-03-22',NULL,'sakdas','dispensed','[{\"name\": \"shada\", \"dosage\": \"1-1-1\", \"duration\": \"7\", \"instructions\": \"shdkjashd\"}]',NULL,'TXNJEX018SL',NULL,'2026-03-22 07:10:42',8,'2026-03-22 12:41:07',1),
(7,4,'RX7GAFYH','Dr. Health','HealthConnect Clinic','2026-03-22',NULL,'askjdasjhd','pending','[{\"name\": \"asdjh\", \"dosage\": \"1-1-1\", \"duration\": \"7\", \"instructions\": \"sakdha\"}]',NULL,NULL,NULL,'2026-03-22 07:38:09',8,NULL,NULL),
(8,4,'RXLOUKBB','Aakash Modi','HealthConnect Clinic','2026-03-28',NULL,'General Consultation','dispensed','[{\"name\": \"Paracetamol 500mg\", \"dosage\": \"1-0-1\", \"duration\": \"5\", \"instructions\": \"after food\"}]',NULL,'TXND2HECMTP',NULL,'2026-03-28 09:48:17',10,'2026-03-28 15:21:19',2),
(9,6,'UP-268F274E','Dr Shayam ','Nhpc','2026-04-17',NULL,'','uploaded',NULL,NULL,NULL,'/api/uploads/698327fd59414d1583c9e1e176e171ef_IMG_20260401_110539.jpg','2026-04-01 11:20:19',NULL,NULL,NULL),
(10,7,'RXL29O95','test','HealthConnect Clinic','2026-04-01',NULL,'General Consultation','dispensed','[{\"name\": \"Paracetamol 500mg\", \"dosage\": \"1-0-1\", \"duration\": \"5\", \"instructions\": \"Proper sleep take\"}]',NULL,'TXNUFA1EO17',NULL,'2026-04-01 12:34:47',11,'2026-04-01 18:22:25',2),
(11,8,'RX59QXB6','test','HealthConnect Clinic','2026-04-01',NULL,'General Consultation','dispensed','[{\"name\": \"Acyclovir 400mg\", \"dosage\": \"1-0-1\", \"duration\": \"7\", \"instructions\": \"avoid soft drinks\"}]',NULL,'TXNPBTZAU7K',NULL,'2026-04-01 12:45:52',11,'2026-04-01 18:18:50',2),
(12,5,'RXDZQ9Y0','Aakash Modi','HealthConnect Clinic','2026-04-04',NULL,'test','dispensed','[{\"name\": \"Acyclovir 400mg\", \"dosage\": \"1-0-1\", \"duration\": \"8\", \"instructions\": \"test\"}]',NULL,'TXN6RVHISTX',NULL,'2026-04-04 02:18:46',10,'2026-04-04 07:48:58',1),
(13,5,'RXI0NYP4','test','HealthConnect Clinic','2026-04-04',NULL,'General Consultation','pending','[{\"name\": \"Adderall 10mg\", \"dosage\": \"1-0-1\", \"duration\": \"5\", \"instructions\": \"test\"}]',NULL,NULL,NULL,'2026-04-04 05:00:16',11,NULL,NULL),
(14,9,'RXM0XDM9','test','HealthConnect Clinic','2026-04-04',NULL,'General Consultation','pending','[{\"name\": \"Paracetamol 500mg\", \"dosage\": \"1-0-1\", \"duration\": \"5\", \"instructions\": \"\"}]',NULL,NULL,NULL,'2026-04-04 06:31:08',11,NULL,NULL),
(15,9,'RXB6MUA7','test','HealthConnect Clinic','2026-04-04',NULL,'General Consultation','dispensed','[{\"name\": \"parammm\", \"dosage\": \"1-0-1\", \"duration\": \"6\", \"instructions\": \"na\"}]',NULL,'TXNUS18SI7N',NULL,'2026-04-04 11:51:28',11,'2026-04-04 17:22:49',1),
(16,9,'RXGZYREV','test','HealthConnect Clinic','2026-04-04',NULL,'General Consultation','pending','[{\"name\": \"Acyclovir 400mg\", \"dosage\": \"1-1-1-1\", \"duration\": \"3\", \"instructions\": \"\"}]',NULL,NULL,NULL,'2026-04-04 15:41:23',11,NULL,NULL);
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `system_activities`
--

DROP TABLE IF EXISTS `system_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `avatar` varchar(10) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_activities`
--

LOCK TABLES `system_activities` WRITE;
/*!40000 ALTER TABLE `system_activities` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `system_activities` VALUES
(1,'Admin','registered Dr. Aakash Modi','AD','2026-03-28 14:28:52'),
(2,'Admin','removed Dr. Aakash Modi from the network','AD','2026-03-28 15:04:40'),
(3,'Admin','registered Dr. Aakash Modi','AD','2026-03-28 15:05:00'),
(4,'Admin','onboarded Nano','AD','2026-03-28 15:20:07'),
(5,'Admin','registered Dr. test','AD','2026-04-01 16:49:21'),
(6,'Admin','registered Dr. Hello','AD','2026-04-04 17:54:28');
/*!40000 ALTER TABLE `system_activities` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `govt_id` varchar(50) DEFAULT NULL,
  `health_id` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `emergency_contact` text DEFAULT NULL,
  `allergies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`allergies`)),
  `chronic_conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`chronic_conditions`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `health_id` (`health_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,'Rahul Sharma','rahul@gmail.com','hash123','9876543210',NULL,NULL,'O+',NULL,'HID-1001',NULL,'Delhi','Delhi',NULL,NULL,NULL,NULL,'2026-03-13 13:14:06'),
(2,'Anita Verma','anita@gmail.com','hash456','9876543211',NULL,NULL,'A+',NULL,'HID-1002',NULL,'Mumbai','Maharashtra',NULL,NULL,NULL,NULL,'2026-03-13 13:14:06'),
(3,'Vikram Singh','vikram@gmail.com','hash789','9876543212',NULL,NULL,'B+',NULL,'HID-1003',NULL,'Bangalore','Karnataka',NULL,NULL,NULL,NULL,'2026-03-13 13:14:06'),
(4,'Aakash Modi','aakashmodi150@gmail.com','scrypt:32768:8:1$nFSegKgvtdQWmQJ5$16339f91b6aa6e9ac3c4528d0fe8c96aea6c3c82b9770f12fbdecf56d3a93eb7d32c97ab8c7e88c9bd904f096cf5927ef223a12fc98c8e44089bcb61ae0b4413','7811950838','2005-11-11','Male','A+','11111111111111','HID-QTYB-VUL5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-03-21 09:36:09'),
(5,'Nano','aakashmodi@gmail.com','scrypt:32768:8:1$U0KgIfwWsMKUhVeU$30569eca064866635f6df6a7d2753c53f4389c0ce66b14af709f9f2db1fe5f5ab0dd1d243607ac9f4d3df06dc27702cf8511fbdb88f895fe1e4da491a229b2c4','1234567891','2000-11-11','Male','A+','111111111122222','HID-RSL9-WSAX',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-03-22 07:04:31'),
(6,'Ankit ','ankitsingh805184@gmail.com','scrypt:32768:8:1$hBVqxpu7Rix1NFbX$286e25a852ac3e5b0e0d6ac8c291dff2274a6466f984837cd1f5ebcb67ec43dc568f1eb0005bd83e27c1f4a2d0a93a5e9a05ddbb88eec064db46ab9bacc52b56','+919523235948','1999-04-22','Male','B+','123456789012','HID-558G-8B6P',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-04-01 11:18:26'),
(7,'Abhishek Jha','ajha43965@gmail.com','scrypt:32768:8:1$ZE6gFPG4dtKV22Mf$3874b9bcaf7d2609aa8f0797b6f10ffab13d617616e3bafef7d2db415ef3a3b5fea71e0ea78609c08cb141763bb3d2ecf05aac3ebf08c74b0664668326fff964','9310326510','2004-09-18','Male','O+','302272198108','HID-BXS6-7VMR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-04-01 12:28:49'),
(8,'Abhishek kumar ','smartboy8539@gmail.com','scrypt:32768:8:1$fVQmiRtxWAcnxAKB$042b4a3d3d015459a5d53700c0371c21e6bcc068eaa4ef247e04f859e9fa1c8b95e0ed279a522ee23a0ad1d700663cc6e053ac812518c63fcc7370dc2c9f6d03','7970901189','2005-01-01','Male','O+','5850331021000','HID-E3FM-MKGT','Harser, Jagannathpur,biraul','Darbhanga','Bihar','848209','','[]','[]','2026-04-01 12:41:42'),
(9,'Aakash Modi','aakashmodi1@gmail.com','scrypt:32768:8:1$tYBGQdLZli83SEYK$e95d0148f2dc16d90c27dc2453b5b77f97ae44222c12311d550dac76dd6e0ceb913f0d91ad27ba8169ad0f27ed5f90a7c175abb4564c2320b161d30417542808','7811950838','2005-11-18','Male','AB+','123456789123','HID-GXCQ-S8M6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-04-04 06:25:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `visit_type` varchar(50) DEFAULT 'Follow-up',
  `status` varchar(50) DEFAULT 'Waiting',
  `blood_pressure` varchar(50) DEFAULT NULL,
  `temperature` varchar(50) DEFAULT NULL,
  `pulse` varchar(50) DEFAULT NULL,
  `weight` varchar(50) DEFAULT NULL,
  `spo2` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `visits` VALUES
(1,1,'Dr. Mehta','Apollo Hospital','2026-03-15','10:30:00','Chest Pain','2026-03-13 13:15:37','Follow-up','Waiting',NULL,NULL,NULL,NULL,NULL),
(2,2,'Dr. Rao','City Hospital','2026-03-16','11:00:00','Skin Allergy','2026-03-13 13:15:37','Follow-up','Waiting',NULL,NULL,NULL,NULL,NULL),
(3,3,'Dr. Sharma','AIIMS','2026-03-17','09:45:00','Migraine','2026-03-13 13:15:37','Follow-up','Waiting',NULL,NULL,NULL,NULL,NULL),
(4,4,'Dr. Health','HealthConnect Clinic','2026-03-21','15:33:58','shkadh','2026-03-21 10:03:58','General Checkup','Completed','88','88','77','72','77'),
(5,5,'Dr. Health','HealthConnect Clinic','2026-03-22','12:39:56','a1qe','2026-03-22 07:09:56','General Checkup','Completed',NULL,NULL,NULL,NULL,NULL),
(6,7,'test','HealthConnect Clinic','2026-04-01','18:01:58','NA','2026-04-01 12:31:58','General Checkup','Completed',NULL,NULL,NULL,NULL,NULL),
(7,9,'test','HealthConnect Clinic','2026-04-04','12:00:06','NA','2026-04-04 06:30:06','General Checkup','Completed',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-04-05  3:03:53
