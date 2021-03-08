<?php
$daten = array();
$daten[] = new User("Klaus", "x@y.de", "@klaus");
$daten[] = new User("Dieter", "x@y.de", "@dieter");
$daten[] = new User("Kevin", "x@y.de", "@kevin");
$daten[] = new User("Ellie", "x@y.de", "@ell");
$daten[] = new User("Anna", "x@y.de", "@ann");

if(isset($_POST["test"]))
    if($_POST["test"] == 5)
    echo json_encode($daten);

class User {

    public $name;
    public $email;
    public $handle;

    public function __construct($name,$email,$handle){
        $this->name = $name;
        $this->email = $email;
        $this->handle = $handle;
      }
}
?>