#include <BME280.h>
#include <BME280I2C.h>
#include <BME280Spi.h>
#include <BME280SpiSw.h>

int HEAT_PIN = A0;

int incomingData = -1; //serial data
int delayTime = 100;
int timer = 0;

bool ledActive = false;
bool isActive = false;

BME280I2C bme;

int temp = 0;

void setup() {
  Serial.begin(9600);
  digitalWrite(LED2, LOW);
  digitalWrite(LED1, LOW);
  
  while(!Serial) {} // Wait
  while(!bme.begin()){
    Serial.println("Could not find BME280I2C sensor!");
    delay(1000);
  } 
}

void loop(){
  if(isActive){
    soundAlarm();
  }else{
    ledActive = false;
  }

  if(ledActive){
    setLed(HIGH);
  }else{
    setLed(LOW);
  }
  
  if(Serial.available() > 0){
    incomingData = Serial.read() - '0';
    checkData(incomingData);
  }

  int heatData = bme.temp();
  
  Serial.println("temp:"+String(heatData)+"#");
  
  delay(delayTime);
}

void checkData(int data){
  if(data == 1){
    isActive = true;
  }
  if(data == 2){
    isActive = false;
  }
}

void soundAlarm(){
  timer += delayTime;
  if(timer > 1000){
    timer = 0;
    ledActive = !ledActive;
  }
}

void setLed(int ledStatus){
  digitalWrite(LED2, ledStatus);
  digitalWrite(LED1, ledStatus);
}
