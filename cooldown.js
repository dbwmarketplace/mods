(function(global) {
    var nodes = global.nodes;
    function cooldown(){
        this.addOutput("Action", nodes.EVENT);
        this.addOutput("cooldown", nodes.EVENT);
        this.addOutput("cooldown over", nodes.EVENT);
        this.addProperty("Seconds", "10");
        this.addInput("Trigger", nodes.ACTION);
        this.widgets_up = true; 
    }
    cooldown.title = "Cooldown";
    cooldown.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));    
        this.setOutputData(1, this.getInputData(0));    
        this.setOutputData(2, this.getInputData(0));    

  
            if(this.getOutputData(0)){
                const path = require('path')
                const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
                fs.appendFileSync(this.getInputData(0),`
                if(!message.author.cooldown){
                    message.author.cooldown = [];
                }
                if(!message.author.cooldown.includes("${this.getInputData(0).replaceAll(`${readanything}\\Workroom\\events\\client\\`,'').replaceAll(`${readanything}\\Workroom\\events\\guild\\`,'').replaceAll(`${readanything}\\Workroom\\commands\\`,'')}")){
                    await message.author.cooldown.push("${this.getInputData(0).replaceAll(`${readanything}\\Workroom\\events\\client\\`,'').replaceAll(`${readanything}\\Workroom\\events\\guild\\`,'').replaceAll(`${readanything}\\Workroom\\commands\\`,'')}");
                    await setTimeout(async() => {
                            
                           
                        message.author.cooldown.splice(message.author.cooldown.indexOf("${this.getInputData(0).replaceAll(`${readanything}\\Workroom\\events\\client\\`,'').replaceAll(`${readanything}\\Workroom\\events\\guild\\`,'').replaceAll(`${readanything}\\Workroom\\commands\\`,'')}"),1);
                            
                           
                    `);
                    this.trigger("cooldown over");
                    fs.appendFileSync(this.getInputData(0),`\n}, ${this.properties["Seconds"]}*1000);`)
            this.trigger("Action");
            fs.appendFileSync(this.getInputData(0),`
        }else{`)
            this.trigger("cooldown");
            fs.appendFileSync(this.getInputData(0),"\n}")
            }
    }
    nodes.registerNodeType("Command Action/Cooldown", cooldown );
})(this)