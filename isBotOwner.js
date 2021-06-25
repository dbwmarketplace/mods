(function(global) {
    var nodes = global.nodes;

    function IsBotOwner(){
        this.addOutput("true", nodes.EVENT);
        this.addOutput("false", nodes.EVENT);
        this.addProperty('ID to check', '');
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    IsBotOwner.title = "Is Bot Owner?";
    IsBotOwner.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));
        this.setOutputData(1, this.getInputData(0)); 

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            if(await client.application.owner.id == \`${nodes.parse(this.properties["ID to check"])}\`){`);
            this.trigger("true");
            fs.appendFileSync(this.getInputData(0),`
            } else {`);
            this.trigger("false");
            fs.appendFileSync(this.getInputData(0),`\n}`);
        }
    }
    nodes.registerNodeType("Variable Action/Is Bot Owner?", IsBotOwner );
})(this)