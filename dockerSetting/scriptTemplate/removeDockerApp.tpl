
# -- Remove docker app ... <%=@serverName %> ---

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>

docker image rm -f <%=@siteImage %>
