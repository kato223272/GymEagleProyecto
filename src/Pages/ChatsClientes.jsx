import React,{useState,useEffect} from "react";
import '../Css/ChatsClientes.css'

const ChatsClientes = () => {
    const [nickname, setNickname] = useState('')
    const [disabled, setDisabled] = useState(false)
  
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [storedMessages, setStoredMessages] = useState([])
    const [firstTime, setfirstTime] = useState(false)
  
    const url = "http://localhost:4000/api/"
  
    useEffect(() =>{
      const receivedMessage = (message) =>{
        //console.log(message)
        setMessages([message, ...messages])
      
      }
      socket.on('message', receivedMessage)
  
      //Desuscribimos el estado del componente cuando ya no es necesario utilizarlo
      return () => {
        socket.off('message', receivedMessage)
      }
      
  
    }, [messages])
  
    //Cargamos los mensajes guardados en la BDD la primera vez
    if(!firstTime){
      axios.get(url + "messages").then(res => {
        setStoredMessages(res.data.messages);
      })
      setfirstTime(true)
    }
    
  
    const handlerSubmit = (e) => {
      //Evitamos recargar la página
      e.preventDefault()
  
      //Enviamos el mensaje sólo si se ha establecido un nickname
      if(nickname !== ''){
        //console.log(message)
        //Enviamos el mensaje al servidor
        socket.emit('message', message, nickname)
  
        //Nuestro mensaje
        const newMessage = {
          body: message,
          from: 'Yo'
        }
        //Añadimos el mensaje y el resto de mensajes enviados
        setMessages([newMessage, ...messages])
        //Limpiamos el mensaje
        setMessage('')
  
        //Petición http por POST para guardar el artículo:
        axios.post(url + 'save', {
          message: message,
          from: nickname
        })
  
      }else{
        alert('Para enviar mensajes debes establecer un nickname!!!')
      }
      
    }
  
    const nicknameSubmit = (e) => {
      e.preventDefault()
      setNickname(nickname)
      //console.log(nickname)
      setDisabled(true)
    }



    return(
        <div className="containerChats">
            <div className="containerClientes">
                <p>Div lateral para los clientres</p>
            </div>

            <div className="containerMensajes">
            </div>
        </div>
    );
}

export default ChatsClientes

// https://www.youtube.com/watch?v=HggSXt1Hzfk
// https://github.com/CodenautaJorge/React-socketio-chat
// https://github.com/UrielBm/app-chat-react