const astronomy = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        header {
            text-align: center;
            background-color: #333;
            color: white;
            padding: 10px;
        }

        .image-container {
            max-width: 600px;
            margin: 20px auto;
            text-align: center;
            border: 2px solid #333;
            border-radius: 8px;
            overflow: hidden;
        }

        .image-container img {
            width: 100%;
            height: auto;
            border-bottom: 2px solid #333;
        }

        .image-info {
            padding: 20px;
            text-align: left;
        }

        h2 {
            color: #333;
        }

        p {
            color: #666;
        }
    </style>
</head>
<body>

    <header>
        <h1>Image Page</h1>
    </header>

    <div class="image-container">
        <img src=imageSource alt="Image Description">
    </div>

    <div class="image-info">
        <h2>Image Title</h2>
        <p>This is a description of the image. You can provide additional details or information about the image here.</p>
    </div>

</body>
</html>
`;
export default astronomy;