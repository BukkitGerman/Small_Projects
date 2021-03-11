//Add Button

const btn = document.createElement('button');
const div = document.createElement('div');
div.id = 'time';
btn.id = "btn";
btn.classList.add("btn");
btn.classList.add("btn-primary");
btn.innerHTML = "ok";
document.getElementById("header").appendChild(btn);
document.getElementById("header").appendChild(div);

clearInterval();
setInterval(refreshData, 10000);
document.querySelector("#btn").addEventListener("click", refreshData);

function refreshData() {;
    document.querySelector('#time').innerHTML = "Data From: "+getTime();
    var server = "http://localhost:1337/server2.php";
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
}

const getTime = () => {
    var date_ob = new Date();
    return ("0" + date_ob.getHours()).slice(-2)+":"+("0" + date_ob.getMinutes()).slice(-2)+":"+("0" + date_ob.getSeconds()).slice(-2)
}
//Create the Table with the response data from the aJax request
const createTable  = (data) => {
    if(document.querySelector('table'))
        document.querySelector('#content').removeChild(document.querySelector('table'))
    let header = data;
    let columns = ["#"];
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