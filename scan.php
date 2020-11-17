<?php
if(!empty($_POST['niks'])){
$link=mysqli_connect('localhost','root','','user');
if(mysqli_connect_errno($link)==0){
$result=mysqli_prepare($link,"SELECT nikname FROM users WHERE nikname=(?)");//подготавливает запрос
mysqli_stmt_bind_param($result,'s',$_POST['niks']);//привязывает данные к ссылке запроса
mysqli_stmt_execute($result);//выполняет запрос и возвращает ссылке результат
mysqli_stmt_store_result($result); //mysqli_stmt_store_result буферизует результирующий набор
//mysqli_stmt_bind_result($result,$param);
//mysqli_stmt_fetch($result);
if(mysqli_stmt_num_rows($result)==0)echo "Ник свободен";else echo "Ник занят. Введите другой.";
mysqli_close($link);
}else echo "Ошибка подключения.";
}
?>