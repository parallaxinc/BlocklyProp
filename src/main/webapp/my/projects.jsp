<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<c:set var="copparestricted" scope="page" value="${properties:copparestricted()}" />
<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />

<!DOCTYPE html>
<html>
    <head>
        <meta name="base" content="<url:getUrl url="/"/>">
        <meta name="application-name" content="BlocklyProp"/>
        
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="<url:getCdnUrl url="/images/mstile-144x144.png" />" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="57x57" href="<url:getCdnUrl url="/images/apple-touch-icon-57x57.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="114x114" href="<url:getCdnUrl url="/images/apple-touch-icon-114x114.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="72x72" href="<url:getCdnUrl url="/images/apple-touch-icon-72x72.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="144x144" href="<url:getCdnUrl url="/images/apple-touch-icon-144x144.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="120x120" href="<url:getCdnUrl url="/images/apple-touch-icon-120x120.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="152x152" href="<url:getCdnUrl url="/images/apple-touch-icon-152x152.png"/>" />
        <link type="image/png" rel="icon" sizes="32x32" href="<url:getCdnUrl url="/images/favicon-32x32.png"/>" />
        <link type="image/png" rel="icon" sizes="16x16" href="<url:getCdnUrl url="/images/favicon-16x16.png"/>" />

        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/simplemde.min.css"/>">
        <link rel="stylesheet" href="<url:getCdnUrl url="/style.css"/>" />
        
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/jquery.form.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/simplemde.min.js"/>" ></script>
        
        <script src="<url:getCdnUrl url="/project.js"/>" ></script>
        <!-- <script src="<url:getCdnUrl url="/authenticate.js"/>" ></script> -->
        
        
        
    </head> 
    <body>
        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>
        <!-- Display community projects -->
        <div id="project-table-container" class="container collapse">
            <div class="row">
                <div class="col-md-12">
                    
                    <h2><fmt:message key="my_project.list.title"/></h2>
                    
                    <jsp:include page="/WEB-INF/includes/pageparts/projecttable.jsp">
                        <jsp:param name="url" value="/rest/project/list" />
                        <jsp:param name="showuser" value="false" />
                    </jsp:include>
                    
                </div>
            </div>
        </div>
        <!-- Display community shared project form -->
        <jsp:include page="/WEB-INF/includes/pageparts/projectform.jsp">
            <jsp:param name="mine" value="true" />
            <jsp:param name="shared" value="false" />
        </jsp:include>
        <!-- Login modal dialog -->
        <%-- <%@ include file="/WEB-INF/includes/pageparts/project-login-dialog.jsp"%> --%>
        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>


