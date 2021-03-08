//Add Button

const btn = document.createElement('button');
btn.id = "btn";
btn.classList.add("btn");
btn.classList.add("btn-primary");
btn.innerHTML = "ok";
document.getElementById("header").appendChild(btn);

//Button Event Listener and aJax Request
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
        createTable(JSON.parse(message));
    }
});

//Create the Table with the response data from the aJax request

const createTable  = (data) => {
    let header = data;
    let columns = ["#"];
    console.log(columns);
    Object.keys(header[0]).map((e) => columns.push(e));
    const [table, thead, tbody, tr] = [document.createElement('table'), document.createElement('thead'), document.createElement('tbody'), document.createElement('tr')];
    table.classList.add('table', 'table-striped');
    columns.map((entrie) => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.innerHTML = `${entrie}`;
            tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    let c = 1;
    data.map((e) => {
            const tr = document.createElement("tr");
            const td = document.createElement('td');
            td.innerHTML = `${c}`;
            tr.appendChild(td);
        Object.keys(e).map((i) => {
            const td = document.createElement('td');
            td.innerHTML = `${e[i]}`;
            tr.appendChild(td);
        })
        c++;
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);
    document.getElementById('content').appendChild(table);
}