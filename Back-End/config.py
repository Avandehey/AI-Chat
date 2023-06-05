#imports of module, whick gives acces to various OS functionalities
import os

class Config():
    #sets the SECRET KEY variable used in cryptographic operations 
    SECRET_KEY = os.environ.get('SECRET_KEY')
    #set the alchemy variable used in connecting to my database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')