<?php
$daten = array();

$daten[] = new User("Klaus", "x@y.de");
$daten[] = new User("Dieter", "x@y.de");
$daten[] = new User("Kevin", "x@y.de");
$daten[] = new User("Ellie", "x@y.de");
$daten[] = new User("Anna", "x@y.de");

if(isset($_POST["test"]))
    if($_POST["test"] == 5)
    echo json_encode($daten);

class User {

    public $name;
    public $email;

    public function __construct($name,$email){
        $this->name = $name;
        $this->email = $email;
      }
}
?>