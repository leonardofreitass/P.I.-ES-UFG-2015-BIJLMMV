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
package br.ufg.inf.everemind.util;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 *
 * @author Leonardo
 */
public class CalendarManager {
    public static ArrayList<String> getCurrentWeek(){
        Calendar now = Calendar.getInstance();

        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        String[] days = new String[7];
        int delta = -now.get(GregorianCalendar.DAY_OF_WEEK) + 1; //add 2 if your week start on monday
        now.add(Calendar.DAY_OF_MONTH, delta );
        for (int i = 0; i < 7; i++)
        {
            days[i] = format.format(now.getTime());
            now.add(Calendar.DAY_OF_MONTH, 1);
        }
        return new ArrayList<>(Arrays.asList(days));
    }
    
    public static ArrayList<String> getWeek(String day){
        Calendar calDay = getDayByString(day);

        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        String[] days = new String[7];
        int delta = -calDay.get(GregorianCalendar.DAY_OF_WEEK) + 1; //add 2 if your week start on monday
        calDay.add(Calendar.DAY_OF_MONTH, delta );
        for (int i = 0; i < 7; i++)
        {
            days[i] = format.format(calDay.getTime());
            calDay.add(Calendar.DAY_OF_MONTH, 1);
        }
        return new ArrayList<>(Arrays.asList(days));
    }
    
    public static Calendar getDayByString(String day){
        Calendar calDay = new GregorianCalendar();
        int year = Integer.parseInt(day.substring(day.lastIndexOf("/") + 1));
        int month = Integer.parseInt(day.substring(day.indexOf("/") + 1, day.lastIndexOf("/"))) - 1;
        int date = Integer.parseInt(day.substring(0, day.indexOf("/")));
        calDay.set(year, month, date);
        return calDay;
    }
    
    public static String getNextDay(String day){
        Calendar calDay = getDayByString(day);
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        calDay.add(Calendar.DAY_OF_MONTH, 1);
        return format.format(calDay.getTime());
    }
    
    public static String getPreviousDay(String day){
        Calendar calDay = getDayByString(day);
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        calDay.add(Calendar.DAY_OF_MONTH, -1);
        return format.format(calDay.getTime());
    }
}
