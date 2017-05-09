#!/bin/bash
#LOGGING_FOLDER="some path # point it to where you want the log files
TEMP_FOLDER="temp"
RESPONSE="0"
TIMEOUT=720
ALL_OK="true"

#mkdir -p "$LOGGING_FOLDER"
mkdir -p "$TEMP_FOLDER"

function getResponse() {
	url=$1
	wget --server-response -q -o wgetOut "$url"
	_wgetHttpCode=$(cat wgetOut | gawk '/HTTP/{ print $2 }')
	if [ ! -z "$_wgetHttpCode" ];then
   		RESPONSE=$_wgetHttpCode
	fi
}

function isServiceRunning() {
	n=0
	until [ $n -eq 1 ]
		do
			getResponse "$1"
			echo "$TIMEOUT seconds until timeout :: Response from $1 HTTP $RESPONSE" | sed 's/200/OK/g' | xargs echo -n
			echo
			if [  "$RESPONSE" == "200" ] || [ "$RESPONSE" == "302" ];then
				return
			fi
			if [  "$TIMEOUT" -lt 1  ];then
				printf "\rTimes Up!!                                                                                                          "
   				echo ""
				sleep 1
				exit 1
			fi
			sleep 1
			ALL_OK="false"
			TIMEOUT=$((TIMEOUT-1))
			n=$((n+1))
	done
}

checkResponses() {
	if [ -d "$TEMP_FOLDER" ]; then
		cd "$TEMP_FOLDER" || exit
	fi
    isServiceRunning "http://localhost:8080/index.html"
# 	isServiceRunning "http://localhost:10000/swagger-ui.html"
	isServiceRunning "http://127.0.0.1:4444/wd/hub/static/resource/hub.html"
}

waitUntilSystemIsReady() {
	until [ $TIMEOUT -lt 0 ]
		do
			ALL_OK="true"
			checkResponses
			[ $ALL_OK == "true" ] && break
	done
	printf "\rAll services ready at %s seconds!!                                                                                                            " $TIMEOUT
	echo ""
}

startServices() {
	java -Xmx256m -Xss256k -jar build/libs/ui-service-0.1.0.jar > /dev/null 2>&1 &
#	java -Xmx256m -Xss256k -jar -Dspring.mongodb.embedded.storage.databaseDir="$TEMP_FOLDER"/mongo-test-db ../portfolio-service/build/libs/portfolio-service-0.1.0.jar > /dev/null 2>&1 &
	./node_modules/.bin/selenium-standalone install > /dev/null 2>&1
	./node_modules/.bin/selenium-standalone start > /dev/null 2>&1 &
}

setUpTestDB() {
   cp -R cucumber_configuration/mongo-test-db "$TEMP_FOLDER"
   sleep 10
}

runCucumberTest() {
    cd ..
    ./gradlew npm_test --no-daemon
}

cleanUp() {
    if [ -d "$TEMP_FOLDER" ]; then
		rm -rf "$TEMP_FOLDER" || exit
	fi
}

shutdownAnyRunningServices() {
	some_service_pid="$(ps ax | grep -i 'ui-service*' | grep -v grep | awk '{print $1}' | xargs)"
	if [ "$some_service_pid" ]; then
    	echo "terminating ui with pid ${some_service_pid}"
    	kill ${some_service_pid}
	fi
#	some_service_pid="$(ps ax | grep -i 'portfolio*' | grep -v grep | awk '{print $1}' | xargs)"
#	if [ "$some_service_pid" ]; then
#    	echo "terminating portfolio-service with pid ${some_service_pid}"
#    	kill ${some_service_pid}
#	fi
	some_service_pid="$(ps ax | grep -i 'selenium*' | grep -v grep | awk '{print $1}' | xargs)"
	if [ "$some_service_pid" ]; then
    	echo "terminating selenium with pid ${some_service_pid}"
    	kill ${some_service_pid}
	fi
}

#setUpTestDB
startServices
waitUntilSystemIsReady
runCucumberTest
shutdownAnyRunningServices
cleanUp
#exit 0