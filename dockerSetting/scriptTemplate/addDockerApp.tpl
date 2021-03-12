# -- Add docker app ... <%=@serverName %> --

cd <%=@dockerSettingPath %>

docker build -f <%=@dockerFile %> -t <%=@siteImage %> .

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>

docker run -d -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=<%=@keyCode%> <%=@cmdPorts%> \
  -v "<%=@dockerCodePath%>":/var/_localApp -v "<%=@dockerDataPath%>":/var/_localAppData \
  -v "<%=@dockerEnvPath%>":/var/_localEnv \
  -v "<%=@dockerDataPath%>/mysql":/var/lib/mysql  --network network_easydocker --name <%=@siteContainer %>  <%=@siteImage %> 
