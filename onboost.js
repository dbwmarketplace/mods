(function(global) {
    var nodes = global.nodes;
    function serverbs()
    {
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Save member to variable", "boostMember");
        this.addProperty("Save guild to variable", "boostedGuild");
        this.widgets_up = true;
        this.once = 0;
    }
    serverbs.title = "Server Boost";
    serverbs.prototype.onExecute = function()
    {
        const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
        if(this.isOutputConnected(0)){
        this.setOutputData( 0, `${readanything}\\Workroom\\events\\client\\guildMemberUpdate.js`);
       
        if(this.getOutputData(0)){
            fs.writeFileSync( `${readanything}\\Workroom\\events\\client\\guildMemberUpdate.js`, `
            const Canvas = require('canvas');
           
            module.exports = async (Discord, client, old, new) => {
                if(!old.premiumSince&&new.premiumSince){
                    let server = new.guild.server;
                    global.${this.properties["Save guild to variable"].replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = new.guild;
                    server.${this.properties["Save guild to variable"].replaceAll("${","").replaceAll("}","").replaceAll('server.','').replaceAll('global.','')} = new.guild;
                    global.${this.properties["Save member to variable"].replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = new;
                    server.${this.properties["Save member to variable"].replaceAll("${","").replaceAll("}","").replaceAll('server.','').replaceAll('global.','')} = new;
            `);
            nodes.save_var(this.properties["Save member to variable"],'user')
            nodes.save_var(this.properties["Save guild to variable"],'guild')
            }
            this.trigger("Action");
            fs.appendFileSync(`${readanything}\\Workroom\\events\\client\\guildMemberUpdate.js`,`}`)       
    }
    }
    nodes.registerNodeType("Events/Server Boost", serverbs );
})(this)