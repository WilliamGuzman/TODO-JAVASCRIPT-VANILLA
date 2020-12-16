<?php

    class Connection
    {
        static public function connect(){

            $link = new PDO("mysql:host=localhost;dbname=nerdify","root","");

			$link -> exec("set names utf8");

			return $link;
        }
    }
