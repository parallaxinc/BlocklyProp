<%--
    Document   : public profile
    Created on : 2-mei-2016, 20:15:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
    </head>
    <body>
        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-9 col-sm-12">
                    <h2><fmt:message key="public-profile.title" />: <span class="user"><%= request.getAttribute("screenname")%></span></h2>
                    <div>
                        <ul class="nav nav-pills" role="tablist">
                            <li role="presentation" id="select-projects" class="active"><a data-toggle="tab" href="#projects"><fmt:message key="public-profile.nav.projects" /></a></li>
                            <li role="presentation" id="select-profile"><a data-toggle="tab" href="#profile"><fmt:message key="public-profile.nav.profile" /></a></li>
                        </ul> 
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane" id="profile">
                                <h3><fmt:message key="public-profile.friends" /></h3>
                            </div>
                            <div role="tabpanel" class="tab-pane active" id="projects">
                                <h3><fmt:message key="public-profile.projects" /></h3>
                                <hr>
                                <ul class="latest-projects"></ul>
                                <hr>
                                <span id="project-list-pages">Projects: </span>

                                <script>
                                    var getUrlParameter = function getUrlParameter(sParam) {
                                        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                                                sURLVariables = sPageURL.split('&'),
                                                sParameterName,
                                                i;

                                        for (i = 0; i < sURLVariables.length; i++) {
                                            sParameterName = sURLVariables[i].split('=');

                                            if (sParameterName[0] === sParam) {
                                                return sParameterName[1] === undefined ? true : sParameterName[1];
                                            }
                                        }
                                    };


                                    var getUrl = window.location;
                                    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
                                    var pageUrl = getUrl.protocol + "/" + getUrl.host + "/" + getUrl.pathname.split('?')[0];

                                    var projectTypes = {
                                        "PROPC": {
                                            "editor": "blocklyc.jsp",
                                            "class": "editor-c-link"
                                        },
                                        "SPIN": {
                                            "editor": "blocklyspin.jsp",
                                            "class": "editor-spin-link"
                                        }
                                    };
                                    
                                    var page = 0;
                                    if(getUrlParameter('page') === undefined) page = 0;
                                    else {
                                        $('#profile').removeClass('active');                 
                                        $('#projects').addClass('active');                 
                                        $('#select-projects').tab('show');
                                        page = parseInt(getUrlParameter('page')) * 10;
                                    }
                                    
                                    $.get(baseUrl + "/rest/shared/project/list/" + getUrlParameter('id-user') + "?sort=modified&order=desc&limit=10&offset=" + page.toString(10), function (data) {
                                        $.each(data['rows'], function (index, project) {
                                            var projectItem = $("<li/>", {
                                                "class": "project"
                                            });
                                            $("<a/>", {
                                                "class": "editor-view-link editor-icon " + projectTypes[project['type']]['class'],
                                                "href": baseUrl + "/projects.jsp#" + project['id'],
                                                "text": project['name']
                                            }).appendTo(projectItem);
                                            $(".latest-projects").append(projectItem);
                                        });
                                        var projPages = parseInt(data['total']);
                                        for(var idx = 1; idx <= projPages; idx += 10) {
                                            var startNum = idx.toString(10);
                                            var endNum = (idx + 9).toString(10);
                                            if(endNum > projPages) endNum = projPages;
                                 
                                            var linkPage = parseInt(idx/10).toString(10);
                                            var btnLink = '';
                                            btnLink += '<a href="?id-user=' + getUrlParameter('id-user');
                                            btnLink += '&page=' + linkPage + '" class="btn btn-secondary btn-sm" ';
                                            btnLink += 'role="button" id="projPage-' + linkPage + '">';
                                            
                                            $("#project-list-pages").append(btnLink + startNum + "-" + endNum + "</a>");

                                            if(linkPage === getUrlParameter('page')) {
                                                $('#projPage-' + linkPage).removeClass('btn-secondary').addClass('btn-primary');
                                            } else if( getUrlParameter('page') === undefined && linkPage === '0') {
                                                $('#projPage-' + linkPage).removeClass('btn-secondary').addClass('btn-primary');
                                            }// Use to add active to button class
                                        }
                                    });

                                </script>    

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>


    </body>
</html>