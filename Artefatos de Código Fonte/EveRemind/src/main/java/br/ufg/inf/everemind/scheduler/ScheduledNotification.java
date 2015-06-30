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
/**
 *
 * @author Leonardo
 */
package br.ufg.inf.everemind.scheduler;

import br.ufg.inf.everemind.db.ActivityDAO;
import br.ufg.inf.everemind.db.CategoryDAO;
import br.ufg.inf.everemind.db.UserDAO;
import br.ufg.inf.everemind.entity.Activity;
import br.ufg.inf.everemind.entity.Category;
import br.ufg.inf.everemind.entity.User;
import br.ufg.inf.everemind.mailer.EmailAgent;
import br.ufg.inf.everemind.util.CalendarManager;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.TimerTask;

public class ScheduledNotification extends TimerTask {    
    private final String path;
    public ScheduledNotification(String path){
        this.path = path;
    }
    @Override
    public void run() {
        EmailAgent ea = new EmailAgent();
        ActivityDAO activityDao = ActivityDAO.getInstance();
        CategoryDAO categoryDao = CategoryDAO.getInstance();
        UserDAO userDao = UserDAO.getInstance();
        Calendar now = Calendar.getInstance();
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy-HH:mm");
        String notificationQuery = format.format(now.getTime());
        ArrayList<Activity> activities = activityDao.getNextToNotify(notificationQuery);
        System.out.println(notificationQuery + " - Enviando notificações para " + activities.size() + " atividades.");
        for (Activity activity : activities){
            Category cat = categoryDao.getById(activity.getIdCategory());
            User user = userDao.getById(cat.getIdUser());
            String userEmail = user.getEmail();
            if (notificationQuery.equals(format.format(activity.getDateTime().getTime()))){
                if(activity.getNotificationBehaviour() && user.isEmailVerified())
                    ea.sendDeadline(userEmail, cat.getName(), activity, this.path);
                activityDao.updateNotification(activity.getId(), notificationQuery, "");
            }
            else{
                if(activity.getNotificationBehaviour() && user.isEmailVerified())
                    ea.sendNotification(userEmail, cat.getName(), activity, this.path);
                Calendar future = Calendar.getInstance();
                future.setTime(now.getTime());
                future.add(Calendar.HOUR_OF_DAY, activity.getPriorityHourInterval());
                if (future.compareTo(CalendarManager.highestCalendar(activity.getLastNotifications())) > 0){
                    future = CalendarManager.highestCalendar(activity.getLastNotifications());
                }
                String nextNotification = format.format(future.getTime());
                activityDao.updateNotification(activity.getId(), notificationQuery, nextNotification);
            }
            
        }
    }
}
