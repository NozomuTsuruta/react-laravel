FROM php:7.4

RUN apt-get update -y && apt-get install -y openssl zip upzip git
RUN curl -$S https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring pdo_mysql

WORKDIR /app
COPY . .
RUN composer install
CMD php artisan serve --host=0.0.0.0
EXPOSE 8000