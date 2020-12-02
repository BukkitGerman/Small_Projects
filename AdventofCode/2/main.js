

fs = require('fs');
fs.readFile('list.txt', 'utf8', (err, data) => {
	let array = data.split('\n');
	array = array.map(e => e.split(" "))
	.map(e => {
		e[0] = e[0].split("-")
		e[1] = e[1][0];
		return e;
	})

	//Part 1

	let valid = 0;
	array.forEach(m =>{
		let re = new RegExp(m[1], "g");
		let c = (m[2].match(re) || []).length;
		if(c >= m[0][0] && c <= m[0][1]){
			valid++;
		}
	})

	console.log("Part 1: ", valid);

	//Part 2
	valid = 0;
	array.forEach(m =>{
		let f = 0;
		for(let i = 1; i<=m[2].length; i++){
			if(i == m[0][0]){
				if(m[1] == m[2][i-1]){
					console.log(m[1] + " " + m[2][i])
					f++;
				}
			}

			if(i == m[0][1]){
				if(m[1] == m[2][i-1]){
					console.log(m[1] + " " + m[2][i])
					f++;
				}
			}
		}
		console.log(m[1])
		if(f == 1){
			valid++;
		}
	})
	console.log("Part 2: ", valid)

	

})