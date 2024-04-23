# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies for Tesseract-OCR
RUN apt-get update && apt-get install -y \
    # tesseract-ocr \
    libtesseract-dev

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install uvicorn

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Set the PATH environment variable to include /usr/local/bin after uvicorn is installed
ENV PATH="/usr/local/bin:${PATH}"

# Run your application using a different web server or framework, for example:
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
