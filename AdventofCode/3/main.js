fs = require('fs');
fs.readFile('list.txt', 'utf8', (err, data) => {
	let rs = 0;
	let rt = false;
	let c = 0;
	data = data.split('\n');
	let counter = 0;
	data.map(row => {
		
		if(rt){
			console.log(" skip ", data.indexOf(row))
			rt = false
			return
		}

		if(row[counter%31] == "#"){
			rs ++;
			console.log("Hit: row: ", data.indexOf(row) + " c: " + counter)
		}

		counter += 1;
		console.log("-", data.indexOf(row))
		rt = true
		return

	})




	/*for(let i = 0; i < data.length; i++){
		if(i % 3 == 0){
			i = i + 31;
			if(data[i] == "#"){
				rs++;
			}else{
			}
		}
	}*/

	console.log("single: ", rs);
	console.log("erg:", 66 * 153 * 79 * 92 * rs)

})

/*
1: 66
2: 153
3: 79
4: 92
5: 33

wrong
	799950
	800778
	800870
*/

