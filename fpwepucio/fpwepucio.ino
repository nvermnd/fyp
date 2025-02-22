#include <Adafruit_Fingerprint.h>
#include <FirebaseESP32.h>
#include <WiFi.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include <time.h>

// WiFi credentials
#define WIFI_SSID "Wifi"
#define WIFI_PASSWORD "12345678"

// Firebase Configuration
#define API_KEY "AIzaSyAj9rjBPi803rVh6BsrNx_WoTO6KOATwwM"
#define DATABASE_URL "https://ronit-2bc1f-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define USER_EMAIL "tronit777@gmail.com"
#define USER_PASSWORD "123456"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

HardwareSerial mySerial(2); // UART2
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup() {
  Serial.begin(115200);
  connectWiFi();
  configTime(0, 0, "pool.ntp.org", "time.nist.gov"); // Initialize NTP

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;

  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);
  Firebase.begin(&config, &auth);

  delay(2000);
  if (Firebase.ready()) {
    Serial.println("Firebase initialized successfully.");
  } else {
    Serial.println("Failed to initialize Firebase.");
    Serial.println(fbdo.errorReason());
  }

  mySerial.begin(57600, SERIAL_8N1, 16, 17);
  finger.begin(57600);
  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) delay(1);
  }

  showMenu();
}

void loop() {
  if (Serial.available()) {
    char choice = Serial.read();
    switch (choice) {
      case '1':
        enrollFingerprint();
        break;
      case '2':
        updateFingerprint();
        break;
      case '3':
        deleteFingerprint();
        break;
      case '4':
        verifyFingerprint();
        break;
      default:
        Serial.println("Invalid choice. Please try again.");
        showMenu();
        break;
    }
  }

  checkFingerprint();
}

void connectWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
}

void showMenu() {
  Serial.println("Choose an option:");
  Serial.println("1. Enroll Fingerprint");
  Serial.println("2. Update Fingerprint");
  Serial.println("3. Delete Fingerprint");
  Serial.println("4. Verify Fingerprint");
}

uint8_t readnumber() {
  uint8_t num = 0;
  while (num == 0) {
    while (!Serial.available());
    num = Serial.parseInt();
  }
  return num;
}

void enrollFingerprint() {
  Serial.println("Ready to enroll a fingerprint!");
  Serial.println("Please type in the ID # (from 1 to 127), then press Enter:");
  uint8_t id = readnumber();
  if (id == 0) { 
    Serial.println("ID #0 is not allowed.");
    return; 
  }

  // Check if the ID is already used
  String path = "/users/" + String(id);
  if (Firebase.getString(fbdo, path + "/name")) {
    Serial.println("ID is already used. Please choose a different ID.");
    return;
  }

  Serial.println("Enter the name of the user and press Enter:");
  while (!Serial.available());
  String name = Serial.readStringUntil('\n');
  name.trim();

  Serial.println("Enter the email of the user and press Enter:");
  while (!Serial.available());
  String email = Serial.readStringUntil('\n');
  email.trim();

  Serial.println("Enter the password for the user and press Enter:");
  while (!Serial.available());
  String password = Serial.readStringUntil('\n');
  password.trim();

  if (enrollFingerprintSingleScan(id)) {
    String timestamp = getCurrentTimestamp();
    if (Firebase.setString(fbdo, path + "/name", name) &&
        Firebase.setString(fbdo, path + "/email", email) &&
        Firebase.setString(fbdo, path + "/password", password) &&
        Firebase.setString(fbdo, path + "/timestamp", timestamp)) {
      Serial.println("Data sent to Firebase successfully!");
    } else {
      Serial.println("Error sending data to Firebase:");
      Serial.println(fbdo.errorReason());
    }
  } else {
    Serial.println("Fingerprint enrollment failed. Data not saved.");
  }
  showMenu();
}

bool enrollFingerprintSingleScan(uint8_t id) {
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  int p = -1;

  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    if (p == FINGERPRINT_NOFINGER) {
      Serial.print(".");
    } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
      Serial.println("Communication error");
      return false;
    } else if (p == FINGERPRINT_IMAGEFAIL) {
      Serial.println("Imaging error");
      return false;
    } else if (p == FINGERPRINT_OK) {
      Serial.println("Image taken");
    } else {
      Serial.println("Unknown error");
      return false;
    }
  }

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) {
    Serial.println("Error converting image to template.");
    return false;
  }

  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Fingerprint successfully enrolled!");
    return true;
  } else {
    Serial.println("Failed to store fingerprint.");
    return false;
  }
}

void updateFingerprint() {
  Serial.println("Please type in the ID # to update (from 1 to 127), then press Enter:");
  uint8_t id = readnumber();
  if (id == 0) {
    Serial.println("ID #0 is not allowed.");
    return;
  }

  Serial.println("Enter the new name of the user and press Enter:");
  while (!Serial.available());
  String newName = Serial.readStringUntil('\n');
  newName.trim();

  Serial.println("Enter the new email of the user and press Enter:");
  while (!Serial.available());
  String newEmail = Serial.readStringUntil('\n');
  newEmail.trim();

  Serial.println("Enter the new password for the user and press Enter:");
  while (!Serial.available());
  String newPassword = Serial.readStringUntil('\n');
  newPassword.trim();

  String path = "/users/" + String(id);
  if (Firebase.setString(fbdo, path + "/name", newName) &&
      Firebase.setString(fbdo, path + "/email", newEmail) &&
      Firebase.setString(fbdo, path + "/password", newPassword)) {
    Serial.println("Data updated in Firebase successfully!");
  } else {
    Serial.println("Error updating data in Firebase:");
    Serial.println(fbdo.errorReason());
  }
  showMenu();
}

