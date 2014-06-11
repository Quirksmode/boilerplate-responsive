<?php

require_once('Twig/Autoloader.php');
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('templates');

$twig = new Twig_Environment($loader, array(
  'cache' => false,
  'debug' => true
));



 $page = $_GET['page'];
 $page = $page ? "pages/" . $page : "base";

echo $twig->render( $page . '.html', array('name' => '', 'title' => 'Startpage'));



?>