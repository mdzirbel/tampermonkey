# import required module
from playsound import playsound

def alarm():
	# for playing note.mp3 file
	playsound('alarm.wav', False)
	print('playing sound using  playsound')

from flask import Flask, redirect, url_for, render_template, request, session
from datetime import timedelta

appFlask = Flask(__name__)
appFlask.secret_key = "27eduCBA09"
@appFlask.route("/alarm", methods = ['GET'])
def login():
	print("Got post")
	alarm()
	return "<p>a</p>"

appFlask.run(debug=True)
  