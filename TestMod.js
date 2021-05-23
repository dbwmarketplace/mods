module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Fortnite Mod",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["BruhIGN"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created Send Message ~ Great Plains Modding",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="form-group">
                <label>Send To *</label>
                <select class="form-control">
                    <option value="SameChannel" selected>The Battlefield</option>
                    <option value="MessageAuthor">The EPIC Player</option>
                    <option value="Other">Ur mom lol</option>
                </select>
            </div>
            <div class="form-group">
                <label>fortnite is *</label>
                <textarea class="form-control needed-field" name="messageText" rows="3" ></textarea>
            </div>
            <div class="form-group">
            <label>what is fortnite? *</label>
            <textarea class="form-control needed-field" name="messageText" rows="3" ></textarea>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded fortnite");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        switch (action.channelname) {
            case "sameChannel":
                message.channel.send(action.fortnite + messagetext);
                break;
            case "messageAuthor":
                message.author.send(action.fortnite + messagetext);
                break;
            case "mentionedUser":
                message.mentions.first().send(action.fortnite + messagetext);
                break;
        }
    }
};