const char* hostGet = "data.gamer4life.net";

void pushData(){
	WiFiClient clientGet;
	const int httpGetPort = 80;

	String urlGet = "/index.php";

	String src = "ESP8266_Home";
	String typ = "data";
	String data = "TheData";

	urlGet += "?src="+src+"&typ="+data+"&data="+data;

	Serial.print(">>> Connecting to host: ");
	Serial.println(hostGet);

	if(!clientGet.connect(hostGet, httpGetPort)) {
		Serial.print("Connection failed: ");
		Serial.print(hostGet);
	}else{
		clientGet.println("GET " + urlGet + " HTTP/1.1");
		clientGet.print("Host: ");
		clientGet.println(hostGet);
		clientGet.println("User-Agent: ESP8266/1.0");
		clientGet.println("Connection: close\r\n\r\n");

		unsigned long timeoutP = millis();
		while (clientGet.available() == 0) {

			if (millis() - timeoutP > 10000) {
				Serial.print(">>> Client Timeout: ");
				Serial.println(hostGet);
				clientGet.stop();
				return;
			}
		}

		while(clientGet.available()){
            String retLine = clientGet.readStringUntil('\r');
            Serial.println(retLine);
            break; 
          }
	}

	Serial.print(">>> Closing host: ");
    Serial.println(hostGet);
          
}

void setup() {
    Serial.begin(115200);
}

void loop() {

  postData();

  delay(10000);

}