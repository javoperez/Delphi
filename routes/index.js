
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.voltaje = function  (req,res) {
	console.log(req.body);
	var voltage = req.body.voltaje;
	var aho = parseInt(voltage);
	global.socket.sockets.emit("voltaje",{valor:aho});
	res.send("Aca chidi");
}

exports.temperatura = function  (req,res) {
	global.db.Temperatura.findAll().success(function  (temperaturas) {
		res.send(temperaturas);		
	});
}

exports.temperaturar = function  (req,res) {
	var temp = req.body['temperatura'];
	global.db.Temperatura.findAll().success(function(projects) {
		for (var i = 0; i < projects.length; i++) {
			projects[i].destroy();
		};
		global.db.Temperatura.build({nivel:temp}).save();	
		res.send("OK");
	});
}

exports.oxigeno = function  (req,res) {
	global.db.Oxigeno.findAll().success(function  (oxigeno) {
		res.send(oxigeno);		
	});	
}