const config = {
	"dev":{
		"username":"",
		"password":"",
		"database":"",
		"host":"", //DB Instance
		"dialect":"postgres",
		"aws_region":"us-east-2",
		"aws_profile":"default"
	},

	"prod" : {
		"username":"",
		"password":"",
		"database":"",
		"host":"",
		"dialect":"postgres",
		"aws_region":"",
		"aws_profile":""
	}
}

module.exports = config;