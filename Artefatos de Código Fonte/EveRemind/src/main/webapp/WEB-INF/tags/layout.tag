<%-- 
    Document   : layout
    Created on : 14/05/2015, 01:25:20
    Author     : Leonardo
--%>

<!DOCTYPE html>
<%@tag description="Overall page layout" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@attribute name="pageID" required="true"%>
<html ng-app="everemindApp" ng-cloak>
    <head>
        <title>{{"pages.titles.${pageID}" | translate}}</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/vendor/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/vendor/toastr/toastr.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/site.css">
        <script>var pageID = "${pageID}";</script>
    </head>
    <body>
        <div ng-controller="ngMasterCtrl as mstrCtrl"></div>
        <div id="page-header" ng-controller="ngNavbarCtrl as navCtrl">
            <jsp:include page="/WEB-INF/templates/header.jsp" />
        </div>
        <div id="body" body-ctrl>
            <jsp:doBody/>
        </div>
        <div id="page-footer">
            <jsp:include page="/WEB-INF/templates/footer.jsp" />
        </div>
    </body>
</html>