<%--
        
        <script>
            // Define Blockly to prevent messages file from throwing an exception (TEMPORARY)
            var Blockly = {Msg:{}};
        </script>

        <!-- Internationalization text strings -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>

        <script>
            // Set the application version
            page_text_label['application_major'] = "<fmt:message key="application.major"/>";
            page_text_label['application_minor'] = "<fmt:message key="application.minor"/>";
            page_text_label['application_build'] = "<fmt:message key="application.build"/>";
        </script>

        <script>
            // Determine if we are looking at the user's project list or the community projects list
            var showMine = false;
            var shared = true;
            var tableUrl = '';
            var tableCols = [];
            
            function setView() {
                if (window.location.href.indexOf('/my/') > -1) {
                    showMine = true;
                    shared = false;
                    tableUrl = '/rest/project/list';
                    tableCols = [{
                        field: "board",
                        title: " ",
                        sortable: false,
                        formatter: "formatType",
                        width: "30px",
                        align: "center"
                    }, {
                        field: "name",
                        title: page_text_label["project_table_name"],
                        formatter: "formatProject",
                        sortable: true
                    }, {
                        field: "board",
                        title: page_text_label["project_table_board"],
                        sortable: true,
                        formatter: "formatBoard"
                    }, {
                        field: "description",
                        title: page_text_label["project_table_description"],
                        sortable: false,
                        formatter: "formatDescription"
                    }];
                } else {
                    showMine = false;
                    shared = true;
                    tableUrl = '/rest/shared/project/list';
                    tableCols = [{
                        field: "board",
                        title: " ",
                        sortable: false,
                        formatter: "formatType",
                        width: "30px",
                        align: "center"
                    }, {
                        field: "name",
                        title: page_text_label['project_table_name'],
                        formatter: "formatProject",
                        sortable: true
                    }, {
                        field: "board",
                        title: page_text_label['project_table_board'],
                        sortable: true,
                        formatter: "formatBoard"
                    }, {
                        field: 'description',
                        title: page_text_label['project_table_description'],
                        sortable: false,
                        formatter: "formatDescription"
                    }, {
                        field: "user",
                        title: page_text_label["project_table_user"],
                        formatter: "formatUser",
                        sortable: true
                    }];
                }
            }
            
            // TODO: Safe to delete? - No longer showing by language
            var languageUrls = {
                "PROPC": "<url:getCdnUrl url="/images/lang-icons/c.png" />",
                "SPIN": "<url:getCdnUrl url="/images/lang-icons/spin.png" />"
            };

            var boardIconUrls = {
                "activity-board": "<url:getCdnUrl url="/images/board-icons/IconActivityBoard.png" />",
                "s3": "<url:getCdnUrl url="/images/board-icons/IconS3.png" />",
                "heb": "<url:getCdnUrl url="/images/board-icons/IconBadge.png" />",
                "flip": "<url:getCdnUrl url="/images/board-icons/IconFlip.png" />",
                "other": "<url:getCdnUrl url="/images/board-icons/IconOtherBoards.png" />",
                "propcfile": "<url:getCdnUrl url="/images/board-icons/IconC.png" />"
            };

            function formatType(value, row) {
                return '<img src="' + boardIconUrls[value] + '" />';
            }

            function formatProject(value, row) {
                return "<a href='#" + row['id'] + "'>" + value + "</a>";
            }

            function formatUser(value, row) {
                return "<a href='<url:getUrl url="/public/profile" />?id-user=" + row['id-user'] + "'>" + value + "</a>";
            }

            var boards = {
                "activity-board": "<fmt:message key="project.board.activity-board" />",
                "s3": "<fmt:message key="project.board.s3" />",
                "heb": "<fmt:message key="project.board.heb" />",
                "flip": "<fmt:message key="project.board.flip" />",
                "other": "<fmt:message key="project.board.other" />",
                "propcfile": "<fmt:message key="project.board.propcfile" />"
            };

            function formatBoard(value, row) {
                var boardTranslation = boards[value];
                if (!boardTranslation) {
                    boardTranslation = boards['other'];
                }
                return boardTranslation;
            }

            function formatDescription(value, row) {
                if (value) {
                    if (value.length > 30) {
                        return value.substring(0, 27) + '&hellip;';
                    }
                }
                return value;
            }

            var boards = {
                "activity-board": "<fmt:message key="project.board.activity-board" />",
                "s3": "<fmt:message key="project.board.s3" />",
                "heb": "<fmt:message key="project.board.heb" />",
                "flip": "<fmt:message key="project.board.flip" />",
                "other": "<fmt:message key="project.board.other" />",
                "propcfile": "<fmt:message key="project.board.propcfile" />"
            };
            
            var baseUrl = $("meta[name=base]").attr("content");
            var cloneUrl = '';
            var deleteUrl = '';
            var linkShareUrl = '';

            var idProject = null;

            var simplemde = null;
                //$.get('/blockly/rest/project/list?sort=modified&order=desc&limit=10&offset=0', function(data) {console.log(data);}).fail(function(error){console.log(error);});

            $(document).ready(function () {
                
                //$.get('/blockly/rest/shared/project/list', function(data) {console.log(data);}).fail(function(error){console.log(error);});
                
                setView();
                simplemde = new SimpleMDE({element: document.getElementById("project-form-description"), hideIcons: ["link"], spellChecker: false});

                cloneUrl = $('.clone-project').data('href');
                deleteUrl = $('.delete-project').data('href');
                linkShareUrl = $('#project-link-share').data('href');
                if (window.location.hash && window.location.hash !== "#") {
                    loadProject(window.location.hash.substr(1));
                    $("#project-form-container").addClass('in');
                } else {
                    $("#project-table-container").addClass('in');
                }

                setView();
                $("#project-table").bootstrapTable({ 
                    columns: tableCols,
                    toolbar: "#toolbar",
                    search: false,
                    sidePagination: "server",
                    pagination: true,
                    sortName: "modified"
                });
                
                $(window).on('hashchange', function () {
                    if (window.location.hash && window.location.hash !== "#") {
                        showProject(window.location.hash.substr(1));
                    } else {
                        showTable();
                    }
                });

                $('#project-form').ajaxForm({
                    'beforeSerialize': function () {
                        $("#project-form-description").val(simplemde.value());
                        $("#project-form-description-html").val(simplemde.options.previewRender(simplemde.value()));
                    },
                    'success': function () {
                        $(".project-changed:not(.hidden").remove();
                        var projectChanged = $(".project-changed").clone().insertAfter(".project-changed");
                        projectChanged.removeClass("hidden");
                        projectChanged.delay(5000).fadeOut(400, function () {
                            projectChanged.remove();
                        });
                    }
                });

                $("#project-delete").click(function (e) {
                    e.preventDefault();
                    $("#project-delete-confirm").modal('show');
                });

                $("#project-delete-confirmed").click(function () {
                    window.location.href = $('.delete-project').attr('href');
                });

                $("#project-link-share-enable").click(function () {
                    var linkShareInput = $("#project-link-share");
                    if ($(this).prop('checked')) {
                        $.post(baseUrl + "projectlink", {'id': idProject, 'action': 'share'}, function (response) {
                            if (response['success']) {
                                linkShareInput.val(window.location.origin + linkShareUrl + idProject + "&key=" + response['share-key']);
                                linkShareInput.focus();
                                linkShareInput[0].setSelectionRange(0, linkShareInput.val().length);
                                linkShareInput.tooltip();
                                linkShareInput.tooltip('show');

                                $('.not-shared-project').addClass('hidden');
                                $('.shared-project').removeClass('hidden');
                            }
                        });


                    } else {
                        $.post(baseUrl + "projectlink", {'id': idProject, 'action': 'revoke'}, function (response) {
                            if (response['success']) {
                                linkShareInput.tooltip('destroy');
                                linkShareInput.val('');

                                $('.not-shared-project').removeClass('hidden');
                                $('.shared-project').addClass('hidden');
                            }
                        });
                    }
                });

                $("#project-link-share").click(function () {
                    var linkShareInput = $("#project-link-share");
                    linkShareInput[0].setSelectionRange(0, linkShareInput.val().length);
                });
            });

            function showTable() {
                setView();
                $("#project-table").bootstrapTable('refresh', {url: tableUrl});
                $("#project-table-container").collapse('show');
                $("#project-form-container").collapse('hide');
            }

            function showProject(idProject) {
                // Clear form
                $(".sharing").removeProp('checked').parent().removeClass('active');
                $('.your-project').addClass('hidden');
                $('.not-your-project').addClass('hidden');
                $('.not-shared-project').addClass('hidden');
                $('.shared-project').addClass('hidden');

                loadProject(idProject);
                $("#project-table-container").collapse('hide');
                $("#project-form-container").collapse('show');
            }

            function loadProject(idProject) {
                window.idProject = idProject;

                var linkShareInput = $("#project-link-share");
                linkShareInput.tooltip('destroy');
                linkShareInput.val('');
                $("#project-link-share-enable").prop('checked', false);

                // Get details
                $.get(baseUrl + "rest/shared/project/get/" + idProject, function (project) {
                    if (project['yours']) {
                        $('.your-project').removeClass('hidden');

                        if (project['share-key']) {
                            $("#project-link-share-enable").prop('checked', true);
                            linkShareInput.val(window.location.origin + linkShareUrl + idProject + "&key=" + project['share-key']);
                            linkShareInput.tooltip();

                            $('.shared-project').removeClass('hidden');
                        } else {
                            $('.not-shared-project').removeClass('hidden');
                        }
                    } else {
                        $('.not-your-project').removeClass('hidden');
                        $("#project-form-user").val(project['user']);
                    }
                    $("#project-form-id").val(project['id']);
                    $("#project-form-name").val(project['name']);

                    var boardTranslation = boards[project['board']];
                    if (!boardTranslation) {
                        boardTranslation = boards['other'];
                    }
                    $("#project-form-board").val(boardTranslation);
                    $("#project-form-created").val(project['created']);
                    $("#project-form-modified").val(project['modified']);
                    simplemde.value(project['description']);
                    $("#project-description-html").html(project['description-html']);
                    if (project['private']) {
                        $("#project-form-private").prop('checked', 'checked').parent().addClass('active');
                    } else if (project['shared']) {
                        $("#project-form-shared").prop('checked', 'checked').parent().addClass('active');
                    } else {
                        $("#project-form-private").prop('checked', 'checked').parent().addClass('active');
                        //$("#project-form-friends").prop('checked', 'checked').parent().addClass('active');
                    }

                    var openProjectLink = $("a.open-project-link");
                    //openProjectLink.removeClass("editor-c-link");
                    openProjectLink.attr("href", baseUrl + "editor/blocklyc.jsp?project=" + project['id']);
                    $('.clone-project').attr('href', cloneUrl + project['id']);
                    $('.delete-project').attr('href', deleteUrl + project['id']);
                });
            }

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();
            }
        </script>
                    
    </head>
    <body>
        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div id="project-table-container" class="container collapse">
            <div class="row">
                <div class="col-md-12">
                    <h2><span class="keyed-lang-string" key="my_project_list_title"></span></h2>


                    <table id="project-table"></table>
                </div>
            </div>
        </div>


        <div id="project-form-container"  class="container collapse">
            <div class="row">
                <div class="col-md-12">
                    <h2>
                        <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="keyed-lang-string" key="back"></span></a>
                        <span class="keyed-lang-string" key="project_details_title"></span>
                        <a class="btn btn-primary open-project-link editor-view-link" href="#" ><span class="keyed-lang-string" key="project_viewcode"></span></a>
                    </h2>
                    <!-- Post the form contents to /blockly/rest/project  -->
                    <form id="project-form" action="<url:getUrl url="/rest/project"/>" method="post">
                        <div class="alert alert-success alert-dismissible hidden project-changed" id="project-changed">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <p><span class="keyed-lang-string" key="project_changed"></span></p>
                        </div>
                        <input type="hidden" name="id" id="project-form-id"/>
                        <div class="form-group">
                            <label for="name"><span class="keyed-lang-string" key="project_name"></span></label>
                            <input type="text" class="form-control" name="name" id="project-form-name" required="required"/>
                        </div>
                        <div class="form-group not-your-project hidden">
                            <label for="user"><span class="keyed-lang-string" key="project_user"></span></label>
                            <input type="text" class="form-control" name="user" id="project-form-user" readonly="readonly"/>
                        </div>
                        <div class="form-group">
                            <table style="width:100%; padding:0;   font-size: 14px;">
                                <tr>
                                    <td style="padding-right:10px;">
                                        <label for="board"><span class="keyed-lang-string" key="project_board"></span></label>
                                        <input type="text" class="form-control" name="board" id="project-form-board" readonly="readonly"/>
                                    </td>
                                    <td style="padding-right:10px;">
                                        <label for="createdDate"><span class="keyed-lang-string" key="project_created"></span></label>
                                        <input type="text" class="form-control" name="createdDate" id="project-form-created" readonly="readonly"/>
                                    </td>
                                    <td>
                                        <label for="modifiedDate"><span class="keyed-lang-string" key="project_modified"></span></label>
                                        <input type="text" class="form-control" name="modifiedDate" id="project-form-modified" readonly="readonly"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="form-group">
                            <label for="description"><span class="keyed-lang-string" key="project_description"></span></label>
                            <div class="your-project hidden">
                                <textarea class="form-control" name="description" id="project-form-description"></textarea>
                            </div>
                            <input type="hidden" name="description-html" id="project-form-description-html" />
                            <div id="project-description-html" class="not-your-project hidden description-html"></div>
                        </div>

                        <c:if test="${copparestricted == true}">
                            <div class="form-group hidden">
                                <input type="hidden" name="sharing" class="sharing" value="private" id="project-form-private"/>
                            </div>
                        </c:if>

                        <c:if test="${copparestricted == false}">
                            <div class="form-group">
                                <label for="sharing"><span class="keyed-lang-string" key="project_sharing"></span></label><br/>
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" data-toggle="tooltip" title="Hide project from other users" data-placement="top" class="sharing" value="private" id="project-form-private"/>
                                        <span class="keyed-lang-string" key="project_sharing_private"></span>
                                    </label>
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" data-toggle="tooltip" title="Make project visible to other users" checked="checked" data-placement="top" class="sharing" value="shared" id="project-form-shared"/>
                                        <span class="keyed-lang-string" key="project_sharing_shared"></span>
                                    </label>
                                </div>
                            </div>

                            <shiro:authenticated>
                                <div class="form-group your-project hidden">
                                    <label for="share-link"><span class="keyed-lang-string" key="project_share-link"></span></label>
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <input type="checkbox" id="project-link-share-enable">
                                        </span>
                                        <input type="text" class="form-control"  name="share-link" id="project-link-share" data-href="<url:getUrl url="/projectlink?id="/>" title="Ctrl/&#8984; + c to copy" readonly="readonly"/>
                                    </div><!-- /input-group -->
                                </div>
                            </shiro:authenticated>
                        </c:if>

                        <shiro:authenticated>
                            <div class="modal-footer">
                                <div class="btn-group not-your-project hidden">
                                    <a class="btn btn-default clone-project" data-href="<url:getUrl url="/project?clone="/>" ><span class="keyed-lang-string" key="project_clonelink"></span></a>
                                </div>
                                <div class="btn-group your-project hidden">
                                    <button class="btn btn-primary keyed-lang-string" key="project_savelink"></button>
                                    <a class="btn btn-danger delete-project" data-href="<url:getUrl url="/project?delete="/>" id="project-delete" ><span class="keyed-lang-string" key="project_deletelink"></span></a>
                                    <a class="btn btn-default clone-project" data-href="<url:getUrl url="/project?clone="/>" ><span class="keyed-lang-string" key="project_clonelink"></span></a>
                                </div>
                            </div>
                        </shiro:authenticated>

                    </form>
                </div>
            </div>
        </div>

        <div id="project-delete-confirm" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"><span class="keyed-lang-string" key="project_delete_confirm_title"></span></h4>
                    </div>
                    <div class="modal-body">
                        <p class="not-shared-project hidden"><span class="keyed-lang-string" key="project_delete_confirm"></span></p>
                        <p class="shared-project hidden"><span class="keyed-lang-string" key="project_delete_confirm_shared"></span></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default keyed-lang-string" key="cancel" data-dismiss="modal"></button>
                        <button type="button" class="btn btn-dangerkeyed-lang-string" key="project_deletelink" id="project-delete-confirmed"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>


--%>