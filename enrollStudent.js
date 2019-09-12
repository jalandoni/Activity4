exports.enrollStudent = function (req, res) {
    var url = require('url');
    var fs = require('fs');
    var q = url.parse(req.url, true);
    console.log(q.pathname)

    if (q.pathname == "/enroll") {
        req.on("data", function (reqData) {
            console.log("data : " + reqData)        
            var data2 = JSON.parse(reqData);
            var filename = data2.sub1.split(" ").join("-");
            fs.appendFile(filename + ".csv", data2.sub1 + "," + data2.name1 + "," + data2.email + "\n", function (err) {                
                if (err) throw err;
                console.log('Saved!');
            });
            
            res.end();
       

        });
    } 
}