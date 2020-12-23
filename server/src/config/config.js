const config = {
	"dev":{
		"username":"deepworkdev",
		"password":"winifreDj0ju",
		"database":"deepworkdevtest",
		"host":"deepworkdev.cj2vcfmrr3ls.us-east-2.rds.amazonaws.com", //DB Instance
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