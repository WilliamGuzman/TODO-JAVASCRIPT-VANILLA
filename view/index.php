<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="view/css/style.css">
    <title>Nerdify TODO List</title>
</head>

<body>

    <div class="container">

        <div class="box container_form">
            <div class="header_form">
                <h2>Escribir el nombre de la tarea</h2>
            </div>
            <form class="form" method="post" name="form" enctype="multipart/form-data">
                <input type="text"  class="input_task"  name="task" id="task">
                <span class="validation">Este campo es requerido</span>
                <button class="btn" type="submit">Añadir</button>
            </form>
        </div>

        <div class="container_list">

            <ul class="list" id="list">
                
            </ul>

        </div>

    </div>





    <script src="view/js/script.js"></script>
</body>

</html>