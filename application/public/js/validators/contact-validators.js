var email;
var assunto;
var corpo;
var isValid;
function validateEmail(){
    email = ipt_email.value
    email = email.trim()
    var temEspaco = false;
    var contador = 0;
    while (contador < email.length) {
        if (email[contador] === " ") {
          temEspaco = true;
          break;
        }
        contador++
    }
    if (temEspaco) {responseValidator.innerHTML = `Não é permitido endereço de email com espaços`; isValid = false; responseValidator.style.color = 'red';}
    else if (!email.includes('@')|| !email.includes('.com')){ responseValidator.innerHTML = `Insira um endereço de email válido`; isValid = false; responseValidator.style.color = 'red';}
    else if (email !== email.toLowerCase()){ responseValidator.innerHTML = `Insira caracteres minúsculos apenas`; isValid = false; responseValidator.style.color = 'red';}
    else { responseValidator.innerHTML = ``; isValid = true }
}
function validateSubject(){
    assunto = ipt_assunto.value
    if(assunto.length < 4) {responseValidator.innerHTML = `Tamanho do assunto é insuficiente`; isValid = false;  responseValidator.style.color = 'red';}
    else if(assunto.length > 200){responseValidator.innerHTML = `Tamanho do assunto é excedente`; isValid = false; responseValidator.style.color = 'red'; }
    else if(assunto.trim().length === 0){responseValidator.innerHTML = `Insira um assunto que contenha caracteres`; isValid = false; responseValidator.style.color = 'red'; }
    else if(assunto.includes('<') || assunto.includes('>')){responseValidator.innerHTML = `Seu assunto tem caracteres proibidos (<, >)`; isValid = false;  responseValidator.style.color = 'red';}
    else {responseValidator.innerHTML = ``; isValid = true;}
}
function validateBody(){
     corpo = ipt_corpo.value
    if(corpo.length < 10) {responseValidator.innerHTML = `Tamanho de corpo do texto é insuficiente`; isValid = false; responseValidator.style.color = 'red';}
    else if(corpo.length > 2000){responseValidator.innerHTML = `Tamanho de corpo do texto é excedente`; isValid = false;  responseValidator.style.color = 'red'; }
    else if(corpo.trim().length === 0){responseValidator.innerHTML = `Insira um corpo do texto que contenha caracteres`; isValid = false;  responseValidator.style.color = 'red'; }
    else if(corpo.includes('<') || corpo.includes('>')){responseValidator.innerHTML = `Seu corpo do texto tem caracteres proibidos (<, >)`; isValid = false;  responseValidator.style.color = 'red'; }
    else {responseValidator.innerHTML = ``; isValid = true;}
}
function submitContact(){
    if(isValid){
        responseValidator.style.color = 'blue';
        responseValidator.innerHTML = `Mensagem enviada com sucesso`;
    }
    else{
        responseValidator.style.color = 'red';
        responseValidator.innerHTML = `Corrija ou insira os dados para o envio!`;
    }
}
