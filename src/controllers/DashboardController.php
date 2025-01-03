<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;

class DashboardController extends Controller {
    
    public function __construct(){
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        $this->render('drawer', ['base' => Config::BASE_DIR]);
    }

}