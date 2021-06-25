(function(global) {
    let nodes = global.nodes;
function getvalue(){
    this.addProperty("Botdash Token","");
    this.addProperty("Guild ID","");
    this.addProperty("Database Storage ID","");
    this.addProperty("Save to variable","");
    this.addOutput("Action", nodes.EVENT);
    this.addInput("Trigger", nodes.ACTION);
    this.widgets_up = true; 
}
getvalue.title = "Get Value";
getvalue.prototype.onAction = function()
{
    
        this.setOutputData(0, this.getInputData(0));  

        if(this.getOutputData(0)){
        nodes.add_module('botdash.pro')
        fs.writeFileSync(`${readanything}\\Workroom\\events\\botdash.js`,`function botdash(client,token){
            let botdash = require('botdash.pro')
            if(!client.botdash){
                client.botdash = new botdash.APIclient(token)
            }
            return client.botdash;
}
module.exports = botdash`)
     fs.writeFileSync(`${readanything}\\Workroom\\botdash.js`,`function botdash(client,token){
            let botdash = require('botdash.pro')
            if(!client.botdash){
                client.botdash = new botdash.APIclient(token)
            }
            return client.botdash;
}
module.exports = botdash`)
        fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"]} = await require('../botdash.js')(client,\`${nodes.parse(this.properties["Botdash Token"])}\`).getVal(\`${nodes.parse(this.properties["Guild ID"])}\`, \`${nodes.parse(this.properties["Database Storage ID"])}\`)
        server.${this.properties["Save to variable"]} = await require('../botdash.js')(client,\`${nodes.parse(this.properties["Botdash Token"])}\`).getVal(\`${nodes.parse(this.properties["Guild ID"])}\`, \`${nodes.parse(this.properties["Database Storage ID"])}\`)`);
        nodes.save_var(this.properties["Save to variable"],'Var') 
        }
        this.trigger("Action");

}
nodes.registerNodeType("Botdash Action/Get Value", getvalue );
})(this)