<?php
require_once 'config.php';

/*
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| ID       | int          | NO   | PRI | NULL    |       |
| nachname | varchar(255) | YES  |     | NULL    |       |
| vorname  | varchar(255) | YES  |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
 */

function getDatabse(){
   $db_host = "localhost";
   $db_name = "school";
   $db_user = "root";
   $db_password = "";
   try {
      $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
      return $db;
   } catch (PDOException $e){
      return e->getMessage();
   } 
 }

function insertData($data, $db){
   $sql = "INSERT INTO test (nachname, vorname) VALUES (:nachname, :vorname);";
   $stmt = $db->prepare($sql)->execute($data);

}

function response($status, $msg){
   return json_encode(['status' => $status, 'message' => $msg]);
}

if(isset($_POST['nachname']) && isset($_POST['vorname'])){
   $data = [
      'nachname' => $_POST['nachname'],
      'vorname' => $_POST['vorname']
   ];
   insertData($data, getDatabse());
   echo response("success", "Erfolgreich eingefügt!");
}





 ?>