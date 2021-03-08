document.querySelector('.div1').innerHTML = `
<div class="card">
    <div class="card-body">
        Noch keine Daten vorhanden.
    </div>
</div>`;

document.querySelector("#btn").addEventListener("click", () => {
  const server = "http://localhost:1337/server.php";

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", requestListener);
  xhr.open("POST", server, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send("test=5");
  console.log("message was send");

  function requestListener() {
    const message = this.responseText;
    console.log(message);
    createTable(message);
  }

  function createTable(data){
    data = JSON.parse(data);

    let tbl = "<table class='table'>";
      tbl += `<thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>`;
    for(let e in data){
        let c = e;
        c = c + 1;
        tbl += `<tr>
                    <th scope="row">${c}</th>
                    <td>${data[e].name}</td>
                    <td>${data[e].email}</td>
                </tr>`;
    }
    tbl += `</tbody>
        </table>`;


    document.querySelector('.div1').innerHTML = tbl;
  }
});