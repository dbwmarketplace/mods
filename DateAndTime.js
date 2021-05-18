// mod by JopGamerNL#3526 [ Discord ]
// more DBW mods at: https://tinyurl.com/dbwmods

(function(global) {
    var nodes = global.nodes;

    function Time(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Name", "name of variable");
        this.addProperty("Time Scheme", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Presets:</h2>
        <h3 style="font-weight: 600;">Hours:Minutes${nodes.insert_button("\${today.getHours()}:\${today.getMinutes()}")}</h3>
        <h3 style="font-weight: 600;">Hours:Minutes:Seconds${nodes.insert_button("\${today.getHours()}:\${today.getMinutes()}:\${today.getSeconds()}")}</h3>
        <h3 style="font-weight: 600;">Seconds${nodes.insert_button("\${today.getSeconds()}")}</h3>
        <h3 style="font-weight: 600;">Minutes${nodes.insert_button("\${today.getMinutes()}")}</h3>
        <h3 style="font-weight: 600;">Hours${nodes.insert_button("\${today.getHours()}")}</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    Time.title = "Time";
    Time.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            var today = new Date();
            global.${this.properties["Name"]} = \`${this.properties["Time Scheme"]}\`;
            `);
            this.trigger("Action");
        }
        nodes.save_var(this.properties["Name"], "Time")
    }
    nodes.registerNodeType("Date&Time/Time", Time );

    // date node

    function date(){
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Name", "name of variable");
        this.addProperty("Date Scheme", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Presets:</h2>
        <h3 style="font-weight: 600;">dd-mm-yyyy${nodes.insert_button("\${today.getDate()}-\${(today.getMonth()+1)}-\${today.getFullYear()}")}</h3>
        <h3 style="font-weight: 600;">mm-dd-yyyy${nodes.insert_button("\${(today.getMonth()+1)}-\${today.getDate()}-\${today.getFullYear()}")}</h3>
        <h3 style="font-weight: 600;">Day${nodes.insert_button("\${today.getDate()}")}</h3>
        <h3 style="font-weight: 600;">Month${nodes.insert_button("\${(today.getMonth()+1)}")}</h3>
        <h3 style="font-weight: 600;">Year${nodes.insert_button("\${today.getFullYear()}")}</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    date.title = "Date";
    date.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            var today = new Date();
            global.${this.properties["Name"]} = \`${this.properties["Date Scheme"]}\`;
            `);
            this.trigger("Action");
        }
        nodes.save_var(this.properties["Name"], "Date")
    }
    nodes.registerNodeType("Date&Time/Date", date );
})(this)