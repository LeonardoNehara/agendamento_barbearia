<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Inicio;

class InicioController extends Controller {

    public function __construct() {
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        if ($_SESSION['token']) {  
            $this->render('inicio', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }


    
}