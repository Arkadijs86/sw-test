<?php
class Database
{
   var $host="localhost";
   var $user="root";
   var $pass="";
   var $db="reactjscrud";
    public function connect()
    {
        $con=mysqli_connect($this->host,$this->user,$this->pass,$this->db
        );
        return $con;
    }
    public function saveRecords($sk,$n,$p,$s,$m)
    {
        $conn=$this->connect();
        $sql = "INSERT INTO products (sku,name,price,size,measurement)
        VALUES ('$sk','$n','$p','$s','$m')";

        if ($conn->query($sql) === TRUE) {
         echo "New record created successfully";
        } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        }

$conn->close();
    }
    public function deleteRecords($request)
    {
        $conn=$this->connect();
        foreach ($request as $value) {
            $sql = "DELETE FROM products WHERE id=$value";
         
         
            if ($conn->query($sql) === TRUE) {
                echo "Deleted successfully";
               } else {
               echo "Error: " . $sql . "<br>" . $conn->error;
               }
    }

$conn->close();
    }

    public function getRecords()
    {
        $conn=$this->connect();
        $posts = [];
        $sql = "SELECT * FROM products ORDER BY id ASC";

    if($result = mysqli_query($conn,$sql))
    {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $posts[$cr]['id'] = $row['id'];
        $posts[$cr]['sku'] = $row['sku'];
        $posts[$cr]['name'] = $row['name'];
        $posts[$cr]['price'] = $row['price'];
        $posts[$cr]['size'] = $row['size'];
        $posts[$cr]['measurement'] = $row['measurement'];
        $cr++;
    }
//print_r($posts);

return $posts;


    }
}
}
?>
