// mod by JopGamerNL#3526

(function(global) {
    var nodes = global.nodes;
    
    // Create new SaveVar

    function CreateSaveVar(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("name", "name of save variable");
        this.addProperty("Value", "");
        
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Notes:</h2>
        <h3 style="font-weight: 600;">Please Connect the <span style="text-decoration: underline;">Fetch SaveVars</span> node from the <span style="text-decoration: underline;">SaveVars Mod</span> tab to a <span style="text-decoration: underline;">Bot Ready</span> event in order to make this mod work properly as intended</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    CreateSaveVar.title = "Create SaveVar";
    CreateSaveVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
                await client.userdata.set(\`SaveVar_${this.properties["name"]}\`, ${this.properties["Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")});
                global.${this.properties["name"]} = await client.userdata.fetch(\`SaveVar_${this.properties["name"]}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${this.properties["name"]}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            nodes.save_var(this.properties["name"], "SaveVar")
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Create SaveVar", CreateSaveVar );

    // Fetch SaveVars OnReady event 

    function UpdateSaveVars(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">How to use:</h2>
        <h3 style="font-weight: 600;">Please Connect this node to the <span style="text-decoration: underline;"><strong>Bot Ready</strong></span> event</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    UpdateSaveVars.title = "Fetch SaveVars";
    UpdateSaveVars.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
            global.SaveVars = await client.userdata.fetch(\`SaveVars\`);
            if(!global.SaveVars) return;
            
            global.i=0;
            global.SaveVars.forEach(async save_name=>{
                await setTimeout(async ()=>{
                global.i++;
                global[save_name] = await client.userdata.fetch(\`SaveVar_\${save_name}\`);
                if(global.i >= global.SaveVars.length){}
            },global.i)})
            `);
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Fetch SaveVars", UpdateSaveVars );

    // edit SaveVar

    function EditSaveVar(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("Value", "SaveVar Here");
        this.addProperty("Method", "");
        this.addProperty("Second Value", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw">Methods</h2>
        <h3 style="font-weight: 600;">Equal${nodes.insert_button("=")}</h3>
        <h3 style="font-weight: 600;">Add${nodes.insert_button("+")}</h3>
        <h3 style="font-weight: 600;">Subtract${nodes.insert_button("-")}</h3>
        <h3 style="font-weight: 600;">Multiply${nodes.insert_button("*")}</h3>
        <h3 style="font-weight: 600;">Divide${nodes.insert_button("/")}</h3>
        <h3 style="font-weight: 600;">Modulus${nodes.insert_button("%")}</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    EditSaveVar.title = "Edit SaveVar";
    EditSaveVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
                
                
                ${this.properties["Value"].replaceAll("${", "").replaceAll("}", "")} = await ${this.properties["Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")} ${this.properties["Method"]} ${this.properties["Second Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")};
                let varName = \`${this.properties["Value"].replaceAll("global.", "")}\`;
                
                await client.userdata.set(\`SaveVar_\${varName}\`, ${this.properties["Value"].replaceAll("${", "\`${").replaceAll("}", "}\`")});
                `);
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Edit SaveVar", EditSaveVar );

    // Push SaveVar

    function PushSaveVar(){
        this.addOutput('Action', nodes.EVENT);
        this.addProperty("SaveVar", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Notes:</h2>
        <h3 style="font-weight: 600;">This node will push any SaveVar to the Save file.</h3>
        <h3 style="font-weight: 600;">You don't need this node if you change the SaveVar values with nodes from this mod.</h3>
        <h3 style="font-weight: 600;">This node should only be used in case the SaveVar value has been edited by a node that's not included by this mod.</h3>
        </div>
        </div>`,"list");
        this.addInput('Trigger', nodes.ACTION);
        this.widgets_up = true;
    }
    PushSaveVar.title = "Push SaveVar";
    PushSaveVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));

        if(this.getOutputData(0)){
            const path = require('path')
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            fs.appendFileSync(this.getInputData(0),`
                
            let varName = \`${this.properties["SaveVar"].replaceAll("global.", "").replaceAll("${", "").replaceAll("}", "")}\`;
            await client.userdata.set(\`SaveVar_\${varName}\`, ${this.properties["SaveVar"].replaceAll("${", "\`${").replaceAll("}", "}\`")});
            `);
        }
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Push SaveVar", PushSaveVar );

    // store value 

    function SaveValueVar(){
        this.addInput("Trigger", nodes.ACTION);
        this.addOutput("Action", nodes.EVENT);
        this.addProperty("Name", "save as");
        this.addProperty("Type", "text");
        this.addProperty("Parameter", "");
        this.addProperty("",`<div class="card" style="overflow-y: scroll; max-height: 15vw;">
        <div class="container">
        <h2 style="padding: 0.1vw 0.1vw;">Parameters</h2>
        <h3 style="font-weight: 600;">if someone types [prefix][command name] race car<br />then "race" is parameter 0 and "car" is parameter 1.</h3>
        <h3 style="font-weight: 600;">Note: use "all" to get everything after the command, 0,2 to take everything from the first word to the third word or 0+ to take everything after the first word</h3>
        </div>
        <h2 style="padding: 0.1vw 0.1vw;">Types</h2>
        <h3 style="font-weight: 600;">Text${nodes.insert_button("text")}<br />Number${nodes.insert_button("number")}</h3>
        </div>`,"list")
        this.widgets_up = true;
    }
    SaveValueVar.title = "Store in SaveVar";
    SaveValueVar.prototype.onAction = function(){
        this.setOutputData(0, this.getInputData(0));  



  
           
            if(this.getOutputData(0)){
            const path = require('path');
            const readanything = fs.readFileSync( __dirname+"../../../../../path.txt", "utf-8");
            switch(this.properties["Type"]){
            case 'text':
            if(this.properties["Parameter"].includes(",")){
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await args.slice(${this.properties["Parameter"].replaceAll("${","").replaceAll("}","")}).join(" ");
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }else if(this.properties["Parameter"].includes("+")){
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await args.slice(${this.properties["Parameter"].replaceAll("${","").replaceAll("}","").replaceAll("+","")},args.length).join(" ");
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }
            else if(this.properties["Parameter"] == "all"){
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await args.join(" ");
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }else{
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await args[${this.properties["Parameter"].replaceAll("${","").replaceAll("}","")}];
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }       
            break;
            case 'number':
            if(this.properties["Parameter"].includes(",")){
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await Number(args.slice(${this.properties["Parameter"].replaceAll("${","").replaceAll("}","")}).join(" "));
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }else if(this.properties["Parameter"].includes("+")){
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await Number(args.slice(${this.properties["Parameter"].replaceAll("${","").replaceAll("}","").replaceAll("+","")},args.length).join(" "));
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }
            else if(this.properties["Parameter"] == "all"){
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await Number(args.join(" "));
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }else{
                fs.appendFileSync(this.getInputData(0),`\nglobal.SaveValueVar = await Number(args[${this.properties["Parameter"].replaceAll("${","").replaceAll("}","")}]);
                await client.userdata.set(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`, global.SaveValueVar);
                global.${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")} = await client.userdata.fetch(\`SaveVar_${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                
                if(!global.SaveVars) {
                global.SaveVars = [];
                }

                global.SaveVars.push(\`${nodes.parse(this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.","")}\`);
                await client.userdata.set(\`SaveVars\`, global.SaveVars);
                `);
            }
            break;
            }
            }
        nodes.save_var((this.properties["Name"]).replaceAll("${","").replaceAll("}","").replaceAll("global.",""), 'SaveVar')
        this.trigger("Action");
    }
    nodes.registerNodeType("SaveVars Mod/Store in SaveVar", SaveValueVar );
})(this)