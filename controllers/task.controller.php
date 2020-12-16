<?php

require_once "../models/task.php";

class TaskController
{

    /*=============================================
	=  		       CREATE TASK                     =
    =============================================*/
    public static function ctrCreateTask()
    {

        if (isset($_POST["task"])) {

            $task =  $_POST["task"];
            $response = TaskModel::MdlInsertTask($task);

            return  $response;
        }
    }

    /*=============================================
	=  		       UPDATE TASK                     =
    =============================================*/
    public static function ctrUpdateTask()
    {
        if (isset($_POST["idTaskStatus"])) {

            $taskId =  $_POST["idTaskStatus"];
            $status =  $_POST["status"];
            $response = TaskModel::MdlUpdateTask($taskId,$status);
            return $response;
        }
    }
    /*=============================================
	=  		       DELETE TASK                     =
    =============================================*/
    public static function ctrDeleteTask()
    {
        if (isset($_GET["idTask"])) {

            $taskId =  $_GET["idTask"];
            TaskModel::MdlDeleteTask($taskId);
        }
    }
}
