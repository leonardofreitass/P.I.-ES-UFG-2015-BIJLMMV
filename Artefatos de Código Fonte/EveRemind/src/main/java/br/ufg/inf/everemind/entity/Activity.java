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
package br.ufg.inf.everemind.entity;

import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 *
 * @author Igor
 */

public class Activity {

    private String _id;
    private String _idCategory;
    private String name;
    private int priority;
    private String date;
    private String hour;
    private String notes;
    private boolean notificationBehaviour;
    private boolean done;
    private String lastNotificationTime;
    private String nextNotificationTime;
    
    public Activity(String _idCategory,
            String name,
            int priority,
            String date,
            String hour,
            String notes,
            boolean notificationBehaviour,
            String lastNotificationTime,
            String nextNotificationTime) {
        this._idCategory = _idCategory;
        this.name = name;
        this.priority = priority;
        this.date = date;
        this.hour = hour;
        this.notes = notes;
        this.notificationBehaviour = notificationBehaviour;
        this.lastNotificationTime = lastNotificationTime;
        this.nextNotificationTime = nextNotificationTime;
    }

    public String getId() {
        return this._id;
    }

    public void setId(String _id) {
        this._id = _id;
    }

     public String getIdCategory() {
        return this._idCategory;
    }

    public void setIdCategory(String _idCategory) {
        this._idCategory = _idCategory;
    }
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPriority() {
        return this.priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getHour() {
        return this.hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }
    
    public Calendar getDateTime(){
        int d = Integer.parseInt(this.date.substring(0, 2));
        int m = Integer.parseInt(this.date.substring(3, 5)) - 1;
        int y = Integer.parseInt(this.date.substring(6, 10));
        int h = Integer.parseInt(this.hour.substring(0, this.hour.indexOf(":")));
        int min = Integer.parseInt(this.hour.substring(this.hour.indexOf(":") + 1, this.hour.indexOf(":") + 3));
        Calendar cal = new GregorianCalendar();
        cal.set(y, m, d, h, min);
        return cal;
    }

    public String getNotes() {
        return this.notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean getNotificationBehaviour() {
        return this.notificationBehaviour;
    }

    public void setNotificationBehaviour(boolean notificationBehaviour) {
        this.notificationBehaviour = notificationBehaviour;
    }

    public String getLastNotificationTime() {
        return this.lastNotificationTime;
    }

    public void setLastNotificationTime(String lastNotificationTime) {
        this.lastNotificationTime = lastNotificationTime;
    }

    public String getNextNotificationTime() {
        return nextNotificationTime;
    }

    public void setNextNotificationTime(String nextNotificationTime) {
        this.nextNotificationTime = nextNotificationTime;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
