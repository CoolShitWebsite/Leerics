key = 00000000;
const Lyricist = require('lyricist');
const lyricist = new Lyricist(token)

async function stuff(){
//const data = await lyricist.search('stairway to heaven');
const song = await lyricist.song(1061, { fetchLyrics: true });
console.log(song);
//console.log(data);
}
//stuff();
//*/
var http = require('http');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(async function (req, res) {
  var data = url.parse(req.url, true).query;
  header = 'application/json'; //text/plain
  
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.writeHead(200, {"Content-Type": header});

  if (data.key) {
	if (parseInt(data.key)!==key) return res.end("bad token");
	resp = {};
    switch (data.a){
		case 'search':
		resp = await searchResults(data.q);
		break;
		
		case 'song':
		resp = await getSong(data.q);
		break;
		
	}
	res.write(JSON.stringify(resp,null,3));
	res.end();
  } else {
    res.end("no token");
  }
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);

async function searchResults(q){
	const search = await lyricist.search(q);
	return search;
}

async function getSong(q){
	const song = await lyricist.song(parseInt(q), { fetchLyrics: true, text_format:'plain' });
	return song;
}

