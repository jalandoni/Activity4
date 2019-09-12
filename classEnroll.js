exports.classEnroll = function (req, res) {    
    var fs = require('fs');
    var url = require('url');
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    if (q.pathname == "/") {
        filename = "index.html";
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });

    } else if (q.pathname.split('/')[1] == "class") {
        var csvRequest = q.pathname.split('/')[2] + ".csv";
        fs.readFile(csvRequest, 'utf8', function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            var retdata = data.split('\n').join(",");
            var information = retdata.split(',');
            var content = '<!DOCTYPE html><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>';

            content += '<body><style></style><div class="row"> <div class="col-md-3"></div><div class="col-md-6"><center><h1>'+information[0]+' class</h1><br><br><table class="table table-bordered"><thead><tr><th>NAME</th><th>EMAIL</th><th>COURSE & YEAR</th></tr></thead><tbody>';
            information.splice(information.lastIndexOf(""), 1)
            var len = information.length;
            var count = 0;
            console.log(information)
            for (var i = 0; i < len / 3; i++) {
                content += '<tr>'
                for (let j = count; j < count + 3; j++) {
                    content += '<td>' + information[j] + '</td>';
                }
                content += '</tr>'
                count += 3;
            };

            content += '</table></center></div><div class="col-md-3"></div> </div></body></html>';
            res.write(content)
            return res.end()


        });
    };
};