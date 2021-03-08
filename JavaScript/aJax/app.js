document.querySelector('.div1').innerHTML = "\n<div class=\"card\">\n    <div class=\"card-body\">\n        Noch keine Daten vorhanden.\n    </div>\n</div>";
document.querySelector("#btn").addEventListener("click", function () {
    var server = "http://localhost:1337/server.php";
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", requestListener);
    xhr.open("POST", server, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("test=5");
    console.log("message was send");
    function requestListener() {
        var message = this.responseText;
        console.log(message);
        createTable(message);
    }
    function createTable(data) {
        data = JSON.parse(data);
        var tbl = "<table class='table'>";
        tbl += "<thead>\n                <tr>\n                    <th scope=\"col\">#</th>\n                    <th scope=\"col\">Name</th>\n                    <th scope=\"col\">Email</th>\n                </tr>\n            </thead>\n            <tbody>";
        for (var e in data) {
            var c = e;
            c = c + 1;
            tbl += "<tr>\n                    <th scope=\"row\">" + c + "</th>\n                    <td>" + data[e].name + "</td>\n                    <td>" + data[e].email + "</td>\n                </tr>";
        }
        tbl += "</tbody>\n        </table>";
        document.querySelector('.div1').innerHTML = tbl;
    }
});
