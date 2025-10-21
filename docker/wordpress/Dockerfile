FROM wordpress:php8.4-fpm

ADD config.d /usr/local/etc/php/conf.d

RUN sed -i 's/^;catch_workers_output = yes/catch_workers_output = yes/' /usr/local/etc/php-fpm.d/www.conf && \
    sed -i 's/^;access.log = log\/$pool.access.log/access.log = \/proc\/self\/fd\/2/' /usr/local/etc/php-fpm.d/www.conf && \
    sed -i 's/^;php_admin_value\[error_log\] = log\/php_errors.log/php_admin_value\[error_log\] = \/proc\/self\/fd\/2/' /usr/local/etc/php-fpm.d/www.conf
