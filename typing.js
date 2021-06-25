(function(global) {
    var nodes = global.nodes;
    function startty(){
        this.addProperty("Channel", "");
        this.addInput("Trigger", nodes.ACTION);
        this.addOutput("Action", nodes.EVENT);
        this.widgets_up = true; 
    }
    startty.title = "Start Typing";
    startty.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nclient.channels.cache.find(ch=>ch.name==\`${nodes.parse(this.properties["Channel"])}\`||ch.id==\`${nodes.parse(this.properties["Channel"])}\`).startTyping()`);
            this.trigger("Action")
            }
    }
    nodes.registerNodeType("Typing/Start Typing", startty );

    function stopty(){
        this.addProperty("Channel", "");
        this.addInput("Trigger", nodes.ACTION);
        this.addOutput("Action", nodes.EVENT);
        this.widgets_up = true; 
    }
    stopty.title = "Stop Typing";
    stopty.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nclient.channels.cache.find(ch=>ch.name==\`${nodes.parse(this.properties["Channel"])}\`||ch.id==\`${nodes.parse(this.properties["Channel"])}\`).stopTyping()`);
            this.trigger("Action")
            }
    }
    nodes.registerNodeType("Typing/Stop Typing", stopty );
})(this)