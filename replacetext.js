(function(global) {
    var nodes = global.nodes;
    function rtext(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Text", "");
        this.addProperty("Text to replace", "");
        this.addProperty("Replace with", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    rtext.title = "Replace Text";
    rtext.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"]} = await String(\`${nodes.parse(this.properties["Text"])}\`).split(\`${nodes.parse(this.properties["Text to replace"])}\`).join(\`${nodes.parse(this.properties["Replace with"])}\`)
                server.${this.properties["Save to variable"]} = await String(\`${nodes.parse(this.properties["Text"])}\`).split(\`${nodes.parse(this.properties["Text to replace"])}\`).join(\`${nodes.parse(this.properties["Replace with"])}\`)`);                   
            this.trigger("Action");
            }
    }
    nodes.registerNodeType("Text Action/Replace Text", rtext );
})(this)