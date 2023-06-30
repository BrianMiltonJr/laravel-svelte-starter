FROM php:8.1-fpm

ENV DOCKERIZE_VERSION 0.6.1

RUN curl -s -f -L -o /tmp/dockerize.tar.gz https://github.com/jwilder/dockerize/releases/download/v$DOCKERIZE_VERSION/dockerize-linux-amd64-v$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf /tmp/dockerize.tar.gz \
    && rm /tmp/dockerize.tar.gz

ENV COMPOSER_VERSION 2.1.5

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=$COMPOSER_VERSION

RUN curl -sL https://deb.nodesource.com/setup_19.x | bash

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ghostscript \
        pdftk \
        libmagickwand-dev \
        libz-dev \
        libpq-dev \
        libjpeg-dev \
        libpng-dev \
        libssl-dev \
        libzip-dev \
        unzip \
        zip \
        nodejs \
    && pecl install imagick \
    && apt-get clean \
    && docker-php-ext-configure gd \
    && docker-php-ext-configure zip \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install \
        gd \
        exif \
        pdo_mysql \
        pdo_pgsql \
        pgsql \
        pcntl \
        zip \
    && docker-php-ext-enable imagick \
    && rm -rf /var/lib/apt/lists/*;

COPY ./docker/development/php/laravel.ini /usr/local/etc/php/conf.d/laravel.ini
COPY ./docker/development/php/policy.xml /etc/ImageMagick-6/policy.xml

WORKDIR /usr/src/app

RUN chown -R www-data:www-data .