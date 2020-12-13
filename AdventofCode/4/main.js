//Part 1
require('fs').readFile('list.txt','utf8',(err,data)=>console.log(data.split('\n\n').map(v=>v.split(' ').map(n=>n.split('\n')).flat()).map(v=>v.filter(x=>x[0]!="c")).filter(v=>v.length==7).length))
//Part 2
require('fs').readFile('list.txt', 'utf8', (err, data) => {
	data = data.split('\n\n').map(v=>v.split(' ').map(n=>n.split('\n')).flat()).map(v=>v.filter(x=>x[0]!="c")).filter(v=>v.length==7)
	data = data.map(v => v.map(x => x.split(':')))
	//.map(v => v.filter(x => console.log(x)))
	.map(v => v.map(x => x[0]=="byr" ? x[1].filter(z => console.log(z))) : true)
	//.map(v => v.filter(x => x[0]=="byr" ? 1*x[1] < 2002 && 1*x[1] > 1920 : false))
	//.map(v => v.filter(x => x[0]=="iyr" ? 1*x[1] < 2020 && 1*x[1] > 2010 : false))
	//.map(v => v.filter(x => x[0]=="eyr" ? 1*x[1] < 2030 && 1*x[1] > 2020 : false))
		console.log('D: ', data.length)
})