# creamos la base de datos structure
# DROP DATABASE structure
CREATE DATABASE IF NOT EXISTS structure;
USE structure;

CREATE TABLE cart(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    url VARCHAR(400) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE permits(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    permitsType VARCHAR(255) NOT NULL,
    user_permits BOOLEAN NOT NULL,
    PRIMARY KEY(id)   
);
CREATE TABLE categories(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    permits_id INT UNSIGNED NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    passwordConfirmation VARCHAR(255) NOT NULL,
    image_id INT UNSIGNED,
    PRIMARY KEY(id),
    FOREIGN KEY (permits_id) REFERENCES permits(id),
    FOREIGN KEY (image_id) REFERENCES images(id)
);
CREATE TABLE products(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    price FLOAT(30) NOT NULL,
    stock INT UNSIGNED NOT NULL,
    image_id INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (image_id) REFERENCES images(id)
);
CREATE TABLE cart(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
	status INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE orderDetail(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
	cart_id INT UNSIGNED NOT NULL,
	payment_id ENUM("MasterCard","Visa","paypal","oxxo") NOT NULL,
    datePurchase DATE NOT NULL,
    address VARCHAR(45) NOT NULL,
    total DOUBLE UNSIGNED NOT NULL,
	status INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cart_id) REFERENCES cart(id)
);

CREATE TABLE discount (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    discount FLOAT(24) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

