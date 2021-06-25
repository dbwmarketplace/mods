(function(global) {
    var nodes = global.nodes;
    function FindByProperty(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Array", "");
        this.addProperty('Property','')
        this.addProperty('Value','')
        this.addProperty('Save to variable','')
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
        this.size = [160,27]
    }
    FindByProperty.title = "Find By Property";
    FindByProperty.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                
                        fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"].replaceAll('${','').replaceAll('}','')} = ${this.properties["Array"].replaceAll("${","").replaceAll("}","")}.find(el=>el.${this.properties["Property"].replaceAll("${","").replaceAll("}","")} == \`${nodes.parse(this.properties["Value"])}\`)
                        server.${this.properties["Save to variable"].replaceAll('${','').replaceAll('}','')} = ${this.properties["Array"].replaceAll("${","").replaceAll("}","")}.find(el=>el.${this.properties["Property"].replaceAll("${","").replaceAll("}","")} == \`${nodes.parse(this.properties["Value"])}\`)`);
                
                nodes.save_var(this.properties["Save to variable"],'Array Element')
            this.trigger("Action");
            }
    }
    nodes.registerNodeType("Utilities/Find By Property", FindByProperty );
})(this)