# Use a lightweight official Python image
FROM python:3.10-slim

# Install system essentials required for compiling packages like llama-cpp-python
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy requirements file first to leverage Docker's caching
COPY requirements.txt .

# Limit parallel build jobs to prevent memory exhaustion on 8GB Macs
ENV CMAKE_BUILD_PARALLEL_LEVEL=1

# Install Python dependencies safely
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend source code into the container
COPY . .

# Expose port 8000 for FastAPI
EXPOSE 8000

# Run the FastAPI server via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]