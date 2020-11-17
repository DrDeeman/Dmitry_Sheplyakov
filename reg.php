<?php
if(!empty($_POST['name']) && !empty($_POST['familia']) && !empty($_POST['nik'])){
	$link = mysqli_connect('localhost','root','','user');
	if(!empty($link)){		
			if(mysqli_query($link,"INSERT INTO `users`(`name`,`familia`,`nikname`) VALUES('".$_POST['name']."','".$_POST['familia']."','".$_POST['nik']."')"))
		echo "Регистрация успешна.";
	}else echo "Неверные данные.";
mysqli_close($link);
}else echo "Ошибка регистрации. Попробуйте снова.";

?>