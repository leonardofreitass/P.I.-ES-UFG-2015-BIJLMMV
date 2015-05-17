<%-- 
    Document   : dashboard
    Created on : 17/05/2015, 04:29:29
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="dashboard">
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="page-header">
                    <h3>Bem-vindo {{getUserName()}}<br><small>Use o menu acima para navegar no sistema!</small></h3>
                </div>
            </div>
        </div>
    </div>
</t:layout>