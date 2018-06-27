# AskOuijaDiscord
A Discord bot to emulate https://reddit.com/r/askouija in a Discord channel
## Add the bot to your own server!
1. Go to https://discordapp.com/oauth2/authorize?client_id=375883731057246208&scope=bot&permissions=76800, add the bot to your server and **give it read, write, and manage (message delete) permissions! the bot won't work without those (yet)!**
2. Create the Discord channel `#askouija`.
## How to use in your server
1. In `#askouija`, Type `Ouija, ` and a question you want Ouija to ask.
2. Everyone in the channel can now reply 1 character responses to answer the question
3. type `goodbye` to end answering and see your answer.
* If you made the question (or if you're an admin), you can use Ouija, reset to stop question answering.
* If you made the current question, you cannot help answer at all.
* If you just added a letter, you have to wait for someone else to add a letter brfore you can continue or finish answering.
## How to use your own bot (needs node.js)
1. go into `config.json` and add your bot key where needed
2. download and modify `app.js` to your liking
3. use `npm install discord.js` to install dependencies
4. use `node app.js` to run your bot
5. go to https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot&permissions=1 to add your bot to your server
## Todo
* ~~prevent users from replying to their own question, spamming responses~~
* add emojis to be answerable
* fix glitch that causes bot to crash for unknown reason
