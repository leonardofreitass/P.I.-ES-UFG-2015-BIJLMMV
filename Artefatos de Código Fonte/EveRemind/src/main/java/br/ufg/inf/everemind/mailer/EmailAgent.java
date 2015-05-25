/*
 * The MIT License
 *
 * Copyright 2015 Leonardo.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.ufg.inf.everemind.mailer;

/**
 *
 * @author Leonardo
 */
public class EmailAgent {
    
    public final String systemName = "eveRemind";
    public final String emailSignature = "Atenciosamente,</br></br>" + systemName + " Staff.";
    
    public void sendMessage(String receiver, String subject, String content){
        Mailer mailer = new Mailer(
                receiver, 
                systemName + " - " + subject, 
                content + "</br></br>" + emailSignature);
        new Thread(mailer).start();
    }
    
    public void sendWelcome(String receiver, String name){
        this.sendMessage(
                receiver, 
                "Bem Vindo!", 
                "Seja bem vindo ao eveRemind, " + name + "!</br></br>" +
                "Para utilizar todas nossas funcionalidades integralmente, verifique o seu email principal e secundário."
        );
    }
    
    public void sendToken(String receiver, String name, String token, String path){
        this.sendMessage(
                receiver, 
                "Confirmação de e-mail", 
                "Caro " + name + ",</br>" +
                "Seu cadastro no " + systemName + " foi efetuado com sucesso, porém, para desfrutar completamente de nossos serviços é preciso confirmar os e-mails fornecidos.</br>" +
                "Para confirmar este e-mail, clique no link abaixo:</br>" +
                "<a href='" + path + "#/verification?email=" + receiver + "&token=" + token + "'>Link de Confirmação</a></br></br>" +
                "Caso não esteja conseguindo acessar o link, faça os seguintes passos:<br><ol>" +
                "<li>Acesse esta página: <a href='" + path + "'>Link</a></li>" +
                "<li>Entre com os seguintes dados:</br><ul><li>Email: " + receiver + "</li><li>Código de Verificação: " + token + "</li></ul></li>" + 
                "</ol>"
        );
    }
    
    public void resendToken(String receiver, String name, String token, String path){
        this.sendMessage(
                receiver, 
                "Confirmação de e-mail", 
                "Caro " + name + ",</br>" +
                "Você modificou seu email no " + systemName + " e é preciso refazer a confirmação.</br>" +
                "Para confirmar este e-mail, clique no link abaixo:</br>" +
                "<a href='" + path + "#/verification?email=" + receiver + "&token=" + token + "'>Link de Confirmação</a></br></br>" +
                "Caso não esteja conseguindo acessar o link, faça os seguintes passos:<br><ol>" +
                "<li>Acesse esta página: <a href='" + path + "'>Link</a></li>" +
                "<li>Entre com os seguintes dados:</br><ul><li>Email: " + receiver + "</li><li>Código de Verificação: " + token + "</li></ul></li>" + 
                "</ol>"
        );
    }
}
