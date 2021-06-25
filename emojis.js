(function(global) {
    var nodes = global.nodes;
    function cemoji(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Emoji Name", "");
        this.addProperty("Image Link", "");
        this.addProperty("Guild ID", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    cemoji.title = "Create Emoji";
    cemoji.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                if(this.properties["Save to variable"]){
                    fs.appendFileSync(this.getInputData(0),`\nawait client.guilds.cache.get(\`${nodes.parse(this.properties["Guild ID"])}\`).emojis.create(\`${nodes.parse(this.properties["Image Link"])}\`,\`${nodes.parse(this.properties["Emoji Name"])}\`).then(emoji=>{
                        global.${this.properties["Save to variable"]} = emoji;
                        server.${this.properties["Save to variable"]} = emoji;
                    })`);
                }else{
                    fs.appendFileSync(this.getInputData(0),`\nawait client.guilds.cache.get(\`${nodes.parse(this.properties["Guild ID"])}\`).emojis.create(\`${nodes.parse(this.properties["Image Link"])}\`,\`${nodes.parse(this.properties["Emoji Name"])}\`)`);
                }
            this.trigger("Action");
            }
    }
    nodes.registerNodeType("Emoji Action/Create Emoji", cemoji );
})(this)