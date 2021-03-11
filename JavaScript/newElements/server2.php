<?php
$head = ["abc","def","ghi","jkl","mno","pqr","stu","vwx"];
$numRows =  random_int ( 2 , 10 );
$numCol  =  random_int ( 2 , 8 );

$data = array();
for($r=0;$r<$numRows;$r++){
  $row = array();
  for($c=0;$c<$numCol;$c++){
      $row[$head[$c]] = random_int ( 0 , 999 );
  }
  $row = json_encode ( $row, JSON_FORCE_OBJECT );
  $daten[] = json_decode ($row);
}

if( isset($_POST["test"]) && $_POST["test"]==="5" ){
  echo json_encode ( $daten );
}
