(function(global) {
    var nodes = global.nodes;
    function writefile(){
        this.addProperty("File path(with extension)", "");
        this.addProperty("Content", "");
        this.addInput("Trigger", nodes.ACTION);
        this.addOutput("Action", nodes.EVENT);
        this.widgets_up = true; 
    }
    writefile.title = "Write File";
    writefile.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nawait require('fs').appendFileSync(\`${nodes.parse(this.properties["File path(with extension)"])}\`,\`${nodes.parse(this.properties["Content"])}\`)`);
            this.trigger("Action")
            }
    }
    nodes.registerNodeType("Files/Write File", writefile );

    function readfile(){
        this.addProperty("File path(with extension)", "");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.addOutput("Action", nodes.EVENT);
        this.widgets_up = true; 
    }
    readfile.title = "Read File";
    readfile.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"]} = await require('fs').readFileSync(\`${nodes.parse(this.properties["File path(with extension)"])}\`)
            server.${this.properties["Save to variable"]} = await require('fs').readFileSync(\`${nodes.parse(this.properties["File path(with extension)"])}\`)`);
            nodes.save_var(this.properties["Save to variable"],'File')
            this.trigger("Action")
            }
    }
    nodes.registerNodeType("Files/Read File", readfile );
})(this)