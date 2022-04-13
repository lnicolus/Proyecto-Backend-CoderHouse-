const fs = require('fs').promises
const moment = require('moment'); //requerimos moment para poner el formato de las fechas en el chat
 
class ChatHistory{
   constructor(){
       this.route= './public/chatHistory.txt'
       this.message= [];
   }
 
   async saveMessage(data){
       try{
           let newMessage = {
               email: data.email,
               text: data.text,
               date: moment().format('L LTS')
           }
           let displayedMessage = await this.displayMessage()
           displayedMessage.push(newMessage)
           await fs.writeFile(this.route, JSON.stringify(displayedMessage ,null, 2))
       }catch(error){
            throw new Error(error.message)
           }
      
       }

   async displayMessage(){
       try{
           let messageHistory = await fs.readFile(this.route)
           if(messageHistory.toString() != ''){
               this.message = JSON.parse(messageHistory)
           }
           return this.message
           
       }catch(error){           
                   throw new Error(error.message)
           }
   }
};
 
module.exports = ChatHistory
