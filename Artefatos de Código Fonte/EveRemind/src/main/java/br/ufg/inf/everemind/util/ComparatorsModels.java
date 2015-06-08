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

import br.ufg.inf.everemind.entity.Activity;
import java.util.Comparator;

/**
 *
 * @author Leonardo
 */
public class ComparatorsModels {

    public static Comparator<Activity> activityByDate() {
        return new Comparator<Activity>() {
            @Override
            public int compare(Activity o1, Activity o2) {
                if (o1.getDateTime().compareTo(o2.getDateTime()) != 0)
                    return o1.getDateTime().compareTo(o2.getDateTime());
                else
                    return o2.getPriority() - o1.getPriority();
                    
            }
        };
    }
    
    public static Comparator<Activity> activityByPriority() {
        return new Comparator<Activity>() {
            @Override
            public int compare(Activity o1, Activity o2) {
                if (o2.getPriority() - o1.getPriority() != 0)
                    return o2.getPriority() - o1.getPriority();
                else
                    return o1.getDateTime().compareTo(o2.getDateTime());
            }
        };
    }
}
