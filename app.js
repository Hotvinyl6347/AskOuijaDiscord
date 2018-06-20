// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

var users = new Array(), questions = new Array(), answers = new Array(), guilds = new Array(), askingQuestion = new Array(), prevUser = new Array();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(config.game);

  for(var guig in client.guilds){
    for(var chan in guig.channels){
    if(chan.name == config.channel) chan.send(config.messages.restart);
  }
}
  
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined!`);
  guilds.push();
  for(i = 0; i < guild.channels.length; i++){
    if(guild.channels[i].name == config.channel) return;
  }
  guild.createChannel(config.channel, "text");
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("message", async message => {
  var index;
  if(guilds.indexOf(message.guild.id) == -1){
    guilds.push(message.guild.id);
    answers.push("");
    questions.push("");
    askingQuestion.push(false);
    users.push(message.author);
    prevUser.push("");
  }
  index = guilds.indexOf(message.guild.id);
  config.messages.question = `The question, asked by ${users[index]}, was: \n\n\` ${questions[index]} \`.`;
  config.messages.answer =`"\n\nThe answer is: \n\n\`${answers[index]}\``;
  if(!(message.channel.name == config.channel)) return;
  if(askingQuestion[index] == false){
    if(message.content === config.commands.goodbye){
      message.author.send(config.messages.noQuestion);
      message.delete();
    }
    else if(message.content.indexOf(config.prefix) !== 0)return;
    else{
      if(message.content.substr(config.prefix.length, message.content.length).toLowerCase() == config.commands.help){
        message.author.send(config.messages.help);
      message.delete();
      return;
      }
      else if(message.content.substr(config.prefix.length, message.content.length).toLowerCase() == config.commands.question){
        message.author.send(config.messages.noQuestion);
        message.delete();
        return;
      }
      else if(message.content.substr(config.prefix.length, message.content.length).toLowerCase() == config.commands.reset){
        message.author.send(config.messages.noQuestion);
        message.delete();
        return;
      }
      
      else{
        questions[index] = message.content.substr(config.prefix.length, message.content.length);
        users[index] = message.author;
        config.messages.question = `The question, asked by ${users[index]}, was: \n\n\` ${questions[index]} \`.`;
        config.messages.answer =`"\n\nThe answer is: \n\n\`${answers[index]}\``;
        message.channel.send(config.messages.question);
        askingQuestion[index] = true;
      }
    }
  }
  else{
    if(message.author.bot) return;
    else if(message.content.indexOf(config.prefix) == 0){
      if(message.content.substr(config.prefix.length, message.content.length).toLowerCase() == config.messages.question){
        message.author.send(`The question, asked by ${users[index]}, was: \n\n\` ${questions[index]} \`.`);
        message.delete();
      }
      else if(message.content.substr(config.prefix.length, message.content.length).toLowerCase() == config.commands.help){
        message.author.send(config.messages.help);
        message.delete();
      }
      else if (message.content.substr(config.prefix.length, message.content.length).toLowerCase() == config.commands.reset && (message.member.highestRole.hasPermission("ADMINISTRATOR")|| message.author == users[index])){
        askingQuestion[index] = false;
        message.channel.send(config.messages.question + config.messages.reset);
        questions[index] = "";
        answers[index] = "";
        users[index] = "";
        prevUser[index] = "";
      }
      else return message.delete();
      return;
    }
    else if(message.author == users[index]){
      return message.delete();
    }
    else if(message.author == prevUser[index]){
      return message.delete();
    }
    else if(message.content.toLowerCase().indexOf(config.commands.goodbye) != -1){
      askingQuestion[index] = false;
      config.messages.question = `The question, asked by ${users[index]}, was: \n\n\` ${questions[index]} \`.`;
      config.messages.answer =`"\n\nThe answer is: \n\n\`${answers[index]}\``;-+
      message.channel.send(config.messages.question + config.messages.answer);
      questions[index] = "";
      answers[index] = "";
      users[index] = "";
      prevUser[index] = "";
      return;
    }
    else if(message.content.charAt(0) > 255){
      answers[index] += message.content;
      prevUser[index] = message.author;
      return;
    }
    else if(message.content.charAt(0) == '<' && message.content.charAt(1) == ':' && message.content.charAt(messge.content.length-1) == '>'){
      var i = 2;
      var id = "";
      for(i = 2; i < message.content.length && message.charAt(i) != ':'; i++){
      }
      if(i >= message.content.length){
        return message.delete();
      }
      else{
        for(i++; message.charAt(i) != '>'; i++){
          id += "" + message.charAt(i);
        }
        answers[index] += client.emojis.get(id);
        prevUser[index] = message.author;
      }
    }
    else if(message.content.length > 1){
      return message.delete();
    }
    else {
      answers[index] += message.content;
      prevUser[index] = message.author;
      return;
    } 
  }
});

client.login(config.token);
           