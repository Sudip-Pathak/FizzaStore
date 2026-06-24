import colors from "colors";
import fs from "fs";
import path from "path";
import url from "url";

function logger (req, res, next){
    let __filename = url.fileURLToPath(import.meta.url);
    let __dirname = path.dirname(__filename);
    let reqColors = {
        'GET' : 'green',
        'POST' : 'yellow',
        'PUT' : 'blue',
        'DELETE' : 'red'
    }
    let today = new Date();
    let start = Date.now();  // // Time taken by code to prepare response. (Or check bottleneck.)
    let formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} Time ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    res.on("finish", () => {     // // Event Handlr
        let end = Date.now();   // // Line number 13 complete. 
        console.log(`[${formattedDate}]::${req.method}-${req.originalUrl}-${req.ip}-${res.statusCode}-${end - start}ms`[reqColors[req.method]]);   // // original in Url gives thhe actual url not only the end point.
        
        let msg = `[${formattedDate}]::${req.method}-${req.originalUrl}-${req.ip}-${res.statusCode}-${end - start}ms`
            fs.appendFile(path.join(__dirname, "../../app.log"), msg + '\n', err => {
            if(err) console.log(err.message);
        });
    });
    next();
};

export default logger;



