# -- Add docker app ... <%=@serverName %> --

cd <%=@dockerSettingPath %>

docker build -f <%=@dockerFile %> -t <%=@siteImage %> .

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>

docker run -d -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=<%=@keyCode%> <%=@cmdPorts%> \
  -v "<%=@dockerCodePath%>":/var/_localApp -v "<%=@dockerDataPath%>/mysql":/var/lib/mysql  --network network_easydocker --name <%=@siteContainer %>  <%=@siteImage %> 

# docker run -d -e MYSQL_USER=jxu -e MYSQL_PASSWORD=1234 -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=<%=@randomKey%> <%=@cmdPorts%> -v "<%=@dockerCodePath%>":/var/_localApp -v "<%=@dockerDataPath%>":/var/lib/mysql  --network network_easydocker --name <%=@siteContainer %>  <%=@siteImage %> 

# -e MYSQL_DATABASE=mysql
