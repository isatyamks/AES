import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///exam.db')
    ML_MODEL_PATH = os.environ.get('ML_MODEL_PATH', 'models/')