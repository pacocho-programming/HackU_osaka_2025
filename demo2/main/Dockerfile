# ベースイメージとしてPHP + Apacheを使用
FROM php:8.1-apache

# 必要なPHP拡張をインストール
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composerのインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# ドキュメントルートを設定
WORKDIR /var/www/html

# Firebase PHP SDKの依存関係をインストール
COPY composer.json composer.lock /var/www/html/
RUN composer install

# Apacheの設定を更新 (必要に応じて)
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf
