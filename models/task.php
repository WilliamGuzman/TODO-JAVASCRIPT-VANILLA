<?php

require_once "connection.php";

class TaskModel
{

    /*=============================================
	=                 INSERT TASK                 =
    =============================================*/
    static public function MdlInsertTask( $dato ){
        
        $pdo = Connection::connect();
        $stmt = $pdo->prepare("INSERT INTO task(text) VALUES(:task)");
        $stmt->bindParam(":task", $dato, PDO::PARAM_STR);

        try {
            
            $stmt->execute();
            
            $lastId =  $pdo->lastInsertId();
            $stmt = $pdo->prepare("SELECT * FROM task WHERE id = :id");
            $stmt -> bindParam(":id", $lastId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);

        } catch (Exception $e) {

            return $e;
        }

        $stmt = null;
    }
    /*=============================================
	=                 UPDATE TASK                 =
    =============================================*/
    static public function MdlUpdateTask($idTask,$status){
        
        $pdo = Connection::connect();
        $stmt = $pdo->prepare("UPDATE task SET completed = :completed WHERE id = :id");
        $stmt->bindParam(":id", $idTask, PDO::PARAM_INT);
        $stmt->bindParam(":completed", $status, PDO::PARAM_INT);

        try {
            
            $stmt->execute();

            return $status;

        } catch (Exception $e) {

            return $e;
        }

        $pdo = null;
    }
    /*=============================================
	=                 DELETE TASK                 =
    =============================================*/
    static public function MdlDeleteTask($taskId){

        $pdo = Connection::connect();
        $stmt = $pdo->prepare("DELETE FROM task WHERE id = :id");
        $stmt -> bindParam(":id", $taskId, PDO::PARAM_INT);
        try {

            $stmt->execute();
            $pdo = null;

        } catch (Exception $e) {

            $pdo = null;

        }
    }
}
