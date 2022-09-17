CREATE TABLE IF NOT EXISTS sizes (
    size_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(size_id)
);

CREATE TABLE IF NOT EXISTS colors (
    color_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(color_id)
);

CREATE TABLE IF NOT EXISTS manufactures (
    manufacture_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(manufacture_id)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(category_id)
);

CREATE TABLE IF NOT EXISTS countries (
    country_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(country_id)
);

CREATE TABLE IF NOT EXISTS brands (
    brand_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(brand_id)
);

CREATE TABLE IF NOT EXISTS types (
    type_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(type_id)
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    rate FLOAT NOT NULL DEFAULT 0,
    rates_count INT NOT NULL DEFAULT 0,
    quantity INT NOT NULL,
    brand_id INT NOT NULL,
    manufacture_id INT NOT NULL,
    country_id INT NOT NULL,
    type_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY(product_id),
    FOREIGN KEY(brand_id) REFERENCES brands(brand_id),
    FOREIGN KEY(manufacture_id) REFERENCES manufactures(manufacture_id),
    FOREIGN KEY(country_id) REFERENCES countries(country_id),
    FOREIGN KEY(type_id) REFERENCES types(type_id),
    FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS images (
    image_id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    is_main_img BOOLEAN,
    PRIMARY KEY(image_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY(review_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS addresses (
    address_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country_id INT NOT NULL,
    address_1 VARCHAR(255) NOT NULL,
    address_2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    mobile_phone VARCHAR(255) NOT NULL,
    additional_mobile_phone VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(address_id),
    FOREIGN KEY(country_id) REFERENCES countries(country_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS bags (
    bag_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    PRIMARY KEY(bag_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS sales (
    sale_id INT NOT NULL AUTO_INCREMENT,
    value INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY(sale_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS overviews (
    overview_id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY(overview_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS bag_items (
    bag_item_id INT NOT NULL AUTO_INCREMENT,
    bag_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    size_id INT NOT NULL,
    color_id INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY(bag_item_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id),
    FOREIGN KEY(bag_id) REFERENCES bags(bag_id),
    FOREIGN KEY(size_id) REFERENCES sizes(size_id),
    FOREIGN KEY(color_id) REFERENCES colors(color_id)
);

CREATE TABLE IF NOT EXISTS product_size_relations (
    size_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY(size_id) REFERENCES sizes(size_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS product_color_relations (
    color_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY(color_id) REFERENCES colors(color_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);


CREATE TABLE IF NOT EXISTS orders (
order_id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
PRIMARY KEY(order_id),
FOREIGN KEY(user_id) REFERENCES users(user_id)
);



CREATE TABLE IF NOT EXISTS order_items (
order_item_id INT NOT NULL AUTO_INCREMENT,
product_id INT NOT NULL,
price INT NOT NULL,
quantity INT NOT NULL,
color_id INT NOT NULL,
size_id INT NOT NULL,
order_id INT NOT NULL,
PRIMARY KEY(order_item_id),
FOREIGN KEY(product_id) REFERENCES products(product_id),
FOREIGN KEY(color_id) REFERENCES colors(color_id),
FOREIGN KEY(size_id) REFERENCES sizes(size_id),
FOREIGN KEY(order_id) REFERENCES orders(order_id)
);