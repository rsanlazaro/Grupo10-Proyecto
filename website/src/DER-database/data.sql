USE structure;
# antes de usar la base de datos cargar 
INSERT INTO categories (id, category) VALUES (1, 'tazas');
INSERT INTO categories (id, category) VALUES (2, 'termos');
INSERT INTO categories (id, category) VALUES (3, 'gorras');
INSERT INTO categories (id, category) VALUES (4, 'playeras');
INSERT INTO categories (id, category) VALUES (5, 'llaveros');
INSERT INTO categories (id, category) VALUES (6, 'rompecabezas');
INSERT INTO categories (id, category) VALUES (7, 'especiales');

INSERT INTO products (id, category_id, productName, descriptionn, price, quantity, product_image) VALUES (1, 1, 'queso', 'queso', 12, 12, '1633483620763_img.jpg');
INSERT INTO products (id, category_id, productName, descriptionn, price, quantity, product_image) VALUES (2, 1, 'queso', 'queso', 12, 12, '1633483620763_img.jpg');
INSERT INTO products (id, category_id, productName, descriptionn, price, quantity, product_image) VALUES (3, 1, 'queso', 'queso', 12, 12, '1633483620763_img.jpg');
INSERT INTO products (id, category_id, productName, descriptionn, price, quantity, product_image) VALUES (4, 1, 'queso', 'queso', 12, 12, '1633483620763_img.jpg');
INSERT INTO products (id, category_id, productName, descriptionn, price, quantity, product_image) VALUES (5, 1, 'queso', 'queso', 12, 12, '1633483620763_img.jpg');

INSERT INTO permissions (id, rol) VALUES (1,'Administrador');
INSERT INTO permissions (id, rol) VALUES (2,'Cliente');

#######################################################################3333
INSERT INTO users (id, userName, id_rol, email, passwordd, user_image) VALUES (1, 'ale', 2, 'perro_@hotmail.com', '12345678', '1635068263602_img.png');

INSERT INTO carts(product_carts_id) VALUES (NULL);

INSERT INTO user_carts(id, user_id, product_id, cart_status) VALUES (1, 1, 1,'activo');
