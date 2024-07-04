# Use the official Python 3.10 image based on Debian Buster as the base image
FROM python:3.10-slim-buster

# Set the working directory inside the container to /backend-flask
WORKDIR /backend-flask

# Copy the requirements.txt file from your host to the working directory in the container
COPY requirements.txt requirements.txt

# Install the Python packages listed in requirements.txt using pip
RUN pip3 install -r requirements.txt

# Copy all files from your host to the working directory in the container
COPY . .

# Set the environment variable FLASK_ENV to 'development'
ENV FLASK_ENV=development

# Expose the specified port number (defined in a variable, likely in a docker-compose file or environment)
EXPOSE ${PORT}

# Define the command to run your application when the container starts
# python3 -m flask run --host=0.0.0.0 --port=4567
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]