void deleteFingerprint() {
  Serial.println("Please type in the ID # to delete (from 1 to 127), then press Enter:");
  uint8_t id = readnumber();
  if (id == 0) {
    Serial.println("ID #0 is not allowed.");
    return;
  }

  String path = "/users/" + String(id);
  if (Firebase.deleteNode(fbdo, path)) {
    Serial.println("Data deleted from Firebase successfully!");
  } else {
    Serial.println("Error deleting data from Firebase:");
    Serial.println(fbdo.errorReason());
  }
  showMenu();
}

void verifyFingerprint() {
  Serial.println("Please place your finger on the sensor to verify.");
  unsigned long startTime = millis();
  bool verified = false;

  while (millis() - startTime < 5000) {
    int result = finger.getImage();
    if (result != FINGERPRINT_OK) {
      continue;
    }

    result = finger.image2Tz();
    if (result != FINGERPRINT_OK) {
      continue;
    }

    result = finger.fingerSearch();
    if (result == FINGERPRINT_OK) {
      uint8_t matchedID = finger.fingerID;
      Serial.print("Fingerprint matched with ID: ");
      Serial.println(matchedID);

      // Verify if the ID exists in Firebase
      String path = "/users/" + String(matchedID);
      if (Firebase.getString(fbdo, path + "/name")) {
        String timestamp = getCurrentTimestamp();
        String checkPath = "/users/" + String(matchedID) + "/lastCheck";
        String checkTypePath = "/users/" + String(matchedID) + "/checkType";
        String currentCheckType;

        // Get the current check type (check-in or check-out) from Firebase
        if (Firebase.getString(fbdo, checkTypePath)) {
          currentCheckType = fbdo.stringData();
        } else {
          currentCheckType = "check-in";
        }

                // Toggle between check-in and check-out
        if (currentCheckType == "check-in") {
          Firebase.setString(fbdo, checkTypePath, "check-out");
        } else {
          Firebase.setString(fbdo, checkTypePath, "check-in");
        }

        if (Firebase.setString(fbdo, checkPath, timestamp)) {
          Serial.println("Check-in/out time updated in Firebase successfully!");
        } else {
          Serial.println("Error updating check-in/out time in Firebase:");
          Serial.println(fbdo.errorReason());
        }

        verified = true;
      } else {
        Serial.println("Fingerprint ID not registered.");
      }
      break;
    }
  }

  if (!verified) {
    Serial.println("Fingerprint not found or verification timed out.");
  }

  showMenu();
}

void checkFingerprint() {
  int p = finger.getImage();
  if (p == FINGERPRINT_OK) {
    p = finger.image2Tz();
    if (p == FINGERPRINT_OK) {
      p = finger.fingerSearch();
      if (p == FINGERPRINT_OK) {
        uint8_t matchedID = finger.fingerID;
        Serial.print("Fingerprint matched with ID: ");
        Serial.println(matchedID);

        // Verify if the ID exists in Firebase
        String path = "/users/" + String(matchedID);
        if (Firebase.getString(fbdo, path + "/name")) {
          String timestamp = getCurrentTimestamp();
          String checkPath = "/users/" + String(matchedID) + "/lastCheck";
          String checkTypePath = "/users/" + String(matchedID) + "/checkType";
          String currentCheckType;

          // Get the current check type (check-in or check-out) from Firebase
          if (Firebase.getString(fbdo, checkTypePath)) {
            currentCheckType = fbdo.stringData();
          } else {
            currentCheckType = "check-in";
          }

          // Toggle between check-in and check-out
          if (currentCheckType == "check-in") {
            Firebase.setString(fbdo, checkTypePath, "check-out");
          } else {
            Firebase.setString(fbdo, checkTypePath, "check-in");
          }

          if (Firebase.setString(fbdo, checkPath, timestamp)) {
            Serial.println("Check-in/out time updated in Firebase successfully!");
          } else {
            Serial.println("Error updating check-in/out time in Firebase:");
            Serial.println(fbdo.errorReason());
          }
        } else {
          Serial.println("Fingerprint ID not registered.");
        }
      } else {
        Serial.println("Fingerprint not found.");
      }
    }
  }
}

String getCurrentTimestamp() {
  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);
  char timestamp[30];
  sprintf(timestamp, "%04d-%02d-%02d %02d:%02d:%02d", 
          p_tm->tm_year + 1900, p_tm->tm_mon + 1, p_tm->tm_mday, 
          p_tm->tm_hour, p_tm->tm_min, p_tm->tm_sec);
  return String(timestamp);
}
