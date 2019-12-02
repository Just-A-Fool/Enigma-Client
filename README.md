# Aedan's Enigma Client

Live app: https://aedan-enigma.now.sh/

Server GitHub: https://github.com/Just-A-Fool/Enigma-Server

## Summary

This app allows a user to learn about and use an Enigma Machine without the difficulty and expense that would come from trying to find and use a real-world counterpart. 

The user can input different settings representing the rotors and plugboard on the real Enigma. These settings can be saved for future use as well. 

![Inputs](https://user-images.githubusercontent.com/53919498/69988842-ac690080-14ff-11ea-86df-c8cfe87b270b.PNG)

The user can encrypt a message in the 'input' text-area and receive an encrypted version of that message in the 'output' text-area. This message can only be decrypted if the initial settings of the Enigma Machine are known. 

![In-output](https://user-images.githubusercontent.com/53919498/69988896-c6a2de80-14ff-11ea-8081-a7067bb7dc6f.PNG)

## Tutorial

Below is an example of encrypting the words "Hello there" in the enigma machine. Take note of the settings both in the rotors section as well as the plugboard section. The encrypted message ends up being "CVDUI UUHFV".

![tut1](https://user-images.githubusercontent.com/53919498/69988969-e803ca80-14ff-11ea-91e5-4eca15920a6a.PNG)

Here we try to decode the message "CVDUI UUHFV" but unfortunately we have the incorrect settings. The machine then outputs nonsense due to us having the incorrect initial settings.

![tut2](https://user-images.githubusercontent.com/53919498/69988981-ed611500-14ff-11ea-97a2-b15499594ed8.PNG)

If we decrypt the message "CVDUI UUHFV" with the correct settings however, we get our initial message back. 

![tut3](https://user-images.githubusercontent.com/53919498/69988992-f356f600-14ff-11ea-9a7e-ba8c32d86459.PNG)

## Technology Used

Javascript, React, CSS, HTML
