<%-- 
    Document   : index.jsp
    Created on : 14/05/2015, 01:34:51
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="index">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img class="main-logo-img" src="img/eveRemindLogo(800).png"/>
            </div>
            <div class="col-md-6">
                <div class="page-header">
                    <h3>{{'home.mainTitle' | translate}}<br><small>{{'home.mainText' | translate}}<br><br>{{'home.createAccount' | translate}}<br><a type="submit" class="btn btn-warning" href="signup.jsp" role="button">{{'home.register' | translate}}</a></small></h3>
                </div>
            </div>
        </div>
    </div>
</t:layout>