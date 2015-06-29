/*
 * The MIT License
 *
 * Copyright 2015 Igor.
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
package br.ufg.inf.everemind.servlets;

import br.ufg.inf.everemind.db.TokenDAO;
import br.ufg.inf.everemind.util.Hash;
import br.ufg.inf.everemind.db.UserDAO;
import br.ufg.inf.everemind.entity.User;
import br.ufg.inf.everemind.mailer.EmailAgent;
import br.ufg.inf.everemind.util.Token;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Leonardo
 */
public class ServletCreateUser extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {
            
            UserDAO userDao = UserDAO.getInstance();
            TokenDAO tokenDao = TokenDAO.getInstance();
            Hash hash = new Hash();
            Token token = new Token();
            EmailAgent ea = new EmailAgent();
            String url = request.getRequestURL().toString();
            String path = url.substring(0, url.lastIndexOf("/") + 1);
            String fullName = request.getParameter("fullName");
            String email = request.getParameter("email");
            String secondaryEmail = request.getParameter("secondaryEmail");
            String password = request.getParameter("password");
            userDao.save(new User(fullName, email, secondaryEmail, hash.getHash(password)));
            String primaryToken = token.generate();
            String secondaryToken = token.generate();
            tokenDao.bindVerifyToken(email, primaryToken);
            tokenDao.bindVerifyToken(secondaryEmail, secondaryToken);
            ea.sendWelcome(email, fullName, path);
            ea.sendToken(email, fullName, primaryToken, path + "primaryEmailVerification.jsp");
            ea.sendWelcome(secondaryEmail, fullName, path);
            ea.sendToken(secondaryEmail, fullName, secondaryToken, path + "secondaryEmailVerification.jsp");
            out.flush();
            
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
