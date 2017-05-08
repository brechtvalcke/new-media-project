int DOOR_PIN = A4;
int MOTION_PIN = A0;

int incomingData = -1; //serial data
int delayTime = 20;
int timer = 0;

bool ledActive = false;
bool isActive = false;

void setup() {
  Serial.begin(9600);

  digitalWrite(LED2, LOW);
  digitalWrite(LED1, LOW);
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

  int doorData = analogRead(DOOR_PIN);
  int motionData = analogRead(MOTION_PIN);
  
  Serial.println("door:"+String(doorData)+"#");
  Serial.println("motion:"+String(motionData)+"#");
  
  delay(delayTime);
}

void checkData(int data){
  if(data == 1){
    isActive = true;
  }
  if(data == 2){
    isActive = false;
  }
  if(data == 3){
      setLed2(HIGH);
  }
  if(data == 4){
      setLed2(LOW);
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
}

void setLed2(int ledStatus){
  digitalWrite(LED1, ledStatus);
}
