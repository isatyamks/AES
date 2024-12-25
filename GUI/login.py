import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QPushButton, QComboBox
from PyQt5.QtCore import Qt

# Login Screen
class LoginScreen(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Exam System - Login")
        self.setGeometry(300, 150, 400, 200)

        self.layout = QVBoxLayout()

        self.username_label = QLabel("Username:")
        self.username_input = QLineEdit()
        self.username_input.setPlaceholderText("Enter your username")
        
        self.password_label = QLabel("Password:")
        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("Enter your password")
        self.password_input.setEchoMode(QLineEdit.Password)

        self.login_button = QPushButton("Login")
        self.login_button.clicked.connect(self.authenticate_user)

        self.layout.addWidget(self.username_label)
        self.layout.addWidget(self.username_input)
        self.layout.addWidget(self.password_label)
        self.layout.addWidget(self.password_input)
        self.layout.addWidget(self.login_button)

        self.setLayout(self.layout)

    def authenticate_user(self):
        # Simple authentication (replace with real logic later)
        username = self.username_input.text()
        password = self.password_input.text()

        if username == "student" and password == "password":  # Example check
            self.main_screen = MainExamScreen()
            self.main_screen.show()
            self.close()
        else:
            self.username_input.setText('')
            self.password_input.setText('')


# Main Exam Screen
class MainExamScreen(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Online Exam")
        self.setGeometry(300, 150, 600, 400)

        self.layout = QVBoxLayout()

        self.question_label = QLabel("Question 1: What is 2 + 2?")
        self.answer_input = QLineEdit()
        self.answer_input.setPlaceholderText("Enter your answer here")

        self.start_exam_button = QPushButton("Start Exam")
        self.start_exam_button.clicked.connect(self.start_exam)

        self.layout.addWidget(self.question_label)
        self.layout.addWidget(self.answer_input)
        self.layout.addWidget(self.start_exam_button)

        self.setLayout(self.layout)

    def start_exam(self):
        # Replace this with logic for starting exam, using AI/ML detection
        question = self.question_label.text()
        answer = self.answer_input.text()
        print(f"Starting exam with question: {question}")
        print(f"Student's answer: {answer}")
        # Here you can integrate AI/ML, face detection, etc.


# Main Program
def main():
    app = QApplication(sys.argv)

    login_screen = LoginScreen()
    login_screen.show()

    sys.exit(app.exec_())

if __name__ == '__main__':
    main()
