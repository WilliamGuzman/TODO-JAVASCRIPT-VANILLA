<?php

require_once "../controllers/task.controller.php";
require_once "../models/task.php";

class AjaxTask
{

    /*=============================================
	=               CREATE TASK                  =
	=============================================*/

    public $task;
    public $st;

    public function ajaxCreateTask()
    {
        $data = $this->task;

        $response = TaskController::ctrCreateTask($data);

        echo json_encode($response);
    }
    /*=============================================
	=               UPDATE TASK                  =
    =============================================*/
    public function ajaxUpdateTask()
    {

        $taskId = $this->task;
        $status = $this->st;
        $response = TaskController::ctrUpdateTask($taskId,$status);

        echo json_encode($response);
    }

    /*=============================================
	=               DELETE TASK                  =
    =============================================*/
    public function ajaxDeleteTask()
    {

        $taskId = $this->task;
        $response = TaskController::ctrDeleteTask($taskId);

        echo json_encode($response);
    }
}


if (isset($_POST["task"])) {

    $task = new AjaxTask();
    $task->task = $_POST["task"];
    $task->ajaxCreateTask();
}

if (isset($_POST["idTaskStatus"])) {

    $task = new AjaxTask();
    $task->task = $_POST["idTaskStatus"];
    $task->st = $_POST["status"];
    $task->ajaxUpdateTask();
}

if (isset($_GET["idTask"])) {

    $task = new AjaxTask();
    $task->task = $_GET["idTask"];
    $task->ajaxDeleteTask();
}
