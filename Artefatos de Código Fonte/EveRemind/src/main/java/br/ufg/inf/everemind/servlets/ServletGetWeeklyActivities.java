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
import br.ufg.inf.everemind.entity.Activity;
import br.ufg.inf.everemind.entity.Category;
import br.ufg.inf.everemind.util.CalendarManager;
import br.ufg.inf.everemind.util.ComparatorsModels;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
public class ServletGetWeeklyActivities extends HttpServlet {

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
            /* TODO output your page here. You may use following sample code. */
            String action = request.getParameter("action");
            String sortBy = "date";
            boolean onlyInTime = false;
            boolean onlyUndone = false;
            ActivityDAO activityDao = ActivityDAO.getInstance();
            //CalendarManager.getWeek(CalendarManager.getNextDay("27/06/2015"));
            if (action.equals("start")){
                int weeksToLoad = Integer.parseInt(request.getParameter("weeks"));
                JSONArray weeks = new JSONArray();
                ArrayList<ArrayList<String>> weeksArray = new ArrayList<>();
                weeksArray.add(CalendarManager.getCurrentWeek());
                for (int i = 0; i < weeksToLoad - 1; i++){
                    ArrayList<String> w = weeksArray.get(i);
                    weeksArray.add(CalendarManager.getWeek(CalendarManager.getNextDay(w.get(6))));
                }
                for(ArrayList<String> currentWeek : weeksArray){
                    JSONArray weekJson = new JSONArray();
                    for(String day : currentWeek){
                        JSONObject dayJson = new JSONObject();
                        JSONArray dayArr = new JSONArray();
                        ArrayList<Activity> listActivities = activityDao.getFromDay(day, onlyUndone, onlyInTime);

                        Comparator comp;
                        if (sortBy.equals("priority"))
                            comp = ComparatorsModels.activityByPriority();
                        else
                            comp = ComparatorsModels.activityByDate();

                        Collections.sort(listActivities, comp);

                        for (Activity activity : listActivities) {
                            JSONObject activityJSON = new JSONObject();
                            activityJSON.put("id", activity.getId());
                            activityJSON.put("idCategory", activity.getIdCategory());
                            activityJSON.put("name", activity.getName());
                            activityJSON.put("description", activity.getNotes());
                            activityJSON.put("date", activity.getDate());
                            activityJSON.put("time", activity.getHour());
                            activityJSON.put("priority", activity.getPriority());
                            activityJSON.put("notification", activity.getNotificationBehaviour());
                            activityJSON.put("done", activity.isDone());
                            activityJSON.put("expired", activity.isExpired());
                            dayArr.put(activityJSON);
                        }
                        dayJson.put("day", day);
                        dayJson.put("activities", dayArr);
                        weekJson.put(dayJson);
                    }
                    weeks.put(weekJson);
                }
                out.print(weeks);
                out.flush();
            }
            else if (action.equals("next")){
                String last = request.getParameter("last");
                JSONArray week = new JSONArray();
                ArrayList<String> getWeek = CalendarManager.getWeek(CalendarManager.getNextDay(last));
                for(String day : getWeek){
                    JSONObject dayJson = new JSONObject();
                    JSONArray dayArr = new JSONArray();
                    ArrayList<Activity> listActivities = activityDao.getFromDay(day, onlyUndone, onlyInTime);

                    Comparator comp;
                    if (sortBy.equals("priority"))
                        comp = ComparatorsModels.activityByPriority();
                    else
                        comp = ComparatorsModels.activityByDate();

                    Collections.sort(listActivities, comp);

                    for (Activity activity : listActivities) {
                        JSONObject activityJSON = new JSONObject();
                        activityJSON.put("id", activity.getId());
                        activityJSON.put("idCategory", activity.getIdCategory());
                        activityJSON.put("name", activity.getName());
                        activityJSON.put("description", activity.getNotes());
                        activityJSON.put("date", activity.getDate());
                        activityJSON.put("time", activity.getHour());
                        activityJSON.put("priority", activity.getPriority());
                        activityJSON.put("notification", activity.getNotificationBehaviour());
                        activityJSON.put("done", activity.isDone());
                        activityJSON.put("expired", activity.isExpired());
                        dayArr.put(activityJSON);
                    }
                    dayJson.put("day", day);
                    dayJson.put("activities", dayArr);
                    week.put(dayJson);
                }
                out.print(week);
                out.flush();
            }
            else if (action.equals("previous")){
                String first = request.getParameter("first");
                JSONArray week = new JSONArray();
                ArrayList<String> getWeek = CalendarManager.getWeek(CalendarManager.getPreviousDay(first));
                for(String day : getWeek){
                    JSONObject dayJson = new JSONObject();
                    JSONArray dayArr = new JSONArray();
                    ArrayList<Activity> listActivities = activityDao.getFromDay(day, onlyUndone, onlyInTime);

                    Comparator comp;
                    if (sortBy.equals("priority"))
                        comp = ComparatorsModels.activityByPriority();
                    else
                        comp = ComparatorsModels.activityByDate();

                    Collections.sort(listActivities, comp);

                    for (Activity activity : listActivities) {
                        JSONObject activityJSON = new JSONObject();
                        activityJSON.put("id", activity.getId());
                        activityJSON.put("idCategory", activity.getIdCategory());
                        activityJSON.put("name", activity.getName());
                        activityJSON.put("description", activity.getNotes());
                        activityJSON.put("date", activity.getDate());
                        activityJSON.put("time", activity.getHour());
                        activityJSON.put("priority", activity.getPriority());
                        activityJSON.put("notification", activity.getNotificationBehaviour());
                        activityJSON.put("done", activity.isDone());
                        activityJSON.put("expired", activity.isExpired());
                        dayArr.put(activityJSON);
                    }
                    dayJson.put("day", day);
                    dayJson.put("activities", dayArr);
                    week.put(dayJson);
                }
                out.print(week);
                out.flush();
            }
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
