(function(global) {
    var nodes = global.nodes;
    function getauditlog(){
        this.addProperty("Guild ID", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.addOutput("Action", nodes.EVENT);
        this.widgets_up = true; 
    }
    getauditlog.title = "Get Audit Logs";
    getauditlog.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nawait client.guilds.cache.get(\`${this.properties["Guild ID"]}\`).fetchAuditLogs().then(a=>{
                global.${this.properties["Save to variable"].replaceAll("${",'').replaceAll("}",'')} = a.entries.array()
                server.${this.properties["Save to variable"].replaceAll("${",'').replaceAll("}",'')} = a.entries.array()
            })`);
            nodes.save_var(this.prototype["Save to variable"],"Array")
            this.trigger("Action")
            }
    }
    nodes.registerNodeType("Variable Action (3)/Get Audit Logs", getauditlog );
})(this)