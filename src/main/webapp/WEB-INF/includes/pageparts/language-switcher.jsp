<%@ include file="/WEB-INF/includes/include.jsp"%>

<form>
    <select id="language" name="language" onchange="submit()">
        <option value="en" ${language == 'en' ? 'selected' : ''}>English</option>
        <%-- <option value="nl" ${language == 'nl' ? 'selected' : ''}>Nederlands</option>
        <option value="es" ${language == 'es' ? 'selected' : ''}>Español</option> --%>
    </select>
</form>