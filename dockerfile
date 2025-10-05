# Use official PHP CLI image
FROM php:8.2-cli

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Install required extensions and Composer
RUN apt-get update && apt-get install -y git unzip \
    && docker-php-ext-install sockets \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php && php composer.phar install

# Expose the port your WebSocket server listens on (change if using another port)
EXPOSE 8080

# Run your Ratchet server when container starts
CMD ["php", "server.php"]
