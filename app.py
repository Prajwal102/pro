from flask import Flask,render_template
app = Flask(__name__)

@app.route("/")
def hello():
  return render_template('index.html')

  
@app.route("/table")
def table():
  return render_template('table.html')

if __name__ == "__main__":
  app.run(debug=True)
