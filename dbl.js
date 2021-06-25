(function(global) {
    var nodes = global.nodes;
    function ifvoted(){
        this.addOutput("true", nodes.EVENT);
        this.addOutput("false", nodes.EVENT);
        this.addProperty("User ID", "");
        this.addProperty("DBL Token", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    ifvoted.title = "Has Voted";
    ifvoted.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    
        this.setOutputData(1, this.getInputData(0)); 

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            nodes.add_module('@top-gg/sdk')
            fs.writeFileSync(`${readanything}\\Workroom\\events\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
             fs.writeFileSync(`${readanything}\\Workroom\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
            fs.appendFileSync(this.getInputData(0),`
            require(\`../dbl.js\`)(client,\`${nodes.parse(this.properties["DBL Token"])}\`).hasVoted(\`${nodes.parse(this.properties["User ID"])}\`).then(async(voted)=>{if(voted){`);
            this.trigger("true");
            fs.appendFileSync(this.getInputData(0),`\n}else{`);
            this.trigger("false")
            fs.appendFileSync(this.getInputData(0),`\n}})`);
            }
    }
    nodes.registerNodeType("DBL Action/Has Voted", ifvoted );
    function getvotes(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("DBL Token", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    getvotes.title = "Get Votes";
    getvotes.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            nodes.add_module('@top-gg/sdk')
            fs.writeFileSync(`${readanything}\\Workroom\\events\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
            fs.writeFileSync(`${readanything}\\Workroom\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
            fs.appendFileSync(this.getInputData(0),`
            global.${this.properties["Save to variable"]} =  await (await require(\`../dbl.js\`)(client,\`${nodes.parse(this.properties["DBL Token"])}\`).getVotes())
            server.${this.properties["Save to variable"]} =  await (await require(\`../dbl.js\`)(client,\`${nodes.parse(this.properties["DBL Token"])}\`).getVotes())`);
            }
            nodes.save_var(this.properties["Save to variable"],"Votes")
            this.trigger("Action")
    }
    nodes.registerNodeType("DBL Action/Get Votes", getvotes );
    function getstats(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("DBL Token", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    getstats.title = "Get Stats";
    getstats.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            nodes.add_module('@top-gg/sdk')
            fs.writeFileSync(`${readanything}\\Workroom\\events\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
             fs.writeFileSync(`${readanything}\\Workroom\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
            fs.appendFileSync(this.getInputData(0),`
            global.${this.properties["Save to variable"]} = await (await require(\`../dbl.js\`)(client,\`${nodes.parse(this.properties["DBL Token"])}\`).getStats(client.user.id)).serverCount
            server.${this.properties["Save to variable"]} = await (await require(\`../dbl.js\`)(client,\`${nodes.parse(this.properties["DBL Token"])}\`).getStats(client.user.id)).serverCount`);
            }
            nodes.save_var(this.properties["Save to variable"],"Stats")
            this.trigger("Action")
    }
    nodes.registerNodeType("DBL Action/Get Stats", getstats );
    function getdetails(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("DBL Token", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    getdetails.title = "Get Details";
    getdetails.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                nodes.add_module('@top-gg/sdk')
                fs.writeFileSync(`${readanything}\\Workroom\\events\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
                fs.writeFileSync(`${readanything}\\Workroom\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
                fs.appendFileSync(this.getInputData(0),`
                global.${this.properties["Save to variable"]} = await require('node-fetch')(\`https://top.gg/api/bots/\${client.user.id}\`,{
                    headers: { 'Content-Type': 'application/json', 'Authorization':\`${this.properties["DBL Token"]}\`}
                }).then(res=>res.json())
                server.${this.properties["Save to variable"]} = await require('node-fetch')(\`https://top.gg/api/bots/\${client.user.id}\`,{
                    headers: { 'Content-Type': 'application/json', 'Authorization':\`${this.properties["DBL Token"]}\`}
                }).then(res=>res.json())`);
            }
            nodes.save_var(this.properties["Save to variable"],"JSON Object")
            this.trigger("Action")
    }
    nodes.registerNodeType("DBL Action/Get Details", getdetails );
    function updatestats(){t
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("DBL Token", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    updatestats.title = "Update Stats";
    updatestats.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            nodes.add_module('@top-gg/sdk')
            fs.writeFileSync(`${readanything}\\Workroom\\events\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
             fs.writeFileSync(`${readanything}\\Workroom\\dbl.js`,`function dbl(client,token){
                    let dblapi = require('@top-gg/sdk')
                    if(!client.dbl){
                        client.dbl = new dblapi.Api(token)
                    }
                    return client.dbl;
}
module.exports = dbl`)
            fs.appendFileSync(this.getInputData(0),`
            require(\`../dbl.js\`)(client,\`${nodes.parse(this.properties["DBL Token"])}\`).postStats({server_count:await (await client.shard.fetchClientValues('guilds.cache.size')).reduce((acc, guildCount) => acc + guildCount, 0)})`);
            }
            this.trigger("Action")
    }
    nodes.registerNodeType("DBL Action/Update Stats", updatestats );
})(this)