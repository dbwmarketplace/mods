(function(global) {
    var nodes = global.nodes;
    function translate(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("To", "english");
        this.addProperty("From(optional)", "");
        this.addProperty("Text", "something");
        this.addProperty("Save to variable", "");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    translate.title = "Translate";
    translate.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    


  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            nodes.add_module('@iamtraction/google-translate')
            if(this.properties["From(optional)"]){
                fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"]} = await (await require('@iamtraction/google-translate')(\`${nodes.parse(this.properties["Text"])}\`,{from:\`${this.properties["From(optional)"]}\`,to:\`${this.properties["To"]}\`})).text
                server.${this.properties["Save to variable"]} = (await require('@iamtraction/google-translate')(\`${nodes.parse(this.properties["Text"])}\`,{to:\`${this.properties["To"]}\`})).text`);
            }else{
                fs.appendFileSync(this.getInputData(0),`\nglobal.${this.properties["Save to variable"]} = await (await require('@iamtraction/google-translate')(\`${nodes.parse(this.properties["Text"])}\`,{to:\`${this.properties["To"]}\`})).text
                server.${this.properties["Save to variable"]} = (await require('@iamtraction/google-translate')(\`${nodes.parse(this.properties["Text"])}\`,{to:\`${this.properties["To"]}\`})).text`);
            }
            this.trigger("Action");
            }
    }
    nodes.registerNodeType("Bot Action/Translate", translate );
})(this)