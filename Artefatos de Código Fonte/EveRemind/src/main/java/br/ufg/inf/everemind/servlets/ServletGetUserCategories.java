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
package br.ufg.inf.everemind.servlets;

import br.ufg.inf.everemind.db.ActivityDAO;
import br.ufg.inf.everemind.db.CategoryDAO;
import br.ufg.inf.everemind.entity.Activity;
import br.ufg.inf.everemind.entity.Category;
import br.ufg.inf.everemind.scheduler.ScheduledNotification;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Leonardo
 */
public class ServletGetUserCategories extends HttpServlet {

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
        response.setContentType("application/json");
        /*
        TimerTask tasknew = new ScheduledNotification();
        Timer timer = new Timer();

        timer.scheduleAtFixedRate(tasknew, 0, 1000 * 60); 
        /**/
        try (PrintWriter out = response.getWriter()) {
            String idUser = request.getParameter("idUser");
            boolean activities = Boolean.valueOf(request.getParameter("activities"));
            CategoryDAO categoryDao = CategoryDAO.getInstance();
            ActivityDAO activityDao = ActivityDAO.getInstance();
            ArrayList<Category> list = categoryDao.getAll(idUser);
            JSONArray array = new JSONArray();
            for (Category category : list) {
                JSONObject categoryJSON = new JSONObject();
                if (activities){
                    ArrayList<Activity> listActivities = activityDao.getAllFromCategory(category.getId(), true, true);
                    JSONArray arrayActivities = new JSONArray();
                    for (Activity activity : listActivities) {
                        JSONObject activityJSON = new JSONObject();
                        activityJSON.put("id", activity.getId());
                        activityJSON.put("name", activity.getName());
                        activityJSON.put("description", activity.getNotes());
                        activityJSON.put("date", activity.getDate());
                        activityJSON.put("time", activity.getHour());
                        activityJSON.put("priority", activity.getPriority());
                        activityJSON.put("notification", activity.getNotificationBehaviour());
                        arrayActivities.put(activityJSON);
                    }
                    categoryJSON.put("activities", arrayActivities);
                }
                categoryJSON.put("id", category.getId());
                categoryJSON.put("name", category.getName());
                categoryJSON.put("color", category.getColor());
                categoryJSON.put("minimized", true);
                categoryJSON.put("hovering", false);
                
                array.put(categoryJSON);
            }
            out.print(array);
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
