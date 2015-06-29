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
public class EmailDefaultScope {
        private final static String BUTTON_LINE = "<div style=\"border:1px solid #EEA236;border-radius:3px;\">\n" +
"            <table style=\"width:auto;border-collapse:collapse;\"><tbody><tr><td style=\"font:14px/1.4285714 Arial, sans-serif;padding:4px 10px;background-color:#F0AD4E;\">\n" +
"                  \n" +
"              {{THIRD_LINE}}\n" +
"            \n" +
"                </td>\n" +
"              </tr></tbody></table></div>";
        private final static String DEFAULT_SCOPE = "<table style=\"width:100%;border-collapse:collapse;\"><tbody><tr><td style=\"font:14px/1.4285714 Arial, sans-serif;padding:10px 10px 0;background:#FCD68A;\">\n" +
"            <table style=\"width:100%;border-collapse:collapse;\"><tbody><tr><td id=\"ecxmain\" style=\"font:14px/1.4285714 Arial, sans-serif;padding:0;background-color:#ffffff;border-radius:5px;\">\n" +
"    <div style=\"border:1px solid #cccccc;border-radius:5px;padding:20px;\">\n" +
"      <table style=\"width:100%;border-collapse:collapse;\"><tbody><tr><td style=\"font:14px/1.4285714 Arial, sans-serif;padding:0;\">\n" +
"              <p style=\"\">\n" +
"                \n" +
"                  {{FIRST_LINE}}\n" +
"                \n" +
"              </p>\n" +
"              <p style=\"\">\n" +
"                \n" +
"                  {{SECOND_LINE}}\n" +
"                \n" +
"              </p>\n" +
"            </td>\n" +
"          </tr><tr><td class=\"ecxcall-to-action\" style=\"font:14px/1.4285714 Arial, sans-serif;padding:15px 0 0;\">\n" +
"  <table style=\"width:auto;border-collapse:collapse;\"><tbody><tr><td class=\"ecxcall-to-action-inner\" style=\"font:14px/1.4285714 Arial, sans-serif;padding:0;\">\n" +
"          {{BUTTON_LINE}}\n" +
"        </td>\n" +
"      </tr></tbody></table></td>\n" +
"\n" +
"          </tr></tbody></table></div>\n" +
"  </td>\n" +
"</tr><tr><td style=\"font:14px/1.4285714 Arial, sans-serif;padding:20px 0;color:#707070;\">\n" +
"  <table style=\"width:100%;border-collapse:collapse;\"><tbody><tr><td style=\"font:14px/1.4285714 Arial, sans-serif;padding:0;\">\n" +
"          \n" +
"          \n" +
"        </td>\n" +
"        <td style=\"font:14px/1.4285714 Arial, sans-serif;padding:0;\">\n" +
"          \n" +
"        </td>\n" +
"        <td style=\"font:14px/1.4285714 Arial, sans-serif;padding:0;text-align:right;width:100px;\">\n" +
"          <a href=\"{{PATH}}\" style=\"color:#3572b0;text-decoration:none;\" target=\"_blank\">\n" +
"            <img src=\"http://i12.photobucket.com/albums/a246/undeaddragslayer/eveRemind-navbar_zpsgdfog0mh.png\" alt=\"EveRemind\" width=\"100\" height=\"23\"></a>\n" +
"        </td>\n" +
"      </tr></tbody></table></td>\n" +
"\n" +
"                </tr></tbody></table></td>\n" +
"        </tr></tbody></table>";
        
    public static String makeEmail(String firstLine, String secondLine, String thirdLine, String path){
        String ret = DEFAULT_SCOPE;
        ret = ret.replace("{{FIRST_LINE}}", firstLine).
                  replace("{{SECOND_LINE}}", secondLine).
                  replace("{{PATH}}", path);
        if (!thirdLine.equals("")){
            ret = ret.replace("{{BUTTON_LINE}}", BUTTON_LINE.replace("{{THIRD_LINE}}", thirdLine));
        }
        else{
            ret = ret.replace("{{BUTTON_LINE}}", "");
        }
        return ret;
    }
}
