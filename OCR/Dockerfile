# Use an official Python runtime as a parent image
FROM python:3.8

# Set the working directory in the container
WORKDIR /code

# Install dependencies for Tesseract-OCR
RUN apt-get update && apt-get install -y \
    # tesseract-ocr \
    libtesseract-dev

# Copy the current directory contents into the container at /usr/src/app
# COPY . .
COPY ./requirements.txt /code/requirements.txt


# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80


# Run your application using a different web server or framework, for example:
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
