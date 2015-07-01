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

import br.ufg.inf.everemind.entity.Activity;

/**
 *
 * @author Leonardo
 */
public class EmailAgent {

    public final String systemName = "EveRemind";

    public void sendMessage(String receiver, String subject, String content) {
        Mailer mailer = new Mailer(
                receiver,
                systemName + " - " + subject,
                content);
        new Thread(mailer).start();
    }

    public void sendWelcome(String receiver, String name, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "Seja bem vindo ao eveRemind, <b>" + name + "</b>!",
                "Para utilizar nossas funcionalidades integralmente, verifique o seu email.",
                "",
                path);
        this.sendMessage(
                receiver,
                "Bem Vindo!",
                messageScope
        );
    }

    public void sendToken(String receiver, String name, String token, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "Seu cadastro no <i>EveRemind</i> com o usuário <b>" + name + "</b> foi"
                        + " efetuado com sucesso, mas para utilizar os serviços de notificação "
                        + "de atividade e recuperação de senha é preciso confirmar seu e-mail.",
                "Para verificar este e-mail, clique no botão abaixo.",
                "<a href=\"" + path + "#/verification?email=" + receiver + "&token=" + token + "\" style=\"color:white;text-decoration:none;font-weight:bold;\" target=\"_blank\">Confirmar Email</a>",
                path.substring(0, path.lastIndexOf("/") + 1));

        this.sendMessage(
                receiver,
                "Confirmação de e-mail",
                messageScope
        );
    }
    
    public void resendToken(String receiver, String token, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "Esta mensagem foi enviada para reconfirmar seu email.",
                "Para confirmar este e-mail, clique no botão abaixo.",
                "<a href=\"" + path + "#/verification?email=" + receiver + "&token=" + token + "\" style=\"color:white;text-decoration:none;font-weight:bold;\" target=\"_blank\">Confirmar Email</a>",
                path.substring(0, path.lastIndexOf("/") + 1));

        this.sendMessage(
                receiver,
                "Confirmação de e-mail",
                messageScope
        );
    }

    public void sendNewToken(String receiver, String name, String token, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "Você modificou seu email no eveRemind e é preciso refazer a confirmação"
                + " para continuar a usar os serviços de email.",
                "Para confirmar este novo e-mail, clique no botão abaixo.",
                "<a href=\"" + path + "#/verification?email=" + receiver + "&token=" + token + "\" style=\"color:white;text-decoration:none;font-weight:bold;\" target=\"_blank\">Confirmar Email</a>",
                path.substring(0, path.lastIndexOf("/") + 1));

        this.sendMessage(
                receiver,
                "Confirmação de e-mail",
                messageScope
        );
    }

    public void sendPasswordRecover(String receiver, String token, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "Uma solicitação para redefinir sua senha no eveRemind foi iniciada recentemente. <br/>"
                + "Caso esta solicitação não tenha sido feita por você, desconsidere este email. <br/>"
                + "Se deseja redefinir sua senha, visite o link no botão abaixo e informe este endereço"
                        + " de email e o seguinte código: <br><b>" + token + "</b>",
                "",
                "<a href=\"" + path + "\" style=\"color:white;text-decoration:none;font-weight:bold;\" target=\"_blank\">Redefinir Senha</a>",
                path.substring(0, path.lastIndexOf("/") + 1));
        this.sendMessage(
                receiver,
                "Redefinir Senha",
                messageScope
        );
    }

    public void sendNotification(String receiver, String categoryName, Activity activity, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "A sua atividade <b>" + activity.getName() + "</b> de prioridade <span style='color: " + activity.getPriorityColor() + "'>" + activity.getPriorityName() + "</span>"
                + " está marcada para <b>" + activity.getDate() + "</b>, às <b>" + activity.getHour()
                + "</b>.<br><br><b>Descrição da atividade:</b> " + activity.getNotes() + ".",
                "Se esta atividade já foi concluida, sinalize-a como feita para desativar estas notificações sobre ela.",
                "",
                path);

        this.sendMessage(
                receiver,
                categoryName + " | " + activity.getName(),
                messageScope
        );
    }

    public void sendDeadline(String receiver, String categoryName, Activity activity, String path) {
        String messageScope = EmailDefaultScope.makeEmail(
                "O prazo para sua atividade <b>" + activity.getName() + "</b> de prioridade <span style='color: " + activity.getPriorityColor() + "'>" + activity.getPriorityName() + "</span>"
                + " acabou de se esgotar. Ela estava prevista para <b>" + activity.getDate() + "</b>, às <b>" + activity.getHour()
                + "</b>.<br><br><b>Descrição da atividade:</b> " + activity.getNotes() + ".",
                "Se ela foi concluída, você ainda pode marcar essa atividade como feita no sistema.",
                "",
                path);

        this.sendMessage(
                receiver,
                categoryName + " | " + activity.getName(),
                messageScope
        );
    }

}
